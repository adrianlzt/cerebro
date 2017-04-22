Necesita idodb para funcionar:
https://docs.icinga.com/icinga2/latest/doc/module/icinga2/toc#!/icinga2/latest/doc/module/icinga2/chapter/getting-started#setting-up-icingaweb2

# Instalar modulo ido
yum install icinga2-ido-mysql

# Configurar db
CREATE DATABASE icinga;
GRANT SELECT, INSERT, UPDATE, DELETE, DROP, CREATE VIEW, INDEX, EXECUTE ON icinga.* TO 'icinga'@'localhost' IDENTIFIED BY 'icinga';

Cargar schema:
mysql -uroot -p icinga < /usr/share/icinga2-ido-mysql/schema/mysql.sql 


# Activamos modulo
icinga2 feature enable ido-mysql

Editamos la conf contra la bbdd
/etc/icinga2/features-enabled/ido-mysql.conf



# Install icinga-web2
https://github.com/Icinga/icingaweb2/blob/master/doc/02-Installation.md

Meter repo de icinga y de epe

yum install icingaweb2 icingacli


Crear conf para nginx (la meteremos en el server{} que corresponda, en el default si no tenemos nada más, por ejemplo):
icingacli setup config webserver nginx --document-root /usr/share/icingaweb2/public

php-fpm debe estar instalado y configurado

Crear grupo y meter el usuario en el grupo de nginx:
groupadd -r icingaweb2
usermod -a -G icingaweb2 nginx

Crear conf de ejemplo:
icingacli setup config directory

Crear token para la conf web (apuntar, lo usaremos luego):
icingacli setup token create

Visitar para termina la conf:
http://midominio.com/icingaweb2/setup

Tenemos que crear tambien una database para icingaweb2
CREATE DATABASE icingaweb2;
GRANT SELECT, INSERT, UPDATE, DELETE, DROP, CREATE VIEW, INDEX, EXECUTE ON icingaweb2.* TO 'icingaweb2'@'localhost' IDENTIFIED BY 'icingaweb2';
mysql -p icingaweb2 < /usr/share/doc/icingaweb2/schema/mysql.schema.sql


# Usuarios
En Configuration -> Auth.. podemos crear usuarios

Si queremos crear usuarios que solo puedan ver haremos:
Creamos un grupo, por ejemplo "Viewers"

Creamos un rol, por ejemplo "Viewers".
Al rol le damos solo el permission set "Allow access to module monitoring"
Metemos al grupo Viewers en este rol.

Creamos un usuario y lo metemos en el grupo Viewers
