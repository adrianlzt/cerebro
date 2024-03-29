https://www.postgresql.org/docs/current/sql-update.html

Ejemplo complejo comparando resultados y haciendo dry run: update_dry_run_diff.sql

UPDATE
  tabla
SET
  campo = valor
WHERE
  otrocampo = filtro;


# Update con joins de varias tablas
https://chartio.com/resources/tutorials/how-to-update-from-select-in-sql-server/
En este caso unimos tres tablas (interface, hosts_templates y hosts). Notar que interface no se pone en el "FROM" porque ya está definida en UPDATE
Con esto conseguimos poder usar valores de la tabla hosts para definir el valor de la tabla interface

UPDATE
  interface
SET
  dns = hosts.host,
  useip = 0
FROM
  hosts_templates,
  hosts
WHERE
  interface.hostid=hosts.hostid and
  hosts.hostid=hosts_templates.hostid and
  hosts_templates.templateid = (select hostid from hosts where status=3 and host = 'Template Ping')


# RETURNING / Datos modificados
En una acción UPDATE podemos usar RETURNING para mostrar los rows modificados.
En este caso, tras hacer las modificaciones, mostraremos el contenido de los campos hosts.host, interface.useip, interface.ip e interface.dns (queremos ver los que hemos modificado y algún otro)
También podemos hacer "RETURNING *" para mostrar todo el row.

UPDATE
  interface
SET
  dns = hosts.host,
  useip = 0
FROM
  hosts_templates,
  hosts
WHERE
  interface.hostid=hosts.hostid and
  hosts.hostid=hosts_templates.hostid and
  hosts_templates.templateid = (select hostid from hosts where status=3 and host = 'Template Ping')
RETURNING
 hosts.host,
 interface.useip,
 interface.ip,interface.dns;



# Dry run
Si queremos ver que está haciendo el UPDATE sin que modifique nada, crearemos una transacción y le haremos rollback al final.

BEGIN;
UPDATE
  interface
SET
  dns = hosts.host,
  useip = 0
FROM
  hosts_templates,
  hosts
WHERE
  interface.hostid=hosts.hostid and
  hosts.hostid=hosts_templates.hostid and
  hosts_templates.templateid = (select hostid from hosts where status=3 and host = 'Template Ping')
RETURNING
 hosts.host,
 interface.useip,
 interface.ip,interface.dns;
ROLLBACK;



## Ejemplo del dry-run
CREATE TABLE data(id int, text text);
INSERT INTO DATA VALUES(1,'aaa'),(2,'bbb'),(3,'ccc'),(4,'ddd');

-- original data
SELECT * from data;

-- dry-run update
BEGIN;

UPDATE
  data
SET
  text = 'modified'
WHERE
  id > 2
RETURNING
  id, text;

ROLLBACK;

-- data after dry-run update
SELECT * from data;


# UPDATE con CTE
WITH cte AS (
    SELECT * FROM ...
)
UPDATE table_to_update
SET column_from_table_to_update = cte.some_column
FROM cte
WHERE table_to_update.id = cte.id


Ejemplo para modificar un campo basándonos en el valor de otro campo:
WITH macro AS (
    SELECT
        itemid,
        (regexp_matches(key_, '(\{#[^\}]*\})'))[1] AS m
    FROM
        items)
UPDATE
    items
SET
    name = regexp_replace(name, '(\$1)', macro.m)
FROM
    macro
WHERE
    macro.itemid = items.itemid;
