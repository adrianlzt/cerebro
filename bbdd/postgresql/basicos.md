psql -h hostname -U username -d database
  Si no pasamos database, se intentará conectar a una con el mismo nombre que el usuario
  Si no pasamos hostname puede que no funcione porque intenta autenticarse de otra manera

Con password (-W ahorra el primer intento de conex sin auth, y lo intenta directamente con auth):
psql -h hostname -U username -d database -W

Pasando la pass como venv:
PGPASSWORD=yourpass psql ...

Ejecutar comandos desde la línea de comandos:
$ psql -c "drop database prueba;"

Sacar solo los valores, sin alinear, sin cabeceras ni footers:
psql -At -c "select ...;"

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
