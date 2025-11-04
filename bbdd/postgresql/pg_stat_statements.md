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

# Vista

```sql
select * from pg_stat_statements;
```

Queries con más tiempo total, cuantas veces han sido llamadas, cuantas rows traidas y el hit_percent:

```sql
SELECT pu.usename, query, calls, total_time, rows, 100.0 * shared_blks_hit nullif(shared_blks_hit + shared_blks_read, 0) AS hit_percent FROM pg_stat_statements pss join pg_user pu ON (pu.usesysid=pss.userid) ORDER BY total_time DESC LIMIT 5;
```

# Reiniciar estadísticas

pg_stat_statements_reset(userid Oid, dbid Oid, queryid bigint);
Podemos no especificar alguno de los valores para que que matchee todos los de ese tipo.

Ejemplo para reiniciar todo:

```sql
SELECT pg_stat_statements_reset(0,0,0);
```
