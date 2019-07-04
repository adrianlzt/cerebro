Si tenemos problemas al borrar porque está bloqueando todo lo que va a borrar mientras se ejecuta, o falla la tx por falta de espacio, podemos intentar borrar con una subselect:
https://stackoverflow.com/questions/3421226/deleting-many-rows-without-locking-them

DELETE FROM
  table
WHERE
  id IN (SELECT id FROM table WHERE key = 'needle' LIMIT 10000);


Con CTEs:

WITH items_to_be_deleted AS (
  select itemid from items order by itemid asc limit 5 offset 100
)
DELETE FROM history_default i
  USING items_to_be_deleted
  WHERE history_default.itemid=items_to_be_deleted.itemid and clock < 1559567933;





Delete puede llenar el dir base/pgsql_tmp
Si vamos limitados de disco un truco es usar borrados de pequeñas partes en vez todo de una


# Truncate
Borramos todo el contenido rápidamente.
delete escanea la tabla por lo que es más lento
