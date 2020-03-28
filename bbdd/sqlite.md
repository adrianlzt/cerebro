Repo oficial de sqlite: http://repo.or.cz/sqlite.git

repl online: https://www.tutorialspoint.com/execute_sql_online.php

sqlitebrowser - Editor de interfaz de usuario para bases de datos SQLite

Los paquetes sqlite y sqlite3 traen un cliente para ver/editar una base de datos sqlite.
Asegurarse que usamos la versión (2.x o 3.x) de sqlite adecuada.

Ejecutar comando
sqlite3 fichero.db "select 1"

Para abrir una base de datos sqlite:
sqlite3 bd.sqlite3
> .tables <- como SHOW TABLES en mysql
> .schema zombies <- como DESCRIBE en mysql
> SELECT * FROM zombies;

.dbinfo info sobre la databsae
.databases para mostrar las que tenemos abiertas y como (fichero, tcp, etc)

Si no tenemos los helpers ".*" podemos navegar por:
SELECT * FROM sqlite_master WHERE type='table';


# Time/Date
https://www.tutorialspoint.com/sqlite/sqlite_date_time.htm
'now' equivalente al now() de postgres (poner con comillas)


# Develop
http://repo.or.cz/sqlite.git/blob/HEAD:/src/shell.c
Esta es la cli que arranca cuando hacemos ejecutamos sqlite3

# Python
Esta el la standard library
https://docs.python.org/3.8/library/sqlite3.html

import sqlite3
conn = sqlite3.connect('example.db')
cursor.execute("select * from sqlite_master")

Database activada:
cursor.execute("PRAGMA database_list;").fetchall()[0][2]



# Extender sqlite
http://charlesleifer.com/blog/extending-sqlite-with-python/

Podemos conectar sqlite con cualquier software definiendo una serie de funciones.
Luego usaremos el lenguaje sql para comunicarnos con eso.
Un ejemplo podría ser git, y hacer "select author from commits"
