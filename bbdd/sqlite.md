Repo oficial de sqlite: http://repo.or.cz/sqlite.git

sqlitebrowser - Editor de interfaz de usuario para bases de datos SQLite

Los paquetes sqlite y sqlite3 traen un cliente para ver/editar una base de datos sqlite.
Asegurarse que usamos la versión (2.x o 3.x) de sqlite adecuada.

Para abrir una base de datos sqlite:
sqlite3 bd.sqlite3
> .tables <- como SHOW TABLES en mysql
> .schema zombies <- como DESCRIBE en mysql
> SELECT * FROM zombies;

.dbinfo info sobre la databsae
.databases para mostrar las que tenemos abiertas y como (fichero, tcp, etc)

Si no tenemos los helpers ".*" podemos navegar por:
SELECT * FROM sqlite_master WHERE type='table';

# Develop
http://repo.or.cz/sqlite.git/blob/HEAD:/src/shell.c
Esta es la cli que arranca cuando hacemos ejecutamos sqlite3

# Python
https://docs.python.org/2/library/sqlite3.html
cursor.execute("select * from sqlite_master")

Database activada:
cursor.execute("PRAGMA database_list;").fetchall()[0][2]

