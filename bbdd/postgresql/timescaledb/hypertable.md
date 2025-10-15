# Crear hypertable

```sql
SELECT create_hypertable('conditions', by_time('time', interval '1 day'));

```

# Particiones / chunks

Se puede particionar por fecha (range_start/end) o por un valor (range_start_integer/end_integer)

Ver como está particionada una tabla:

```sql
SELECT
  chunk_name,
  range_start,
  range_end,
  range_start_integer,
  range_end_integer
FROM timescaledb_information.chunks
WHERE hypertable_name = 'history'
ORDER BY range_start;
```

Ver el tamaño de los chunks:

```sql
SELECT
    chunk_schema,
    chunk_name,
    pg_size_pretty(total_bytes) AS pretty_total_size,
    pg_size_pretty(table_bytes) AS pretty_table_size,
    pg_size_pretty(index_bytes) AS pretty_index_size,
    pg_size_pretty(toast_bytes) AS pretty_toast_size
FROM
    chunks_detailed_size('history')
ORDER BY
    total_bytes DESC;
```

Mezclando particionado y chunks:

```sql
SELECT
    cds.chunk_schema,
    cds.chunk_name,
    pg_size_pretty(cds.total_bytes) AS pretty_total_size,
    tic.range_start_integer,
    tic.range_end_integer
FROM
    chunks_detailed_size('history') AS cds
JOIN
    timescaledb_information.chunks AS tic
ON
    cds.chunk_schema = tic.chunk_schema AND cds.chunk_name = tic.chunk_name
ORDER BY
    tic.range_start_integer DESC;
```

# Drop chunks

Antes de borrar, usar `show_chunks` para ver que va a borrar.

Si usamos fechas:

```sql
SELECT drop_chunks('conditions', INTERVAL '3 months');
```

Si usamos ranges que son unix epoch:

```sql
SELECT drop_chunks('history', EXTRACT(EPOCH FROM '2025-10-15'::TIMESTAMP)::integer);
```
