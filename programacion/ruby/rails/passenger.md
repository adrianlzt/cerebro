Es "mod_rails" para apache o nginx.

Configuración con virtualhost en apache:
http://www.modrails.com/documentation/Users%20guide%20Apache.html#_deploying_a_rack_based_ruby_application_including_rails_gt_3

<VirtualHost *:80>
    ServerName monit.inet
    # !!! Be sure to point DocumentRoot to 'public'!
    DocumentRoot /vagrant/ui/public
    <Directory /vagrant/ui/public>
        # This relaxes Apache security settings.
        Allow from all
	# MultiViews must be turned off.
        Options -MultiViews
    </Directory>
    RailsEnv production
</VirtualHost>

Hay una forma de ponerlo como sub url, pero no me fuciona. Me deniega el acceso.
Alias /subapp /websites/rack/public
<Location /subapp>
    PassengerBaseURI /subapp
    PassengerAppRoot /websites/rack
</Location>
<Directory /websites/rack/public>
    Allow from all
    Options -MultiViews
</Directory>

Tras cambiar el código, basta con hacer:
touch /webapps/rackapp/tmp/restart.txt


RPMs
http://passenger.stealthymonkeys.com/rhel/6/x86_64/


Instalación mediante gemas:
gem install passenger
passenger-install-apache2-module  (con rvm version 1.9.3 está en: /usr/local/rvm/gems/ruby-1.9.3-p484/bin/)
  Es un instalador interactivo. Nos preguntará para que lenguaje queremos tener passenger, y compilará el módulo apache

En Debian podremos cargar el módulo con: sudo a2enmod passenger

En redhat:
Tras la instalación nos dice que metamos esta configuración en apache (meter en conf.d/passenger.conf):
   LoadModule passenger_module /usr/local/rvm/gems/ruby-1.9.3-p484/gems/passenger-4.0.33/buildout/apache2/mod_passenger.so
   PassengerRoot /usr/local/rvm/gems/ruby-1.9.3-p484/gems/passenger-4.0.33
   PassengerDefaultRuby /usr/local/rvm/wrappers/ruby-1.9.3-p484/ruby
   PassengerHighPerformance on
   PassengerMaxPoolSize 12
   PassengerPoolIdleTime 1500
   PassengerStatThrottleRate 120
   # PassengerMaxRequests 1000
   
Necesitamos precompilar los assets?
RAILS_ENV=production bundle exec rake assets:precompile


Los logs se generan en
/path/app/log/



Ejemplo básico para probar passenger:
$ mkdir /webapps/rack_example
$ mkdir /webapps/rack_example/public
$ mkdir /webapps/rack_example/tmp
$ cd /webapps/rack_example
$ vi config.ru
app = proc do |env|
    [200, { "Content-Type" => "text/html" }, ["hello <b>world</b>"]]
    end
    run app
$ vi /etc/httpd/conf.d/test.conf
<VirtualHost *:80>
    ServerName www.rackexample.com
    DocumentRoot /webapps/rack_example/public
    <Directory /webapps/rack_example/public>
        Allow from all
        Options -MultiViews
    </Directory>
</VirtualHost>

Nos debería mostrar un "hello world"



Si tenemos problemas de permisos, chequear que el path de ruby, gems, passenger etc tienen permisos de rX para others
