https://code.google.com/p/modwsgi/wiki/ConfigurationGuidelines
http://flask.pocoo.org/docs/0.10/deploying/mod_wsgi/
webob.md

# Caso más básico #
mkdir /opt/ejemplo
chmod 755 /opt/ejemplo

/opt/ejemplo/app.wsgi
def application(environ, start_response):
    status = '200 OK'
    output = 'Hello World!'

    response_headers = [('Content-type', 'text/plain'),
                        ('Content-Length', str(len(output)))]
    start_response(status, response_headers)

    return [output]

chmod 0644 /opt/ejemplo/app.wsgi

/etc/httpd/conf.d/ejemplo.conf
WSGIScriptAlias /myapp /opt/ejemplo/app.wsgi
# NO poner en /tmp
WSGIPassAuthorization On
# Esto hace que se pase las cabeceras de auth a la app.

<Directory "/opt/ejemplo">
    AllowOverride None
    Options None
    Require all granted # apache 2.4
    #Order deny,allow # apache 2.2
    #Allow from all # apache 2.2
</Directory>


curl http://localhost/myapp
Hello world!


# Caso donde importamos una aplicación en el wsgi #
# El python que tiene definida la variable app esta en /path/app/src/nombre/aplicacion.py
/vagrant/wsgi/ejemplo.wsgi
import sys
sys.path.insert(0, '/path/app/src')
from nombre.aplicacion import app as application


# Alias #
Doc WSGIDaemonProcess
https://code.google.com/p/modwsgi/wiki/ConfigurationDirectives#WSGIDaemonProcess

Con virutalenv:
httpd/conf.d/configuracion.conf:
WSGIDaemonProcess appwiki user=apache group=apache python-path=/srv/nagios/dsmctools-icinga-doc/src:/srv/nagios/dsmctools-icinga-doc/venv/lib/python2.6/site-packages
WSGIPassAuthorization On
WSGIScriptAlias /doc /srv/nagios/dsmctools-icinga-doc/app.wsgi
WSGISocketPrefix /srv/nagios/apache
<Location /doc> # creo que no hace falta meter el wsgiprocessgroup en el location
  WSGIProcessGroup appwiki
</Location>

/srv/nagios/dsmctools-icinga-doc/app.wsgi:
import sys
import os
os.environ['HTTP_PROXY'] = 'http://proxy2pdi.service.dsn.inet:6666'
from serviwiki.wiki import app as application

Con os.environ definimos variables de entorno para nuestra aplicación.
http://drumcoder.co.uk/blog/2010/nov/12/apache-environment-variables-and-mod_wsgi/




# Virtualhost #
<VirtualHost *>
    ServerName example.com

    WSGIDaemonProcess yourapplication user=user1 group=group1 threads=5
    WSGIScriptAlias / /var/www/yourapplication/yourapplication.wsgi

    <Directory /var/www/yourapplication>
        WSGIProcessGroup yourapplication
        WSGIApplicationGroup %{GLOBAL}
        Order deny,allow
        Allow from all
    </Directory>
</VirtualHost>




Necesidad de reinicio:
http://code.google.com/p/modwsgi/wiki/ReloadingSourceCode
embedded mode (por defecto) -> necesario reinicio manual

Hace falta hacer restart con los cambios. Reload no sirve.


# Path
WSGIPythonPath /path/to/mysite.com:/path/to/your/venv/lib/python3.X/site-packages

Daemon mode:
WSGIDaemonProcess example.com python-path=/path/to/mysite.com:/path/to/venv/lib/python2.7/site-packages
WSGIProcessGroup example.com


# Troubleshooting
https://code.google.com/p/modwsgi/wiki/ConfigurationIssues


[Thu Oct 30 14:32:42 2014] [error] [client ::1] (13)Permission denied: mod_wsgi (pid=30689): Unable to connect to WSGI daemon process 'appwiki' on '/etc/httpd/logs/wsgi.30668.0.1.sock' after multiple attempts.

Definir un:
WSGISocketPrefix /srv/nagios/apache



Nos dice que no encuentra un módulo.
Era que el virtualenv donde apuntaba no tenía permisos de lectura para el usuario definido en mod-wsgi
