from django.shortcuts import render_to_response
from django.template import RequestContext
from win32com.client import Dispatch

def index(request):
	"""Show the index page with principal actions"""
	
	# TD = get_QCConnection()
	# TDConnection = TD
	
	# manufac = TD.TestSetTreeManager.Root.NewList()
	# for m in manufac:
		# if m.name != "_MANUFACTURER":
			# break
			
	## m is the manufacturer directory
	# devices = m.NewList()
	
	# devicesList = []
	# for d in devices:
		# devicesList.append(d)
		
	# country = d.Child(1)
	# fVersion = country.Child(1)
	# version = fVersion.Child(1)
	
	# TD.Logout()
	
	
	# item.SetField("TS_USER_11","asd")
# testFact = TDConnection.TestFactory
# testFilt = testFact.Filter
# testFilt.Filter("TS_PATH") = version.path + "*"
# !!!!!!!!!
# >>> testFilt.Filter("TS_PATH") = 'asd'
  # File "<stdin>", line 1
# !!!!!!!!!!!
# testList = testFact.NewList(testFilt.Text)
	
	return render_to_response('qcAccess/index.html', context_instance=RequestContext(request))
	# return render_to_response('qcAccess/index.html', 
		# {'devicesList': devicesList, 'country': country.Name, 'fVersion': fVersion.name, 'version': version.name, }
		# , context_instance=RequestContext(request))
	

def get_QCConnection():
	'''Get the hardcoded connection to the server and domain.
	Can be made a "real" engine if you try hard.
	Use makepy utility to determine if the version number has changed (TDApiOle80)
	but this works to current version'''
	
	#server = "http://pepe.es/qcbin"
	server = "http://pepe.es/qcbin"
	user = "pruebas.es"
	password = "ate"
	domain = "DEVELOPMENT"
	proyect = "PEPE"
	
	QCConnection = Dispatch("TDApiOle80.TDConnection")
	QCConnection.InitConnectionEx(server)
	QCConnection.login(user, password)
	QCConnection.Connect(domain, proyect)    
	return QCConnection
