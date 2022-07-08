Privilegios: https://dev.mysql.com/doc/refman/5.5/en/privileges-provided.html

Crear usuario:
mysql> CREATE USER 'user'@'localhost' IDENTIFIED BY 'password'; http://dev.mysql.com/doc/refman/5.0/es/create-user.html
mysql> GRANT ALL ON database.* TO 'user'@'localhost';  http://dev.mysql.com/doc/refman/5.0/es/grant.html

Para acceso externo:
	Revisar donde esta enlazado mysql (bind-address en /etc/my.cnf)
	Crear usuario que pueda acceder desde remoto:
	mysql> CREATE USER 'user'@'192.168.0.3' IDENTIFIED BY 'password';
	mysql> GRANT ALL ON database.* TO 'user'@'192.168.0.3';

Acceso desde cualquier ip:
	 mysql> CREATE USER 'user'@'%' IDENTIFIED BY 'password';
	 mysql> GRANT ALL ON database.* TO 'user';


Mostrar credenciales:
SHOW GRANTS;
  solo muestra lo del user logueado
show grants for pepe;
SHOW GRANTS FOR 'user'@'ip';
select host, user, password from mysql.user;

Borrar usuario:
mysql> DROP USER 'user'@'localhost';
Important
DROP USER does not automatically close any open user sessions. Rather, in the event that a user with an open session is dropped, the statement does not take effect until that user's session is closed. Once the session is closed, the user is dropped, and that user's next attempt to log in will fail. This is by design.

Cambiar contraseña:
mysql> SET PASSWORD FOR 'bugs'@'localhost' = PASSWORD("la pass");

Modificar tabla mysql.users:
update mysql.user set host="%" where user="datadope";
flush privileges;

mysqladmin -u root -p'oldpassword' password newpass


Mostrar usuarios:
/usr/bin/mysql -NBe "SELECT CONCAT(User, '@',Host) AS User FROM mysql.user"
