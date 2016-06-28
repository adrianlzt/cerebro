psql -h hostname -U username -d database
  Si no pasamos database, se intentará conectar a una con el mismo nombre que el usuario
  Si no pasamos hostname puede que no funcione porque intenta autenticarse de otra manera

Con password:
psql -h hostname -U username -d database -W

Ejecutar comandos desde la línea de comandos:
$ psql -c "drop database prueba;"

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
