https://docs.timescale.com/api/latest/hypertable/hypertable_size/
https://docs.timescale.com/api/latest/hypertable/hypertable_detailed_size/

SELECT hypertable_name, pg_size_pretty(hypertable_size(format('%I.%I', hypertable_schema, hypertable_name)::regclass)) FROM timescaledb_information.hypertables;

El espacio que nos da es el total, datos+index.

Viendo table, index y toast por separado:
select pg_size_pretty(table_bytes) as table_bytes, pg_size_pretty(index_bytes) as index_bytes, pg_size_pretty(toast_bytes) as toast_bytes, pg_size_pretty(total_bytes) as total_bytes from hypertable_detailed_size('trends');
