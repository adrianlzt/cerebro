Aqui podemos definir parámetros de la base de datos.

Hay varias secciones:

[client]
Se usa cuando usamos mysql para conectarnos una base de datos
Algunos parámetros típicos:
port            = 3306
socket          = /var/run/mysqld/mysqld.sock
user		= root
password        = root


Se puede hacer includes
!include /srv/mysql/etc/my.cnf

