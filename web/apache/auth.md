# Ejemplo auth basic

<Location /api>
  AuthName "Icinga API"
  AuthType Basic
  AuthUserFile /srv/nagios/apache/passwd.api
  Require valid-user
</Location>


<Directory "/usr/share/icinga/">
   AuthName "Mensajito"
   AuthType Basic
   AuthUserFile /etc/apache/passwd
   Require valid-user
</Directory>


Crear usuario:
htpasswd -bs /etc/apache/passwd usuario password



# Varios ficheros de htpasswd
Usar dos ficheros distintos de passwd: http://httpd.apache.org/docs/2.2/mod/mod_authn_alias.html

<AuthnProviderAlias file file1>
  AuthUserFile /www/conf/passwords1
</AuthnProviderAlias>

<AuthnProviderAlias file file2> 
  AuthUserFile /www/conf/passwords2
</AuthnProviderAlias>

<Directory /var/web/pages/secure>
  AuthBasicProvider file1 file2
  AuthType Basic
  AuthName "Protected Area"
  Require valid-user
</Directory>



# Configuracion

## WSGI
https://code.google.com/p/modwsgi/wiki/AccessControlMechanisms

Usar scripts custom para gestionar auth


## AuthType
https://httpd.apache.org/docs/2.2/es/mod/core.html#authtype

Basic (mod_auth_basic) usa el procolo http basic, que envia el user y la pass en claro. Usar con mod_ssl para darle más seguridad.
Digest (mod_auth_digest) parece que no se usa.

## AuthName
Titulo (Realm) de la autenticación. Es lo que mostrará el navegador, y se usa por el servidor para saber que nos están enviando
Si usamos este mismo valor varias veces, el navegador enviará las credenciales ya almacenadas, no pidiendo varias veces la misma pass.

## AuthBasicProvider
file (mod_authn_file), valor por defecto.
Otras opciones:
mod_authn_dbm, fichero .dbm. Más rápido en caso de tener muchos usuarios. Se maneja con https://httpd.apache.org/docs/2.2/es/programs/dbmmanage.html
mod_authn_dbd, consulta en SQL

## AuthUserFile
Definimos el fichero htpasswd donde leera los users y pass (en caso de AuthBasicProvider file)
O el fichero .dbm en caso de usar mod_authn_dbm

## Require
Que usuario o grupo está permitido para acceder. También se puede espeficiar que cualquier usuario válido.

Require user pepe
Require group dev
Require valid-user

## Satisfy
https://httpd.apache.org/docs/2.2/es/howto/auth.html#satisfy

Decide si se deben cumplir todas las reglas para dejar pasar a un usuario, o solo con que cumpla una es suficiente.
Puede ser 'all' (por defecto) o 'any'.

Esto aplicará sobre las reglas Allow y Require

## AuthGroupFile
Definir grupos de usuarios para luego hacer "Require" a un grupo en vez de a un usuario

/etc/httpd/grupos:
GroupName: rbowen dpitts sungo rshersey

conf:
AuthGroupFile /usr/local/apache/passwd/groups
Require group GroupName

## Access control
Mirar access_control.md



# Performance
A partir de unos cientos de usuarios tendremos que buscar otro método de auth porque probablemente este nos va a reducir el rendimiento.

https://httpd.apache.org/docs/2.2/es/howto/auth.html#possibleproblems
