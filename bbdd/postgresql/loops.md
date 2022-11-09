DO
$$
DECLARE
    row record;
BEGIN
    FOR row IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' -- and other conditions, if needed
    LOOP
        EXECUTE 'ALTER TABLE public.' || quote_ident(row.tablename) || ' SET SCHEMA [new_schema];';
    END LOOP;
END;
$$;



Generar llamadas SQL y ejecutarlas:

BEGIN;
SELECT 'CREATE TABLE a' || id || ' (id int);'
       FROM generate_series(1, 20000) AS id;
\gexec


Borrar tablas:
select 'drop table ' || tablename ||';' from pg_tables where tablename like 'history_p%'; \gexec
