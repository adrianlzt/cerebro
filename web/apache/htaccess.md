Ejemplo:

.htaccess:
Order Deny,Allow
Allow from all
Deny from all
AuthType Basic
AuthName "Access to /back"
AuthUserFile /path/completo/al/htpasswd
Require user admin


Si solo queremos dar acceso a una ip:
En vez de
Allow from all
ponemos
Allow from 212.227.112.228



htpasswd -bc passwd admin password
