https://www.postgresql.org/docs/current/sql-delete.html

Si tenemos problemas al borrar porque está bloqueando todo lo que va a borrar mientras se ejecuta, o falla la tx por falta de espacio, podemos intentar borrar con una subselect:
https://stackoverflow.com/questions/3421226/deleting-many-rows-without-locking-them

DELETE FROM
  table
WHERE
  id IN (SELECT id FROM table WHERE key = 'needle' LIMIT 10000);

https://stackoverflow.com/a/5171473
Borrar 1M de campos, sin tener que saber ningún id:
DELETE FROM history_default
WHERE ctid IN (
    SELECT ctid
    FROM history_default
    LIMIT 10000000
);


Con CTEs:

WITH items_to_be_deleted AS (
  select itemid from items order by itemid asc limit 5 offset 100
)
DELETE FROM history_default i
  USING items_to_be_deleted
  WHERE history_default.itemid=items_to_be_deleted.itemid and clock < 1559567933;


Podemos hacer un returning para ver que hemos borrado, que metido en un TX nos sirve para ver que estamos borrando antes de comitear
begin;
delete from history where foo='bar' returning foo;


No podemos hacer joins (hay una forma no standar), lo que hacemos es usar un subselect:
DELETE FROM films WHERE producer_id IN (SELECT id FROM producers WHERE name = 'foo');




Delete puede llenar el dir base/pgsql_tmp
Si vamos limitados de disco un truco es usar borrados de pequeñas partes en vez todo de una


# Truncate
Borramos todo el contenido rápidamente.
delete escanea la tabla por lo que es más lento

https://www.postgresql.org/docs/current/sql-truncate.html
TRUNCATE table;

