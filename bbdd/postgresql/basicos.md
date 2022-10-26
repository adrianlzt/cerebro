# pgcli
Escrito en python
Con autocompletado, colores, etc


# psql
psql -h hostname -U username -d database
  Si no pasamos database, se intentará conectar a una con el mismo nombre que el usuario
  Si no pasamos hostname puede que no funcione porque intenta autenticarse de otra manera

psql -d "postgresql://user:password@hostA:portA,hostB:portB/basededatos?target_session_attrs=read-write"
  conectar solo a la que sea read-write (no a una standby)

Con password (-W ahorra el primer intento de conex sin auth, y lo intenta directamente con auth):
psql -h hostname -U username -d database -W

Pasando la pass como venv:
PGPASSWORD=yourpass psql ...

Pasando la pass en un fichero:
https://www.postgresql.org/docs/current/libpq-pgpass.html
https://tableplus.com/blog/2019/09/how-to-use-pgpass-in-postgresql.html
~/.pgpass
Formato
hostname:port:database:username:password

Si en hostname ponemos localhost, esa línea se usará tambien para conex via sockeg
Se pueden usar asteriscos


Ejecutar comandos desde la línea de comandos:
$ psql -c "drop database prueba;"

Sacar solo los valores, sin alinear, sin cabeceras ni footers:
psql -P pager=off -XAt -c "select ...;"

Para separar los valores de cada línea por un caracter distinto a "|":
-F ,

Para devolver los resultados separados por un caracter (, por ejemplo) en vez de new line:
-R ,


Ejecutar un fichero .sql:
% psql basededatos -f fichero.sql

Mostrar databases:
$ psql -l
puppetdb=> \l

Cambiar de database (como "use" en mysql):
\c basededatos

Mostrar tablas, vistas, secuencias e índices:
\d
\d a*

Mostrar tablas del schema "partman":
\dp partman.*

Mostrar una fila por cada valor de cada columna
\x
select * from tabla;

\e
editar el último statement con un editor
si tenemos comentarios con -- los perderemos, podemos usar /* comentario */
si queremos editar un comando anterior al último, quitarle el punto y coma, dar a enter y luego \e.
Al dar a enter lo metemos en el buffer y el \e lo editará.

Ayuda:
\h
\h create table

Salir:
\q

Info de la conexión (user, database, metodo de conex):
\conninfo

\set AUTOCOMMIT off
desactivar el autocommit, de esta manera si queremos hacer cualquier cosa tendremos que poner "COMMIT;" al final
Chequear el estado del autocommit:
\echo :AUTOCOMMIT


# System info
https://www.postgresql.org/docs/current/functions-info.html
Funciones utiles para obtener datos del sistema

Pid que estamos usando en el backend:
SELECT pg_backend_pid();

select inet_server_addr();
  ip del server


# Pager
https://github.com/okbob/pspg

\setenv PAGER 'pspg -Xs 16'

-- cambiar de pager con :x o :xx
\set x '\\setenv PAGER less'
\set xx '\\setenv PAGER \'pspg -Xs 16\''


pspg es un pager específico para postgres


# Placeholders
Ejemplo de un workaround para usar placeholders con psql -f
$ cat test.sql
\echo -n 'Enter something: '
\set val1 `read && echo $REPLY`
\echo -n 'And something else: '
\set val2 `read && echo $REPLY`
select :val1, :val2;

$ psql -f test.sql


# metacommands
Mostrar que están lanzando
$ psql -E
=# /d
Saldrá la query qye estamos lanzando
