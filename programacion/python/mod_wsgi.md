https://code.google.com/p/modwsgi/wiki/ConfigurationGuidelines
http://flask.pocoo.org/docs/0.10/deploying/mod_wsgi/

# Caso más básico #
/vagrant/wsgi/ejemplo.wsgi
def application(environ, start_response):
    status = '200 OK'
    output = 'Hello World!'

    response_headers = [('Content-type', 'text/plain'),
                        ('Content-Length', str(len(output)))]
    start_response(status, response_headers)

    return [output]

/etc/httpd/conf.d/ejemplo.conf
WSGIScriptAlias /myapp /vagrant/wsgi/ejemplo.wsgi

curl http://localhost/myapp
Hello world!


# Caso donde importamos una aplicación en el wsgi #
# El python que tiene definida la variable app esta en /path/app/src/nombre/aplicacion.py
/vagrant/wsgi/ejemplo.wsgi
import sys
sys.path.insert(0, '/path/app')
from src.nombre.aplicacion import app as application


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
