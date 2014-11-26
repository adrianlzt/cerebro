http://docs.icinga.org/icinga2/latest/doc/module/icinga2/chapter/getting-started#setting-up-icingaweb2

https://github.com/Icinga/icingaweb2

Releases:
https://github.com/Icinga/icingaweb2/releases

Packages:
http://packages.icinga.org/

Guia instalacion:
https://github.com/Icinga/icingaweb2/blob/master/doc/installation.md

Bajar una release (o clonar el git)
Mover el dir a /usr/share/icingaweb

cd /usr/share/icingaweb

Apache
bin/icingacli setup config webserver apache --document-root /usr/share/icingaweb/public
O de git: https://github.com/Icinga/icingaweb2/blob/master/packages/files/apache/icingaweb.conf

Nginx
./bin/icingacli setup config webserver nginx --document-root /usr/share/icingaweb/public > /etc/nginx/conf.d/icingaweb2.conf


http://localhost/icingaweb/setup

Necesitamos tener un token:
/usr/share/nginx/html/icingaweb/bin/icingacli setup config createDirectory apache;
  Crea el directorio /etc/icingaweb, pero la configuración de apache va a buscar a /etc/icingaweb2
/usr/share/nginx/html/icingaweb/bin/icingacli setup token create;
mv /etc/icingaweb /etc/icingaweb2

Una vez metemos el token nos hace un chequeo de que librerias y/o configuraciones nos faltan.


Preferencias:
/etc/icingaweb2/preferences

Authentication Backend
Backend Name: icingaweb
Filter Pattern: /\@[^$]+$/

General configuration has been successfully written to: /etc/icingaweb2/config.ini
Authentication configuration has been successfully written to: /etc/icingaweb2/authentication.ini
Monitoring backend configuration has been successfully written to: /etc/icingaweb2/modules/monitoring/backends.ini
Resource configuration has been successfully updated: /etc/icingaweb2/resources.ini
Monitoring instance configuration has been successfully created: /etc/icingaweb2/modules/monitoring/instances.ini
Monitoring security configuration has been successfully created: /etc/icingaweb2/modules/monitoring/config.ini

Para que funcione la auth "autologin", añadir al fichero de configuración de apache, dentro de Directory:
    # Auth
   AuthName "icingaweb"
   AuthType Basic
   AuthUserFile /etc/icinga/passwd
   Require valid-user


Con livestatus funciona fatal. Todo el rato protestando porque no existen tablas.

# Vagrant
git clone https://github.com/Icinga/icingaweb2.git
cd icingaweb2
vagrant up
