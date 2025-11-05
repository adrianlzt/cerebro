<https://eng.uber.com/mysql-migration/>

Comentan algunos detalles de como funciona internamente postgres, de como almacena la información en disco.

# Memoria / disco / wal

Por defecto los bloques en memoria y disco son 8kB

Al leer las cosas se mueven del disco a shared buffers.
Si se realiza la misma lectura se leerá del shared buffer.

Si realizamos un update, se lleva a un WAL buffer.
Del wal buffer se escriben a WAL files (de 16MB), de manera secuencial (rápido).

Cuando se llenan los shared buffers, tenemos que empezar a borrar bloques.
Los bloques que han sido actualizados y tienen cambios en el WAL son "dirty", esos no se pueden borrar hasta que no se flusheen a disco.
También los bloques guardan un metadata de el último WAL que se aplicó, para evitar una reaplicación en caso de crash y tener que reaplicar los WAL a lo almacenado en disco.
También tiene un metadata 0-5 de uso (5=max use)

Si necesitamos memoria y no tenemos, un select puede forzar que dirty blocks se muevan al disco.

"checkpoint" es cuando postgres va moviendo cosas al disco y borrando los WAL files que ya no hacen falta.

"bgwriter" cada 200ms, flushea los least used (el número de páginas que se van a flushear es un cálculo basado en dos parametros <https://postgresqlco.nf/en/doc/param/bgwriter_lru_multiplier>)
Mirar checkpoint.md "# Checkpoint"

# buffers

Consultar el shared buffer, podemos usar la extensión pg_buffercache
<https://paquier.xyz/postgresql-2/postgres-feature-highlight-pg_buffercache/>

Tamaño:

```sql
show shared_buffers;
```

```sql
create EXTENSION pg_buffercache;
```

Porcentaje de uso de la buffer cache (este buffer es general para todas las bbdd).

```sql
select count(relfilenode)*100.0/count(*) as buff_pct_used from pg_buffercache;
```

Megas usados por cada tabla (solo mostrará las tablas de la bbdd a la que estemos conectados):

```sql
SELECT
  c.relname AS table_name,
  count(*) AS blocks_in_cache,
  pg_size_pretty(count(*) * 8192) AS size_in_cache, -- Assumes 8kB blocks

  -- Calculate % of total shared_buffers
  ROUND(
    (count(*) * 100.0 /
      (SELECT setting::bigint FROM pg_settings WHERE name = 'shared_buffers')
    )::numeric, 2
  ) AS pct_of_total_cache
FROM
  pg_buffercache AS b
JOIN
  pg_class AS c ON b.relfilenode = c.relfilenode
WHERE
  -- Filter for the current database's OID
  b.reldatabase = (SELECT oid FROM pg_database WHERE datname = current_database())
GROUP BY
  c.relname
ORDER BY
  blocks_in_cache DESC
LIMIT 20;
```

Postgres usa algunos trucos al leer, dando por hecho que por debajo tenemos un SO que va a gestionar la lectura del disco.
Si hacemos un avg(\*) de una tabla, usará un ring buffer para ir calculando los datos, por eso solo usará algunos bloques.

Ver el contenido de un block:

```sql
select * from heap_page_items(get_raw_page('prueba4',2));
```

Cuidado! Puede que los objetos no estén en la buffer cache, pero estén en la cache del SO.
Esto quiere decir que puede estar yendo rápido (porque las cosas están en memoria) aunque no estén en la buffer cache.

De la doc oficial, número de buffer por relation.

```sql
SELECT n.nspname, c.relname, count(*) AS buffers
             FROM pg_buffercache b JOIN pg_class c
             ON b.relfilenode = pg_relation_filenode(c.oid) AND
                b.reldatabase IN (0, (SELECT oid FROM pg_database
                                      WHERE datname = current_database()))
             JOIN pg_namespace n ON n.oid = c.relnamespace
             GROUP BY n.nspname, c.relname
             ORDER BY 3 DESC
             LIMIT 10;
```

## usage count

column called usage_count. This is a small counter (0-5) that indicates how "hot" a block is. When Postgres needs to evict a block, it looks for one with a low usage_count (like 1 or 0).

A usage_count of 1 means: "This block was recently read from disk, used once, and hasn't been touched since." It is a prime candidate for eviction.

A usage_count of 5 (the max) means: "This block is very hot! Don't evict it."

```sql
SELECT
  c.relname AS table_name,
  b.usagecount,
  count(*) AS num_blocks
FROM
  pg_buffercache AS b
JOIN
  pg_class AS c ON b.relfilenode = c.relfilenode
WHERE
  -- Filter for the current database
  b.reldatabase = (SELECT oid FROM pg_database WHERE datname = current_database())
  -- Filter for our specific Zabbix tables and their main indexes
  AND c.relname like '%history%pkey' or c.relname like '%trends%pkey'
GROUP BY
  c.relname, b.usagecount
ORDER BY
  count(*) DESC
limit 20;
```

Ejemplo database zabbix. Vemos que las particiones de trends se pueden sacar porque no se están usando (han pasado 10' desde las en punto).

```
        table_name         | usagecount | num_blocks
---------------------------+------------+------------
 119_117_history_pkey      |          5 |     606255
 120_118_history_uint_pkey |          5 |     480024
 5_5_trends_pkey           |          0 |     231570
 6_6_trends_uint_pkey      |          0 |     154681
 120_118_history_uint_pkey |          0 |     140385
 119_117_history_pkey      |          0 |     122683
 119_117_history_pkey      |          4 |      96092
```

## drop cache

<https://github.com/zilder/pg_dropcache>
Extension that invalidates shared_buffers cache
