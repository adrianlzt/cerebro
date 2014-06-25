psql -h hostname -U username -d database
  Si no pasamos database, se intentará conectar a una con el mismo nombre que el usuario
  Si no pasamos hostname puede que no funcione porque intenta autenticarse de otra manera

Con password:
psql -h hostname -U username -d database -W

Mostrar databases:
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
