https://github.com/Icinga/icinga2/blob/master/doc/8-migration.md

https://github.com/Icinga/icinga2-migration

yum install php-ZendFramework

Instala:
php-ZendFramework
php-bcmath
php-process
php-xml
php
php-cli
php-common
php-fpm
php-gd


wget https://codeload.github.com/Icinga/icinga2-migration/zip/master
unzip master
cd icinga2-migration-master/bin
./icinga-conftool migrate v1 /etc/icinga/icinga.cfg > migrate.conf

Hace falta quitar la opción (si estuviese, cosa de livestatus)
event_broker_options=-1

Estoy intentando convertir ficheros de check_mk y no pilla los services.
Y luego se queja de que los hosts y services no tienen check_command


En plan básico:
/tmp/icinga.cfg:
cfg_file=/tmp/fichero.cfg

/tmp/fichero.cfg:
define host {...
define service {...
