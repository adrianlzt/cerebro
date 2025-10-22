<https://docs.timescale.com/use-timescale/latest/compression/>

Al añadir rows se meten sin compresión.
Tiene un job que va realizando la compresión.

La compresión funciona metiendo varios rows en uno solo, usando un arrray.
Parece que los índices que puedan venir en la tabla se dejan de usar, en favor de unos custom de timescale.

Configuraciones de compresión:
select \* from timescaledb_information.compression_settings;

Aquí podemos ver si está la compresión habilitada:
SELECT \* FROM timescaledb_information.hypertables;

Aquí podemos ver como particiona y si tiene alguna función definida para tablas sin columna de tipo date
<https://docs.timescale.com/api/latest/informational-views/dimensions/>
SELECT \* from timescaledb_information.dimensions;

# Activar compresión

Ejemplo de zabbix:
alter table trends set (timescaledb.compress,timescaledb.compress_segmentby='itemid',timescaledb.compress_orderby='clock');
alter table history set (timescaledb.compress,timescaledb.compress_segmentby='itemid',timescaledb.compress_orderby='clock,ns');

# Añadir política de compresión

<https://docs.timescale.com/api/latest/compression/add_compression_policy/>

SELECT add_compression_policy('cpu', INTERVAL '60d');
Comprimir los chunks más antiguos de 60 días.

Si queremos usar un campo que no es tipo date para elegir la compresión, tenemos que realizar una operativa más.
<https://docs.timescale.com/api/latest/hypertable/set_integer_now_func/>
Tenemos que crear una función que devuelva now() en el tipo de dato del campo y asignar esa función a la tabla con set_integer_now_func().

Comprimir todos los chunks de una tabla que no estén comprimidos:
SELECT compress_chunk(chunk, if_not_compressed => TRUE) FROM show_chunks('nombre_tabla') as chunk;
SELECT compress_chunk('\_timescaledb_internal.\_hyper_7_103_chunk');

# Estadísticas

<https://docs.timescale.com/api/latest/compression/hypertable_compression_stats/>
SELECT \* FROM hypertable_compression_stats('nombre_tabla');

<https://docs.timescale.com/api/latest/compression/chunk_compression_stats/>
SELECT \* FROM chunk_compression_stats('nombre_tabla') ORDER BY chunk_name;

Cuanto ha comprimido:
SELECT
(1 - (after_compression_total_bytes::float / before_compression_total_bytes)) \* 100 AS compression_ratio,
pg_size_pretty(before_compression_total_bytes) AS before,
pg_size_pretty(after_compression_total_bytes) AS after
FROM
hypertable_compression_stats ('trends');

# Chunks

Chunk de una hypertable
<https://docs.timescale.com/api/latest/hypertable/show_chunks/>

SELECT show_chunks('nombre_tabla');
SELECT show_chunks('trends', older_than => INTERVAL '3 months');
SELECT show_chunks('trends', older_than => DATE '2017-01-01');
SELECT show_chunks('trends', older_than => 1601250362);
SELECT show_chunks('trends', older_than => ROUND(EXTRACT(EPOCH FROM now() - INTERVAL '3 MONTH'))::integer);

Chunks no comprimidos de una tabla:
SELECT chunk_schema||'.'||chunk_name as chunk FROM chunk_compression_stats('trends') WHERE compression_status = 'Uncompressed' ORDER BY chunk_name;

Ver chunks de cada tabla, con el rango que incluyen y viendo si están comprimidos (caso donde el range es un tipo int que representa unix epoch):
select hypertable_name,chunk_name,is_compressed,to_timestamp(range_start_integer) as range_start_integer, to_timestamp(range_end_integer) as range_end_integer from timescaledb_information.chunks where hypertable_name like 'trends%' order by hypertable_name, range_start_integer;

# Jobs

mirar jobs.md

# Uncompress / decompress

<https://docs.timescale.com/use-timescale/latest/compression/decompress-chunks/>

Timescale automatically supports INSERTs into compressed chunks. But if you need to insert a lot of data, for example as part of a bulk backfilling operation, you should first decompress the chunk. Inserting data into a compressed chunk is more computationally expensive than inserting data into an uncompressed chunk. This adds up over a lot of rows.

Pero no se soporta insertar en compressed chunks con primary or unique constrains: <https://github.com/timescale/timescaledb/issues/3323>
Al menos hasta la 2.11.

Desactivar primero las políticas de compresión que tengamos:
<https://docs.timescale.com/use-timescale/latest/compression/compression-policy/#remove-compression-policy>
