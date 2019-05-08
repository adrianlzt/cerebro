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

Ejecutar comandos desde la línea de comandos:
$ psql -c "drop database prueba;"

Sacar solo los valores, sin alinear, sin cabeceras ni footers:
psql -XAt -c "select ...;"

Para devolver los resultados separados por un caracter (, por ejemplo) en vez de new line:
-R ,


Ejecutar un fichero .sql:
% psql basededatos -f fichero.sql

Mostrar databases:
$ psql -l
puppetdb=> \l

Cambiar de database (como "use" en mysql):
\c basededatos

Mostrar tablas:
\d

Mostrar una fila por cada valor de cada columna
\x
select * from tabla;

Ayuda:
\h

Salir:
\q

Info de la conexión (user, database, metodo de conex):
\conninfo


# System info
https://www.postgresql.org/docs/current/functions-info.html
Funciones utiles para obtener datos del sistema

Pid que estamos usando en el backend:
SELECT pg_backend_pid();

select inet_server_addr();
  ip del server
