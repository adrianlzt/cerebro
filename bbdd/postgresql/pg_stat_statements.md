# pg_state_monitor

<https://github.com/percona/pg_stat_monitor>
pg_stat_monitor is developed on the basis of pg_stat_statements as its more advanced replacement.
Parece que uno de los puntos que soluciona es la mala agregación que hace pg_stat_statements cuando tenemos la misma query con diferentes parameters (un insert con diferente número de values insertados).

Guía de uso: <https://docs.percona.com/pg-stat-monitor/user_guide.html>

Reference: <https://docs.percona.com/pg-stat-monitor/reference.html>

Podemos ver las columnas con:

```sql
\d pg_stat_monitor;
```

No tiene io.

# pg_stat_statements

<https://www.postgresql.org/docs/current/pgstatstatements.html>

Suele venir en el paquete -contrib:
/usr/pgsql-12/share/extension/pg_stat_statements.\*

La tenemos que cargar en shared_preload_libraries, en el fichero de config o con:

```sql
alter system set shared_preload_libraries = pg_stat_statements;
```

valores separados por coma. Comprobar antes si ya tenemos algún valor definido: show shared_preload_libraries ;
para poner varios: alter system set shared_preload_libraries = pgaudit,pg_stat_statements;

```bash
systemctl restart postgresql-NN
```

Para instalarlo:

```sql
create extension pg_stat_statements;
```

When pg_stat_statements is active, it tracks statistics across all databases of the server

Una vez ejecutado el create extension ya quedará cargado para siempre.

## Vista

```sql
select * from pg_stat_statements;
```

Queries con más tiempo total, cuantas veces han sido llamadas, cuantas rows traidas y el hit_percent:

```sql
SELECT pu.usename, query, calls, total_time, rows, 100.0 * shared_blks_hit nullif(shared_blks_hit + shared_blks_read, 0) AS hit_percent FROM pg_stat_statements pss join pg_user pu ON (pu.usesysid=pss.userid) ORDER BY total_time DESC LIMIT 5;
```

## Reiniciar estadísticas

pg_stat_statements_reset(userid Oid, dbid Oid, queryid bigint);
Podemos no especificar alguno de los valores para que que matchee todos los de ese tipo.

Ejemplo para reiniciar todo:

```sql
SELECT pg_stat_statements_reset(0,0,0);
```

## Analizar impacto en IO

Caso específico para la db de zabbix.

Quiero ver cuanto impacto tiene los inserts.

```sql
SELECT
  CASE
    WHEN query LIKE 'insert into history %' THEN 'INSERT INTO history (aggregated)'
    WHEN query LIKE 'insert into history_uint %' THEN 'INSERT INTO history_uint (aggregated)'
    WHEN query LIKE 'insert into trends %' THEN 'INSERT INTO trends (aggregated)'
    WHEN query LIKE 'insert into trends_uint %' THEN 'INSERT INTO trends_uint (aggregated)'
    ELSE 'others'
  END AS query_group,

  -- 2. Aggregate stats
  SUM(calls) AS total_calls,
  ROUND(SUM(total_exec_time)::numeric / SUM(calls)::numeric, 2) AS mean_time_ms,
  SUM(rows) AS total_rows_affected,

  -- 3. I/O Read Stats (with "pretty" sizes and new avg)
  pg_size_pretty(SUM(shared_blks_hit) * 8192) AS total_blks_hit,
  pg_size_pretty(SUM(shared_blks_read) * 8192) AS total_blks_read,
  ROUND((SUM(shared_blks_read)::numeric / SUM(calls)::numeric), 3) AS avg_read_blks_per_call,
  ROUND((SUM(shared_blks_hit) * 100.0 / NULLIF(SUM(shared_blks_hit) + SUM(shared_blks_read), 0))::numeric, 1) AS cache_hit_pct,

  -- 4. I/O Write Stats (with "pretty" sizes)
  pg_size_pretty(SUM(shared_blks_dirtied) * 8192) AS total_blks_dirtied,
  ROUND((SUM(shared_blks_dirtied)::numeric / SUM(calls)::numeric), 3) AS avg_dirtied_blks_per_call,
  pg_size_pretty(SUM(shared_blks_written) * 8192) AS total_blks_written
FROM
  pg_stat_statements
WHERE
  query LIKE 'insert into history%' OR query LIKE 'insert into trends%'
GROUP BY
  query_group
ORDER BY
  -- Order by the raw number of dirtied blocks, not the text representation
  SUM(shared_blks_dirtied) DESC;
```

Output:

```
              query_group              | total_calls | mean_time_ms | total_rows_affected | total_blks_hit | total_blks_read | avg_read_blks_per_call | cache_hit_pct | total_blks_dirtied | avg_dirtied_blks_per_call | total_blks_written
---------------------------------------+-------------+--------------+---------------------+----------------+-----------------+------------------------+---------------+--------------------+---------------------------+--------------------
 INSERT INTO history (aggregated)      |    61185255 |         5.57 |         14616366346 | 984 TB         | 530 GB          |                  1.135 |          99.9 | 3488 GB            |                     7.473 | 1660 GB
 INSERT INTO history_uint (aggregated) |    64324118 |         4.70 |         16189804872 | 1090 TB        | 446 GB          |                  0.908 |         100.0 | 3055 GB            |                     6.225 | 1680 GB
 INSERT INTO trends_uint (aggregated)  |     2822390 |         2.64 |            12047506 | 940 GB         | 90 GB           |                  4.189 |          91.2 | 92 GB              |                     4.271 | 14 GB
 INSERT INTO trends (aggregated)       |       29931 |         0.61 |               77876 | 7112 MB        | 606 MB          |                  2.593 |          92.1 | 621 MB             |                     2.658 | 177 MB
 others                                |      140789 |         0.16 |              441174 | 37 GB          | 83 MB           |                  0.076 |          99.8 | 540 MB             |                     0.491 | 190 MB
```

En este ejemplo vemos que los inserts de trends_uint podrían tener un mejor cacheo para tener más hits e ir menos al disco.

Podríamos usar pg_buffercache para ver que ocupa espacio en memoria y por que no suben los hits.
Aunque en este caso los trends solo se insertan cada hora, por lo que podría ser la razón de que las páginas se saquen.

Explicación campos (@gemini):
Understanding the I/O Columns
Here's a quick guide to what these columns mean for your INSERT queries:

shared_blks_hit: (GOOD) The block was found in PostgreSQL's RAM cache (shared_buffers). This is fast.

shared_blks_read: (BAD) The block was not in cache and had to be read from the disk. This is slow and causes read I/O. For INSERTs, this is almost always to read index pages.

shared_blks_dirtied: (THE IMPORTANT ONE) This is your write I/O impact. It's the number of blocks modified in RAM. These "dirty" blocks must be written to disk later by the checkpointer or background writer. This is the main source of write I/O for INSERT/UPDATE heavy workloads.

shared_blks_written: Blocks written to disk by this query's backend process. This is less common. Most writes are handled by the checkpointer, so \_dirtied is the better metric to watch.

temp*blks*...: I/O for temporary tables. This must be zero for your INSERTs. If it's not, you have a major, unrelated problem.
