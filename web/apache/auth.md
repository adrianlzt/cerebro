Ejemplo de auth básica:

<Directory "/usr/share/icinga/">
   Order allow,deny
   Allow from all
   AuthName "Mensajito"
   AuthType Basic
   AuthUserFile /etc/apache/passwd
   Require valid-user
</Directory>


Crear usuario:
htpasswd -bs /etc/apache/passwd usuario password



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
