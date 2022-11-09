Generar llamadas SQL y ejecutarlas:

BEGIN;
SELECT 'CREATE TABLE a' || id || ' (id int);'
       FROM generate_series(1, 20000) AS id;
\gexec


Borrar tablas:
select 'drop table ' || tablename ||';' from pg_tables where tablename like 'history_p%'; \gexec

