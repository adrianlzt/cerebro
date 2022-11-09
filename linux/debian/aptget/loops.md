Generar llamadas SQL y ejecutarlas:

BEGIN;
SELECT 'CREATE TABLE a' || id || ' (id int);'
       FROM generate_series(1, 20000) AS id;
\gexec
