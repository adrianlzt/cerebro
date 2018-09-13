# Crear indice
https://www.postgresql.org/docs/10/static/sql-createindex.html

CUIDADO! crear un índice bloquea la tabla para los writers!

En una tabla con 500k elementos crear el índice llevo ~1s (vmware con 8 vcpus y 8GB RAM)


Ejemplo:
create index problem_3 on problem(r_eventid);

Crea el índice de nombre "problem_3" en la tabla "problem" para el campo "r_eventid".



https://www.postgresql.org/docs/9.6/static/sql-createindex.html#SQL-CREATEINDEX-CONCURRENTLY
CREATE INDEX CONCURRENTLY, which takes longer but does not lock the table. So the operation has no side effects except higher load on server.



# Borrar indice
https://www.postgresql.org/docs/9.6/static/sql-dropindex.html
