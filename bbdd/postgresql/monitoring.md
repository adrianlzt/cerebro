Cosas importantes que monitorizar: VACUUM, connection overhead, shared buffers

# Vacuum
https://blog.2ndquadrant.com/autovacuum-tuning-basics/

Parámetros a monitorizar respecto a las dead tuples:
* `pg_stat_all_tables.n_dead_tup` – number of dead tuples in each table (both user tables and system catalogs)
* `(n_dead_tup / n_live_tup)` – ratio of dead/live tuples in each table
  select relname,n_dead_tup,n_live_tup,n_dead_tup*100/NULLIF(n_live_tup,0) AS "pct_dead_live_tuples",last_vacuum,last_autovacuum,last_analyze,last_autoanalyze from pg_stat_user_tables WHERE n_dead_tup <> 0 order by pct_dead_live_tuples DESC;
    esta query nos devuelve las dead tuples y su relación con las live tuples

* `(pg_class.relpages / pg_class.reltuples)` – space “per row”
  select relname,relpages,reltuples,relpages*1.0/reltuples AS "space_used_per_row" from pg_class WHERE reltuples > 10 order by space_used_per_row desc limit 20;
    tal vez nos interese poner un "reltuples >" un valor más alto, porque si no podremos estar viendo un montón de tablas pequeñas poco interesantes
