Cosas importantes que monitorizar: VACUUM, connection overhead, shared buffers

Toda la info que queremos sacar lo tendremos catalog views o tables, y también tendremos que mirar el log file para buscar WARNINGS o ERRORS.


Current view
  pg_stat_activity, un row por cada worker más el bgwriter, checkpointer, etc
  pg_locks
  pg_prepared_xacts

Cumulatime view (podemos resetearlas con pg_stat_reset, podemos elegir si todas o algunas):
  pg_stat_database
  pg_stat_bgwriter
  pg_stat_archiver
  pg_stat_user_xxx
  pg_statio_user_xxx
    functions, tables, indexes, sequences


# pg_stat_database
Es útil monitorizar el llenado de shared_buffers? O es normal que se mantenga lleno? Como saber si estamos forzando flushes por falta de memoria antes de lo que querría.
Hay una pg_catalog que monitoriza cuando sucede este flusheo forzado.
Backend writes growing significa eso.


blks_read, tuvimos que ir al disco a leer
blks_hit, lo encontramos en el shared buffer

tup_returned/fetched/inserted/updated/etc

temp_files/bytes si usamos mucho es que el work_mem se queda corto, posiblemente tengamos que incrementar el work_mem

blk_read/write movimiento de memoria a disco



# pg_stat(io)
pg_stat_
  monitoring data of tables

pg_statio_
  datos "físicos", io discos, etc

Esto está para tablas e índices.


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


Tenemos info de como está corriendo, porcentaje de completado.


# OpsDash
https://www.opsdash.com/blog/postgresql-backup-restore.html#monitoring-backups-wal-archiving-and-replication
Ver dashboard de ejemplo.

# Espacio usado en disco
Mirar disk_usage.md



# Replication
https://www.scalingpostgres.com/tutorials/postgresql-replication-monitoring/

Tenemos funciones y valores, en pg_stat_replication, para poder ver en donde tenemos un problema.

Mirar write_lag, flush_lag, reply_lag también, pero si se para la replicación este número se quedará parado (no tiene forma de saber el número).
Por lo que tendremos que mirar este número junto con la diferencia de bytes entre los wal del master y lo del slave.

Podemos también ir mirando la delta de los bytes que se están procesando en el receiver, para ver la velocidad en bytes que está procesando el receiver.

La gráfica puede tener picos por que los envíos pueden ir a golpes y porque los VACUUM no tiene que aplicarse automáticamente, así que pueden hacerse esperar.

Cuidado, si los slaves no flushean los wal, el master los mantendrá llenando su disco.
