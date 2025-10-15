Podemos usar timescaledb para comprimir las trends.

Si activamos la compresión, <https://www.zabbix.com/documentation/6.0/en/manual/appendix/install/timescaledb#timescaledb-compression>, será el proceso de housekeeper quien se encarga de la compresión.

Comprobar la configuración en postgres:
select compression_status,db_extension,dbversion_status from config;

compression_status=1 es que está activado. Comprobar dbversion_status.compression_availability para ver si está disponible.
db_extension debe estar a 'timescaledb'.
dbversion_status es un JSON donde si vemos extension_err_code es que tenemos un error (excepto si está a 1, que no tenemos problemas).

Si queremos ver si timescaledb tiene configurados los jobs de compresión:

```sql
select * from timescaledb_information.jobs;
select hypertable_name,max_runtime,config,next_start from timescaledb_information.jobs where proc_name = 'policy_compression';
```

compress_after=612000 son 7d de compress_older más 2h que mete de margen.

Parece que ese valor es el de la tabla config.compress_older

Para poder comprimir las tablas, al no tener un campo tipo "date", tiene que crearse una función que devuelva now()
con el formato de la columna que almacena la fecha.
Zabbix crea la función: zbx_ts_unix_now (definida en la macro ZBX_TS_UNIX_NOW_CREATE)
create or replace function zbx_ts_unix_now() returns integer language sql stable as $$ select extract(epoch from now())::integer $$;

Y la asigna con:

```sql
select set_integer_now_func('TABLA', 'zbx_ts_unix_now', true)
```

Podemos consultar la asignación en:

```sql
SELECT * from timescaledb_information.dimensions;
```

Para activar la compresión ejecuta, para todas las tablas history y trends:

```sql
alter table trends set (timescaledb.compress,timescaledb.compress_segmentby='itemid',timescaledb.compress_orderby='clock');
alter table trends_uint set (timescaledb.compress,timescaledb.compress_segmentby='itemid',timescaledb.compress_orderby='clock');
alter table HISTORY_NOMBRE_TABLA set (timescaledb.compress,timescaledb.compress_segmentby='itemid',timescaledb.compress_orderby='clock,ns');
```

Se puede configurar la configuración con:

```sql
select * from timescaledb_information.compression_settings;
```

Fichero donde se gestiona configurar las compresiones, etc:
src/zabbix_server/housekeeper/history_compress.c

# Tamaños chunks

```sql
SELECT
    cds.chunk_schema,
    cds.chunk_name,
    pg_size_pretty(cds.total_bytes) AS pretty_total_size,
    to_timestamp(tic.range_start_integer::double precision) AS range_start_time,
    to_timestamp(tic.range_end_integer::double precision) AS range_end_time
FROM
    chunks_detailed_size('history') AS cds
JOIN
    timescaledb_information.chunks AS tic
ON
    cds.chunk_schema = tic.chunk_schema AND cds.chunk_name = tic.chunk_name
ORDER BY
    tic.range_start_integer DESC;
```

# Borrar chunks a mano

Primero comprobar que va a borrar:

```sql
SELECT show_chunks('history', EXTRACT(EPOCH FROM '2025-10-15'::TIMESTAMP)::integer);
```

```sql
SELECT drop_chunks('history', EXTRACT(EPOCH FROM '2025-10-15'::TIMESTAMP)::integer);
```

# Ratios de compresión

```sql
SELECT
    (1 - (after_compression_total_bytes::float / before_compression_total_bytes)) * 100 AS compression_ratio,
    pg_size_pretty(before_compression_total_bytes) AS before,
    pg_size_pretty(after_compression_total_bytes) AS after
FROM
    hypertable_compression_stats ('trends');
```

Vistos valores del 90%

```sql
SELECT
    (1 - (after_compression_total_bytes::float / before_compression_total_bytes)) * 100 AS compression_ratio,
    pg_size_pretty(before_compression_total_bytes) AS before,
    pg_size_pretty(after_compression_total_bytes) AS after
FROM
    hypertable_compression_stats ('trends_uint');
```

Vistos valores del 94%

# Problemas

La compresión de chunks bloquea los update de trends.
<https://github.com/timescale/timescaledb/issues/4432#issuecomment-1158765200>
