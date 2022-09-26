https://docs.timescale.com/api/latest/hypertable/hypertable_size/
https://docs.timescale.com/api/latest/hypertable/hypertable_detailed_size/

SELECT hypertable_name, pg_size_pretty(hypertable_size(format('%I.%I', hypertable_schema, hypertable_name)::regclass)) FROM timescaledb_information.hypertables;

El espacio que nos da es el total, datos+index.

