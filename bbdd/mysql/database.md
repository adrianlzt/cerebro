CREATE {DATABASE | SCHEMA} [IF NOT EXISTS] db_name
    [create_specification] ...

create_specification:
	[DEFAULT] CHARACTER SET [=] charset_name
	| [DEFAULT] COLLATE [=] collation_name

Ej.: CREATE DATABASE prueba;



DROP {DATABASE | SCHEMA} [IF EXISTS] db_name
Ej.: DROP DATABASE prueba;


RENAME {DATABASE | SCHEMA} db_name TO new_db_name;
Esta opción fue eliminada por seguridad.
Workaround:
mysqldump -u root -p db_name > db_name.sql
mysql> create database new_db_name;
mysql -u root -p new_db_name < db_name.sql
mysql> drop database db_name;

Otra opción: modificando la estructura de directorios
http://www.wellho.net/forum/The-MySQL-Relational-Database/How-to-Rename-database.html


http://dev.mysql.com/doc/refman/5.1/en/alter-database.html
ALTER {DATABASE | SCHEMA} [db_name]
	alter_specification ...
ALTER {DATABASE | SCHEMA} db_name
	UPGRADE DATA DIRECTORY NAME
