Dentro de una base de datos:
select * from information_schema.tables;


Chequeo si la basededatos tiene alguna tabla. Si no, la división por 0 devolverá error (1)
psql -c "select 1/(select count(*) from information_schema.tables where table_schema='public' and table_catalog='basededatos');" basededatos


