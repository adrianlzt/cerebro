https://docs.timescale.com/api/latest/hypertable/hypertable_size/
https://docs.timescale.com/api/latest/hypertable/hypertable_detailed_size/

SELECT hypertable_name, pg_size_pretty(hypertable_size(format('%I.%I', hypertable_schema, hypertable_name)::regclass)) FROM timescaledb_information.hypertables;

El espacio que nos da es el total, datos+index.

Viendo table, index y toast por separado:
select pg_size_pretty(table_bytes) as table_bytes, pg_size_pretty(index_bytes) as index_bytes, pg_size_pretty(toast_bytes) as toast_bytes, pg_size_pretty(total_bytes) as total_bytes from hypertable_detailed_size('trends');


Cuanto ha comprimido:
SELECT
    (1 - (after_compression_total_bytes::float / before_compression_total_bytes)) * 100 AS compression_ratio,
    pg_size_pretty(before_compression_total_bytes) AS before,
    pg_size_pretty(after_compression_total_bytes) AS after
FROM
    hypertable_compression_stats ('trends');
