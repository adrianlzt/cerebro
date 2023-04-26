create tabla_backup as select * from tabla;

Podemos usar pg_dump para hacer backup de una sola tabla.

Si queremos importar varios dumps en una misma tabla, puede haber conflictos por key uniq.
Un truco es importarlo en otra tabla (sed para modificar el dump .sql) y luego usar:

insert into table_one select * from table_two on conflict do nothing;
