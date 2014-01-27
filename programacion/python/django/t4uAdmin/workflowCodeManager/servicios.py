def conexOracle(cx_Oracle):
	platpruebas_user = 'DJANGO'
	platpruebas_password = 'apss'
	platpruebas_dsn = 'pruebas.inet/A10'
	con = cx_Oracle.connect(platpruebas_user,platpruebas_password,platpruebas_dsn)
	return con
	
def conexKhepera(bugzilla):
	khepera_server = "https://bugzilla.org/bugzilla/"
	khepera_user = "django@admin.com"
	khepera_password = "bus"
	http_user = "bugs"
	http_password = "pro"
	b = bugzilla.Bugz(khepera_server,khepera_user,khepera_password,True,False,http_user,http_password)
	return b
	
	
def conexKoala(paramiko):
	koala_user = 'django'
	koala_password = 'djo'
	koala_server = '10.5.3.6'
	koala_port = 5625
	ssh = paramiko.SSHClient()
	ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
	ssh.connect(koala_server, port=koala_port, username=koala_user, password=koala_password)
	return ssh

def conexKoala2(paramiko):
    koala_user = 'django'
    koala_password = 'doo'
    koala_server = 'koa.inet'
    koala_port = 22
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(koala_server, port=koala_port, username=koala_user, password=koala_password)
    return ssh
