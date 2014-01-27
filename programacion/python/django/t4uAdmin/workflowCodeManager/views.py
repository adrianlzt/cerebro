from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext
from distutils.version import StrictVersion
from workflowCodeManager.models import Proyect,LearningProyect,Draft,PreproductionProyect,VideoProyect,FijaProyect
from django.contrib.auth.decorators import login_required, user_passes_test
import pysvn
import os
import shutil,stat #To delete temp folder
import tempfile
import time
import servicios

#import pdb; pdb.set_trace() #Insertar en una view para hacer debug con el runserver de manage.py

repository = "https://hand.es/svn/"
repositoryVideo = "https://hand.es/svn/video/"
	
@login_required
def index(request):
	"""Show the index page with principal actions"""
	
	from workflowCodeManager.form import koalaUserForm
	formKoala = koalaUserForm()
	return render_to_response('workflowCodeManager/index.html', {'formKoala': formKoala}, context_instance=RequestContext(request))

@login_required
def waitingWeb(request,nextFunc):
    if nextFunc == "fija/supplant_core":
        request.session['supplantUser'] = request.POST['supplantUser']
    
    if nextFunc == "new_release_core" or nextFunc == "video/new_release_core":
        # Difference between data coming from index, or error page because tag already exists
        if request.method == 'POST':
            # Save release and log message in session data
            request.session['newVersion'] = request.POST['version']
            request.session['logMessage'] = request.POST['logMsg']
            request.session['forced'] = False            
        else:
            request.session['forced'] = True
            
    return render_to_response('workflowCodeManager/webEspera.html', {'nextFunc': nextFunc}, context_instance=RequestContext(request))

	
@login_required
def update_preproduction(request):
	"""Update preproduction proyects with trunk code, and return the last logs messages"""

	client = svn_client()
	
	preproduction_proyects_list = PreproductionProyect.objects.filter(active=True).order_by('name')
	revnumNew = pysvn.Revision( pysvn.opt_revision_kind.head )
	discover_changed_paths = True
	logMessages = []
	svnAnswers = []
	revnumOld = []
	
	for p in preproduction_proyects_list:
		try:
			deleteFiles(p.path) #Delete previous version files (made this way to prevent problems with merge collisions)
			revnumOld.append(client.list(p.path)[0][0].created_rev)
			svnAnswers.append(client.update(p.path).pop())
			#Warning! Reqs-testplan proyect is assumed to came first in the list (needed to show messages in the correct column). List is ordered by name
			logMessages.append(client.log(p.path,revnumNew,revnumOld[len(revnumOld)-1],discover_changed_paths))
		except pysvn.ClientError,e:
			error = "Error updating. Please check database:\n\n" + str(e)
			return render_to_response('workflowCodeManager/error.html', {'error': str(e)}, context_instance=RequestContext(request))
		except WindowsError,e:
			error = "Please, check the path is correctly. Take care of white spaces:\n\n" + str(e)
			return render_to_response('workflowCodeManager/error.html', {'error': error}, context_instance=RequestContext(request))

	# Remove the oldest message. We only want new messages
	if logMessages[0]:
		logMessages[0].pop()
	if logMessages[1]:
		logMessages[1].pop()
			
	return render_to_response('workflowCodeManager/upPreproduction.html', 
		{'logMessages': logMessages, 'revisions': svnAnswers , 'revOrig': revnumOld}, context_instance=RequestContext(request))
	
	#TODO:
	# Avisar de que a partir de ahora no se deben realizar cambios en trunk (o si se hacen, repetir todas las pruebas)
	# Tambien se podria sacar el plan de pruebas que debe llevarse a cabo
	# Crear links sobre las versiones para ver los difs si se pincha?
	
	
@login_required
def new_release(request):
	"""Generate a new tag in subversion, and switch all proyects, and draft, to this new tag
		
		session['forced']=True: tagged version already exists. Used to update all production proyects to this tag
	"""
	
	client = svn_client()
	newVersion = request.session['newVersion']
	
	if not request.session['forced']:		
		logMessage = [request.session['logMessage']]
		logMessage[0] = logMessage[0].replace(b"\r\n", b"\n") #Solve problem with line endings
		logMessage[0] += "\n\n" + str(request.user.username) #Insert in log comment the user performing the task
		
		def get_log_message():
			return True, logMessage[0]
		client.callback_get_log_message = get_log_message	

		# Copy trunk to the new tag
		try:
			client.copy(repository + "trunk", repository + "tags/Release%20" + newVersion)
		except pysvn.ClientError,e:
			if e.message.find("already exists") == -1:
				return render_to_response('workflowCodeManager/error.html', {'error': str(e)}, context_instance=RequestContext(request))
			else:
				return render_to_response('workflowCodeManager/error.html', {'error': str(e), 'forced_version': newVersion}, context_instance=RequestContext(request))
			
		#Propset could not be used with a non local repository. We make a checkout (to temp directory), change the property, commit and delete temp files
		svn_externals = "req.tds " + repository + "tags/Release%20" + newVersion + "/qc/model_DRAFT/Scripts/req.tds \n "
		svn_externals += "testplan.tds " + repository + "tags/Release%20" + newVersion + "/qc/model_DRAFT/Scripts/testplan.tds"
		
		temp_dir_svn_externals = tempfile.mkdtemp()
		
		#Remove temp directory if already exists
		if os.path.isdir(temp_dir_svn_externals):
			shutil.rmtree(temp_dir_svn_externals, onerror=remove_readonly_files)
		
		try:
			client.checkout(repository + "tags/Release%20" + newVersion + "/qc/model_Manufacturer/Scripts", temp_dir_svn_externals)
			client.propset("svn:externals", svn_externals, temp_dir_svn_externals)
			client.checkin(temp_dir_svn_externals, "Fixed svn:externals in Release " + newVersion, False)
		except pysvn.ClientError,e:
			return render_to_response('workflowCodeManager/error.html', {'error': str(e)}, context_instance=RequestContext(request))
			
		shutil.rmtree(temp_dir_svn_externals, onerror=remove_readonly_files) #Remove temp directory 
	
	logMessage = client.log(repository + "tags/Release%20" + newVersion)
	logMessage.reverse()

		
	#Update draft proyect
	draftProyect = Draft.objects.filter(active=True)[0]
	try:
		deleteFiles(draftProyect.path) #Delete previous version files (made this way to prevent problems with merge collisions)
		revSwitched = client.switch(draftProyect.path, repository + "tags/Release%20" + newVersion + "/qc/model_DRAFT/Scripts")
	except pysvn.ClientError,e:
		error = "Error updating. Please check database:\n\n" + str(e)
		return render_to_response('workflowCodeManager/error.html', {'error': str(e)}, context_instance=RequestContext(request))
	except WindowsError,e:
		error = "Please, check the path is correctly. Take care of white spaces:\n\n" + str(e)
		return render_to_response('workflowCodeManager/error.html', {'error': error}, context_instance=RequestContext(request))
		
		
	#Update manufacturer proyects to the new release
	proyects_list = Proyect.objects.filter(active=True).order_by('name')
	for p in proyects_list:
		try:
			deleteFiles(p.path) #Delete previous version files (made this way to prevent problems with merge collisions)
			client.switch(p.path, repository + "tags/Release%20" + newVersion + "/qc/model_Manufacturer/Scripts")
		except pysvn.ClientError,e:
			error = "Error updating. Please check database:\n\n" + str(e)
			return render_to_response('workflowCodeManager/error.html', {'error': str(e)}, context_instance=RequestContext(request))
		except WindowsError,e:
			error = "Please, check the path is correctly. Take care of white spaces:\n\n" + str(e)
			return render_to_response('workflowCodeManager/error.html', {'error': error}, context_instance=RequestContext(request))

	#Delete session data
	request.session.pop('newVersion')
	request.session.pop('logMessage')
	request.session.pop('forced') 
			
	return render_to_response('workflowCodeManager/upProyect.html', 
		{'proyects': proyects_list, 'draftProyect' :draftProyect, 'newVersion': newVersion, 'svnMessage': logMessage}, context_instance=RequestContext(request))

	#TODO:
	# Enviar email automaticamente a los gestores del proyecto avisando de la nueva release con el changel log escrito

	
@login_required
def update_learning(request):
	"""Update learning proyects to the latest stable version"""
	
	client = svn_client()
	latestRelease = latest_release(repository + "tags", client)
	
	lerning_proyects_list = LearningProyect.objects.filter(active=True).order_by('name')
	for p in lerning_proyects_list:
		try:
			deleteFiles(p.path) #Delete previous version files (made this way to prevent problems with merge collisions)
			client.switch(p.path, repository + "tags/Release%20" + latestRelease + "/qc/model_Manufacturer/Scripts")
		except pysvn.ClientError,e:
			error = "Error updating. Please check database:\n\n" + str(e)
			return render_to_response('workflowCodeManager/error.html', {'error': str(e)}, context_instance=RequestContext(request))
		except WindowsError,e:
			error = "Please, check the path is correctly. Take care of white spaces:\n\n" + str(e)
			return render_to_response('workflowCodeManager/error.html', {'error': error}, context_instance=RequestContext(request))
			
	logMessage = client.log(repository + "tags/Release%20" + latestRelease)
	logMessage.reverse()
	
	return render_to_response('workflowCodeManager/upLearning.html', 
		{'learnings': lerning_proyects_list, 'latestRelease': latestRelease, 'svnMessage': logMessage}, context_instance=RequestContext(request))
	
	#TODO:
	# Mensaje distinto si los proyectos ya estaban actualizados a ese switch. De hecho, ni si quiera hacer el switch


@login_required
def latest_logs(request):
	"""Return a list of Subversion log messages from the latest stable release"""
	
	client = svn_client()
	latestRelease = latest_release(repository + "tags", client)
	path = repository + "tags/Release%20" + latestRelease
	
	try:
		oldVersion = client.list(path).pop(0)[0].created_rev
	except pysvn.ClientError,e:
		return render_to_response('workflowCodeManager/error.html', {'error': str(e)}, context_instance=RequestContext(request))
	
	revnumNew = pysvn.Revision( pysvn.opt_revision_kind.head )
	
	discover_changed_paths = True	
	try:
		logMessagesTestLab = client.log(repository + "trunk",revnumNew,oldVersion,discover_changed_paths)
	except pysvn.ClientError,e:
		return render_to_response('workflowCodeManager/error.html', {'error': str(e)}, context_instance=RequestContext(request))
	
	return render_to_response('workflowCodeManager/latest_logs.html', {'svnMessages': logMessagesTestLab}, context_instance=RequestContext(request))

	
def latest_release(tags_directory, client):
	"""Obtain the latest release in the directory passed
	
	tags_directory: e.g. https://hand.es/svn/tags
	client: svn client to use to enter in the repository
	
	Note: inside this directory, releases directories has to be like "Release a.b.c" (Release 10.2.3, Release 1.2.01, ...)
	"""
	
	releases = []
	tags = client.list(tags_directory) #Don't use try-catch because we have to return a release object
	tags.reverse()
	tags.pop() #Remove tags directory itself
	for t in tags:
		releases.append(t[0].repos_path.split().pop())
		
	releases.sort(key=StrictVersion) #Order taking care of versions (10.01 > 2.2)
	return releases.pop()
	
	
def svn_client():
	"""Create svn client object, and configure it as needed"""
	
	retcode = True # False if no username and password are available. True if subversion is to use the username and password.
	accepted_failures = 1 # The accepted failures allowed
	save = True # True if you want subversion to remember the certificate in the configuration directory. return False to prevent saving the certificate.
	def ssl_server_trust_prompt( trust_dict ):
		return retcode, accepted_failures, save
	
	client = pysvn.Client()
	client.callback_ssl_server_trust_prompt = ssl_server_trust_prompt
	
	# username = "apacheDjango"
	# password = "" #Deleted
	# def get_login( realm, username, may_save ):
		# return retcode, username, password, save
	# client.callback_get_login = get_login
	
	return client
	
	
def remove_readonly_files(osfunc, fpath, excinfo):
	"""
		On Windows, the files in .svn are read-only, so when rmtree()
		tries to remove them, an exception is thrown.  We catch that here,
		remove the read-only attribute, and hopefully continue without
		problems.
	"""
	
	# convert to read/write
	os.chmod(fpath, stat.S_IWRITE)
	# use the original function to repeat the operation
	osfunc(fpath)
	
	
def deleteFiles(folder):
	"""Delete files inside 'folder', but not delete directories"""
	try:
		for the_file in os.listdir(folder):
			file_path = os.path.join(folder, the_file)

			if os.path.isfile(file_path):
				os.unlink(file_path)
	except Exception, e:
		raise


@login_required
@user_passes_test(lambda u: u.groups.filter(name='Sync Permission').count() == 1, login_url='/svn/denied/')
def synchronizeManufacturers(request):
	import subprocess
	
	subprocess.Popen("C:\\Documents and Settings\\Administrador\\Mis documentos\\synchronize.bat",cwd="C:\\Documents and Settings\\Administrador\\Mis documentos")
	return render_to_response('workflowCodeManager/manufacturerSync.html', context_instance=RequestContext(request))

@login_required
def denied(request):
	error = "Only users in group 'Sync Permission' could execute the Manufacturer Sync"
	return render_to_response('workflowCodeManager/error.html', {'error': error}, context_instance=RequestContext(request))
	

def manufacturerSync(request):
	# Import smtplib for the actual sending function
	import smtplib
	# Import the email modules we'll need
	from email.mime.text import MIMEText
	
	from django.contrib.auth.models import User
	import glob
	
	fromEmail = "apacheDjango" #Sender
	subject = 'Error in manufacturer synchronization'
	secsInADay = 86400
	daysToCheck = 2 #How many days before current date will be checked (avoid check logs too old)
	
	#Check for an error in logs
	fileErrors = []
	logsPath = "C:/Documents and Settings/Administrador/Mis documentos/logs"
	logs = glob.glob(logsPath+"/*")
	for f in logs: #This will fill fileErrors with the name of the failed files, and the error in the file
		if os.stat(f).st_mtime > time.time() - secsInADay*daysToCheck:
			fp = open(f,'rb')
			err = fp.read().find("ERROR")
			if err >= 0: #This file logs an error
				fp.seek(err)
				errorDesc = ""
				while 1:
					line = fp.readline()
					if line.strip():
						errorDesc += line
					else:
						break
				
				fileErrors.append([f,errorDesc])
	
	if len(fileErrors) == 1:
		message = "An error has been found in the manufacturer synchronization:\n\n\n"
		message += "File: " + fileErrors[0][0] + "\n"
		message += "Error message:\n" + fileErrors[0][1]
		
	elif len(fileErrors) > 1:
		message = "Some errors were found in the manufacturer synchronization:\n\n\n"
		for e in fileErrors:
			message += "File: " + e[0] + "\n"
			message += "Error message:\n" + e[1] + "\n\n\n"
	else:
		#No errors
		return render_to_response('workflowCodeManager/chekingManufacturerSyncLogs.html', {'fileErrors': fileErrors}, context_instance=RequestContext(request))
		
	# Create a text/plain message
	msg = MIMEText(message)

	#The mail will be send to users in group 'Manufacturer Sync Error'
	mailUsers = User.objects.filter(groups__name='Manufacturer Sync Error')
	emails = [u.email for u in mailUsers]

	msg['Subject'] = subject
	msg['From'] = fromEmail
	msg['To'] = ",".join(emails)
	
	# Send the message, but don't include the
	# envelope header.
	s = smtplib.SMTP('mail.inet')
	s.sendmail(fromEmail, emails, msg.as_string())
	s.quit()
	
	for e in fileErrors:
		e[1] = accents2html(e[1])
	
	return render_to_response('workflowCodeManager/chekingManufacturerSyncLogs.html', {'fileErrors': fileErrors}, context_instance=RequestContext(request))
	
	#TODO: sustituir el script de sincronizacion (C:\Documents and Settings\Administrador\Mis documentos\synchronize.bat) para integrar todo en esta herramienta 
	
def accents2html(s):
	htmlcodes = ['&Aacute;', '&aacute;', '&Agrave;', '&Acirc;', '&agrave;', '&Acirc;', '&acirc;', '&Auml;', '&auml;', '&Atilde;', '&atilde;', '&Aring;', '&aring;', '&Aelig;', '&aelig;', '&Ccedil;', '&ccedil;', '&Eth;', '&eth;', '&Eacute;', '&eacute;', '&Egrave;', '&egrave;', '&Ecirc;', '&ecirc;', '&Euml;', '&euml;', '&Iacute;', '&iacute;', '&Igrave;', '&igrave;', '&Icirc;', '&icirc;', '&Iuml;', '&iuml;', '&Ntilde;', '&ntilde;', '&Oacute;', '&oacute;', '&Ograve;', '&ograve;', '&Ocirc;', '&ocirc;', '&Ouml;', '&ouml;', '&Otilde;', '&otilde;', '&Oslash;', '&oslash;', '&szlig;', '&Thorn;', '&thorn;', '&Uacute;', '&uacute;', '&Ugrave;', '&ugrave;', '&Ucirc;', '&ucirc;', '&Uuml;', '&uuml;', '&Yacute;', '&yacute;', '&yuml;', '&copy;', '&reg;', '&trade;', '&euro;', '&cent;', '&pound;', '&lsquo;', '&rsquo;', '&ldquo;', '&rdquo;', '&laquo;', '&raquo;', '&mdash;', '&ndash;', '&deg;', '&plusmn;', '&frac14;', '&frac12;', '&frac34;', '&times;', '&divide;', '&alpha;', '&beta;', '&infin']
	funnychars = ['\xc1','\xe1','\xc0','\xc2','\xe0','\xc2','\xe2','\xc4','\xe4','\xc3','\xe3','\xc5','\xe5','\xc6','\xe6','\xc7','\xe7','\xd0','\xf0','\xc9','\xe9','\xc8','\xe8','\xca','\xea','\xcb','\xeb','\xcd','\xed','\xcc','\xec','\xce','\xee','\xcf','\xef','\xd1','\xf1','\xd3','\xf3','\xd2','\xf2','\xd4','\xf4','\xd6','\xf6','\xd5','\xf5','\xd8','\xf8','\xdf','\xde','\xfe','\xda','\xfa','\xd9','\xf9','\xdb','\xfb','\xdc','\xfc','\xdd','\xfd','\xff','\xa9','\xae','\u2122','\u20ac','\xa2','\xa3','\u2018','\u2019','\u201c','\u201d','\xab','\xbb','\u2014','\u2013','\xb0','\xb1','\xbc','\xbd','\xbe','\xd7','\xf7','\u03b1','\u03b2','\u221e']
	newtext = ''
	for char in s:
		if char not in funnychars:
			newtext = newtext + char
		else:
			newtext  = newtext + htmlcodes[funnychars.index(char)]
	return newtext
		

@login_required
def sendDummyMail(request):
	import smtplib # Import smtplib for the actual sending function
	from email.mime.text import MIMEText # Import the email modules we'll need
	from workflowCodeManager.form import MassiveMail # Importamos el formulario
	
	if request.method == 'POST': # If the form has been submitted...
		form = MassiveMail(request.POST) # A form bound to the POST data
		if form.is_valid(): # All validation rules pass
			subject = form.cleaned_data['subject']
			message = form.cleaned_data['message']
			sender = form.cleaned_data['sender']
			recipients = form.cleaned_data['recipients']

			recipients.sort() # Ordenamos la lista por orden alfabetico
			recipients.append(sender) # Introducimos el email del enviador al final de la lista como comprobacion
			
			# Create a text/plain message
			msg = MIMEText(message)
			msg['Subject'] = subject
			msg['From'] = sender
			msg['To'] = ""
						
			try:
				s = smtplib.SMTP('mail.inet')
				s.sendmail(sender, recipients, msg.as_string())
				s.quit()
			except smtplib.SMTPRecipientsRefused,e:
				return render_to_response('workflowCodeManager/error.html', {'error': str(e)}, context_instance=RequestContext(request))
			
			return render_to_response('workflowCodeManager/massiveMail.html', {'fromEmail': sender, 'subject': subject, 'message': message, 'toEmails': recipients}, context_instance=RequestContext(request))		
	else:
		form = MassiveMail() # An unbound form

	return render_to_response('workflowCodeManager/getMailData.html', {'form': form}, context_instance=RequestContext(request))
	
	# TODO:	mostrar un tick list para borrar los usuarios que se seleccionen en esta tick list -> ventana de confirmacion!!
	

@login_required
def emailsT4U(request):
	"""Devuelve la lista de emails de los usuarios (con email definido) de T4U"""
	
	import cx_Oracle;
	con = servicios.conexOracle(cx_Oracle)
	cur = con.cursor()
	res = cur.execute("select email from qcdata.users where email is not null")
	
	emails = []
	for ren in res:
		emails.append(ren[0])
	
	con.close()
	return HttpResponse("\n".join(e for e in emails))


@login_required
def emailsKhepera(request):
	"""Devuelve la lista de emails de los usuarios de khepera"""
	
	from bugz import bugzilla
	b = servicios.conexKhepera(bugzilla)
	
	try:
		emails = b.list_users()
	except RuntimeError,e:
		return HttpResponse("Error fetching Khepera users:\n"+e)
	
	#Remove some not valid emails
	emails.remove("dja@dmin.com")
	emails.remove("0@select.asignee.from.the.list")
	emails.remove("test@test.es")
	
	return HttpResponse("\n".join(e for e in emails))
	
	
@login_required
def newKoalaUser(request):
	"""Generate a manufacturer user in Koala"""

	import paramiko
	from workflowCodeManager.form import koalaUserForm
	
	if request.method == 'POST':
		form = koalaUserForm(request.POST)
		if form.is_valid(): # All validation rules pass
			user = form.cleaned_data['user']
			password = form.cleaned_data['password']
	
			ssh = servicios.conexKoala(paramiko)
			stdin, stdout, stderr = ssh.exec_command("sudo /home/django/nuevoFabricante '" + user + "' '" + password + "'")
			out = stdout.readlines()
			err = stderr.readlines()
			ssh.close()
		
			return render_to_response('workflowCodeManager/newKoalaUser.html', {'error': err, 'out': out}, context_instance=RequestContext(request))
		else:
			return render_to_response('workflowCodeManager/errorKoalaForm.html', {'form': form}, context_instance=RequestContext(request))
	else:
		err = "Esta funcion debe ser llamada con un metodo POST"
		return render_to_response('workflowCodeManager/error.html', {'error': err}, context_instance=RequestContext(request))

@login_required
def newKoala2User(request):
    """Generate directory structure for a new user in Koala2"""

    import paramiko
    from workflowCodeManager.form import koalaUserForm

    if request.method == 'POST':
        form = koalaUserForm(request.POST)
        if form.is_valid(): # All validation rules pass
            user = form.cleaned_data['user']
            password = form.cleaned_data['password']

            ssh = servicios.conexKoala2(paramiko)
            stdin, stdout, stderr = ssh.exec_command("sudo /home/django/Crear_nuevo_usuario_ftp '" + user + "'")
            out = stdout.readlines()
            err = stderr.readlines()
            ssh.close()

            return render_to_response('workflowCodeManager/newKoala2User.html', {'error': err, 'out': out, 'usuario': user, 'password': password}, context_instance=RequestContext(request))
        else:
            return render_to_response('workflowCodeManager/errorKoalaForm.html', {'form': form}, context_instance=RequestContext(request))
    else:
        err = "Esta funcion debe ser llamada con un metodo POST"
        return render_to_response('workflowCodeManager/error.html', {'error': err}, context_instance=RequestContext(request))


@login_required
def indexVideo(request):
	"""Actions for video vertical"""
	
	return render_to_response('workflowCodeManager/video/index.html', context_instance=RequestContext(request))


@login_required
def new_releaseVideo(request):
	"""Generate a new tag in subversion, and switch all production proyects to this new tag
		
		session['forced']=True: tagged version already exists. Used to update all production proyects to this tag
	"""
	
	client = svn_client()
	newVersion = request.session['newVersion']
	
	if not request.session['forced']:		
		logMessage = [request.session['logMessage']]
		logMessage[0] = logMessage[0].replace(b"\r\n", b"\n") #Solve problem with line endings
		logMessage[0] += "\n\n" + str(request.user.username) #Insert in log comment the user performing the task
		
		def get_log_message():
			return True, logMessage[0]
		client.callback_get_log_message = get_log_message	

		# Copy trunk to the new tag
		try:
			client.copy(repositoryVideo + "trunk", repositoryVideo + "tags/Release%20" + newVersion)
		except pysvn.ClientError,e:
			if e.message.find("already exists") == -1:
				return render_to_response('workflowCodeManager/error.html', {'error': str(e)}, context_instance=RequestContext(request))
			else:
				return render_to_response('workflowCodeManager/error.html', {'error': str(e), 'forced_version': newVersion}, context_instance=RequestContext(request))
				
	logMessage = client.log(repositoryVideo + "tags/Release%20" + newVersion)
	logMessage.reverse()

	#Update production proyects
	proyects_list = VideoProyect.objects.filter(active=True, kind="production").order_by('name')
	for p in proyects_list:
		try:
			deleteFiles(p.path) #Delete previous version files (made this way to prevent problems with merge collisions)
			client.switch(p.path, repositoryVideo + "tags/Release%20" + newVersion + "/qc/Scripts")
		except pysvn.ClientError,e:
			error = "Error updating. Please check database:\n\n" + str(e)
			return render_to_response('workflowCodeManager/error.html', {'error': str(e)}, context_instance=RequestContext(request))
		except WindowsError,e:
			error = "Please, check the path is correctly. Take care of white spaces:\n\n" + str(e)
			return render_to_response('workflowCodeManager/error.html', {'error': error}, context_instance=RequestContext(request))

	#Delete session data
	request.session.pop('newVersion')
	request.session.pop('logMessage')
	request.session.pop('forced') 
			
	return render_to_response('workflowCodeManager/video/upProyect.html', 
		{'proyects': proyects_list, 'newVersion': newVersion, 'svnMessage': logMessage}, context_instance=RequestContext(request))

	
@login_required
def update_preproductionVideo(request):
	"""Update preproduction proyects with trunk code, and return the last logs messages"""

	client = svn_client()
	
	preproduction_proyects_list = VideoProyect.objects.filter(active=True, kind="preproduction").order_by('name')
	revnumNew = pysvn.Revision( pysvn.opt_revision_kind.head )
	discover_changed_paths = True
	logMessages = []
	svnAnswers = []
	revnumOld = []
	
	for p in preproduction_proyects_list:
		try:
			deleteFiles(p.path) #Delete previous version files (made this way to prevent problems with merge collisions)
			revnumOld.append(client.list(p.path)[0][0].created_rev)
			svnAnswers.append(client.update(p.path).pop())
			logMessages.append(client.log(p.path,revnumNew,revnumOld[len(revnumOld)-1],discover_changed_paths))
		except pysvn.ClientError,e:
			error = "Error updating. Please check database:\n\n" + str(e)
			return render_to_response('workflowCodeManager/error.html', {'error': str(e)}, context_instance=RequestContext(request))
		except WindowsError,e:
			error = "Please, check the path is correctly. Take care of white spaces:\n\n" + str(e)
			return render_to_response('workflowCodeManager/error.html', {'error': error}, context_instance=RequestContext(request))

	# Remove the oldest message. We only want new messages
	if logMessages[0]:
		logMessages[0].pop()
			
	return render_to_response('workflowCodeManager/video/upPreproduction.html', 
		{'logMessages': logMessages, 'revisions': svnAnswers , 'revOrig': revnumOld}, context_instance=RequestContext(request))
	
	
@login_required
def latest_logsVideo(request):
	"""Return a list of Subversion log messages from the latest stable release"""
	
	client = svn_client()
	latestRelease = latest_release(repositoryVideo + "tags", client)
	path = repositoryVideo + "tags/Release%20" + latestRelease
	
	try:
		oldVersion = client.list(path).pop(0)[0].created_rev
	except pysvn.ClientError,e:
		return render_to_response('workflowCodeManager/error.html', {'error': str(e)}, context_instance=RequestContext(request))
	
	revnumNew = pysvn.Revision( pysvn.opt_revision_kind.head )
	
	discover_changed_paths = True	
	try:
		logMessagesTestLab = client.log(repositoryVideo + "trunk",revnumNew,oldVersion,discover_changed_paths)
	except pysvn.ClientError,e:
		return render_to_response('workflowCodeManager/error.html', {'error': str(e)}, context_instance=RequestContext(request))
	
	return render_to_response('workflowCodeManager/latest_logs.html', {'svnMessages': logMessagesTestLab}, context_instance=RequestContext(request))


	
@login_required
def videoSync(request):
	# Import smtplib for the actual sending function
	import smtplib
	# Import the email modules we'll need
	from email.mime.text import MIMEText
	
	from django.contrib.auth.models import User
	import glob
	
	fromEmail = "apacheDjango" #Sender
	subject = 'Error in manufacturer synchronization'
	secsInADay = 86400
	daysToCheck = 2 #How many days before current date will be checked (avoid check logs too old)
	
	#Check for an error in logs
	fileErrors = []
	logsPath = "C:/Documents and Settings/Administrador/Mis documentos/Synchronize Video Vertical/logs"
	logs = glob.glob(logsPath+"/*")
	for f in logs: #This will fill fileErrors with the name of the failed files, and the error in the file
		if os.stat(f).st_mtime > time.time() - secsInADay*daysToCheck:
			fp = open(f,'rb')
			err = fp.read().find("ERROR")
			if err >= 0: #This file logs an error
				fp.seek(err)
				errorDesc = ""
				while 1:
					line = fp.readline()
					if line.strip():
						errorDesc += line
					else:
						break
				
				fileErrors.append([f,errorDesc])
	
	if len(fileErrors) == 1:
		message = "An error has been found in the video synchronization:\n\n\n"
		message += "File: " + fileErrors[0][0] + "\n"
		message += "Error message:\n" + fileErrors[0][1]
		
	elif len(fileErrors) > 1:
		message = "Some errors were found in the video synchronization:\n\n\n"
		for e in fileErrors:
			message += "File: " + e[0] + "\n"
			message += "Error message:\n" + e[1] + "\n\n\n"
	else:
		#No errors
		return render_to_response('workflowCodeManager/video/chekingVideoSyncLogs.html', {'fileErrors': fileErrors}, context_instance=RequestContext(request))
		
	# Create a text/plain message
	msg = MIMEText(message)

	#The mail will be send to users in group 'Manufacturer Sync Error'
	mailUsers = User.objects.filter(groups__name='Video Sync Error')
	emails = [u.email for u in mailUsers]

	msg['Subject'] = subject
	msg['From'] = fromEmail
	msg['To'] = ",".join(emails)
	
	# Send the message, but don't include the
	# envelope header.
	s = smtplib.SMTP('mail.inet')
	s.sendmail(fromEmail, emails, msg.as_string())
	s.quit()
	
	for e in fileErrors:
		e[1] = accents2html(e[1])
	
	return render_to_response('workflowCodeManager/video/chekingVideoSyncLogs.html', {'fileErrors': fileErrors}, context_instance=RequestContext(request))
	
	
@login_required
@user_passes_test(lambda u: u.groups.filter(name='Sync Permission').count() == 1, login_url='/svn/denied/')
def synchronizeVideo(request):
	import subprocess
	
	subprocess.Popen("C:\\Documents and Settings\\Administrador\\Mis documentos\\Synchronize Video Vertical\\synchronize.bat",cwd="C:\\Documents and Settings\\Administrador\\Mis documentos\\Synchronize Video Vertical")
	return render_to_response('workflowCodeManager/video/videoSync.html', context_instance=RequestContext(request))


@login_required
def indexFija(request):
    """Actions for fija"""

    return render_to_response('workflowCodeManager/fija/index.html', context_instance=RequestContext(request))


@login_required
def supplant(request):
    """Change password for user to allow access to administrator"""
    
    import cx_Oracle;
    con = servicios.conexOracle(cx_Oracle)
    cur = con.cursor()
    supplantUser = request.session['supplantUser']
    
    #Check if already there is a user suplanted
    res = cur.execute("select email from qcdata.users where user_name='fija.suplantar.es'")
    email = res.fetchall()[0][0]
    if email:
        error = "There is already an user supplanted. Please, use first 'End supplant'"
        return render_to_response('workflowCodeManager/error.html', {'error': error}, context_instance=RequestContext(request))
    
    #Obtain current user password
    res = cur.execute("select user_password from qcdata.users where user_name='" + supplantUser + "'")
    userPassword = res.fetchall()[0][0]
    
    #Store use password in user fija.suplantar.es
    cur.execute("update qcdata.users set USER_PASSWORD='" + userPassword + "', email='" + supplantUser + "' where user_name='fija.suplantar.es'")
    
    #Change user password with our password
    supplantPassword = "DEF:OsBYsyS1g3NunC1q8rhLllGrorE="
    cur.execute("update qcdata.users set USER_PASSWORD='" + supplantPassword + "' where user_name='" + supplantUser + "'")
    cur.execute("commit")
    con.close()
    
    return render_to_response('workflowCodeManager/fija/supplant.html', {'active': True, 'user': supplantUser}, context_instance=RequestContext(request))


@login_required
def end_supplant(request):
    """Change back password for user"""

    import cx_Oracle;
    con = servicios.conexOracle(cx_Oracle)
    cur = con.cursor()
    
    #Obtain current user password
    res = cur.execute("select email,user_password from qcdata.users where user_name='fija.suplantar.es'")
    dataUser = res.fetchall()[0]
    userName = dataUser[0]
    userPassword = dataUser[1]
    
    #Check if there is a user suplanted
    if not userName:
        error = "There is no user supplanted. Please, use first 'Supplant'"
        return render_to_response('workflowCodeManager/error.html', {'error': error}, context_instance=RequestContext(request))
    
    
    #Set original password to the supplanted user
    cur.execute("update qcdata.users set USER_PASSWORD='" + userPassword + "' where user_name='" + userName + "'")
    
    #Remove data from fija.suplantar.es
    cur.execute("update qcdata.users set USER_PASSWORD='', email='' where user_name='fija.suplantar.es'")
    cur.execute("commit")
    con.close()
    
    return render_to_response('workflowCodeManager/fija/supplant.html', {'active': False, 'user': userName}, context_instance=RequestContext(request))


@login_required
def update_productionFija(request):
    """Update preproduction proyects with trunk code, and return the last logs messages"""

    client = svn_client()

    preproduction_proyects_list = FijaProyect.objects.filter(active=True).order_by('name')
    revnumNew = pysvn.Revision( pysvn.opt_revision_kind.head )
    discover_changed_paths = True
    logMessages = []
    svnAnswers = []
    revnumOld = []

    for p in preproduction_proyects_list:
        try:
            deleteFiles(p.path) #Delete previous version files (made this way to prevent problems with merge collisions)
            revnumOld.append(client.list(p.path)[0][0].created_rev)
            svnAnswers.append(client.update(p.path).pop())
            logMessages.append(client.log(p.path,revnumNew,revnumOld[len(revnumOld)-1],discover_changed_paths))
        except pysvn.ClientError,e:
			error = "Error updating. Please check database:\n\n" + str(e)
			return render_to_response('workflowCodeManager/error.html', {'error': str(e)}, context_instance=RequestContext(request))
        except WindowsError,e:
            error = "Please, check the path is correctly. Take care of white spaces:\n\n" + str(e)
            return render_to_response('workflowCodeManager/error.html', {'error': error}, context_instance=RequestContext(request))

    # Remove the oldest message. We only want new messages
    if logMessages[0]:
        logMessages[0].pop()

    return render_to_response('workflowCodeManager/fija/upProduction.html',
            {'logMessages': logMessages, 'revisions': svnAnswers , 'revOrig': revnumOld}, context_instance=RequestContext(request))
