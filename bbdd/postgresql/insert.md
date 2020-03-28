http://www.postgresql.org/docs/8.4/static/sql-insert.html

INSERT INTO tabla(col1,col2) VALUES('valor1',3);
INSERT INTO tabla(col1,col2) VALUES('valor1',3),('valor2',10);

NOTA: Debe ir entre comillas simples!


Podemos usar la clause "RETURNING" para mostrar los rows creados (o ciertos valores de ese row)


# INSERT - SELECT
mirar upsert.md


# condicional
Pequeño truco que nos permite hacer un condicional en el insert.
En este caso, estamos haciendo insert de "VALUES('x','y')" si la tabla jobmon.dblink_mapping_jobmon está vacía:
with j as (select 'x' as username, 'y' as pwd where (select count(*)=0 from jobmon.dblink_mapping_jobmon))
INSERT into jobmon.dblink_mapping_jobmon (username,pwd) select username,pwd from j;



# bulk insert
Notas sobre como mejorar la inserción de muchos datos, pensado para el arranque de una bd, no para funcionamiento normal.

https://www.postgresql.org/docs/current/populate.html
