mirar pg_stat_statements.md
mirar pgmetrics.md
Queries que hace zabbix para monitorizar postgres: https://github.com/zabbix/zabbix/tree/master/templates/db/postgresql/postgresql
https://docs.google.com/presentation/d/1taKST9H59FG7MKtVLUlqQ_WozJfRQ1MFidnN7HxBQ6U/edit#slide=id.g24d4917c5fd_0_96
  Modern Postgres monitoring – PGCon 2023 tutorial


http://pgstats.dev/
Gráfico con las tablas para mirar cada cosa. Rollo los gráficos que hace

https://github.com/dalibo/pg_activity
herramienta tipo top

https://github.com/coroot/coroot-pg-agent
Exporter para prometheus
Puede ser interesante ver que métricas extraen. Se venden como que extraen mejores métricas que el exporter típico y que saben responder a cosas como:
    A CPU-intensive query is affecting other queries
    A server has reached its max_connections limit because most of the connections are stuck in the idle in transaction state
    An I/O-intensive query is affecting other queries
    A query is blocking other queries by holding an exclusive lock

Capturar tráfico y decodificar el wire protocol para saber que está haciendo:
https://www.cncf.io/blog/2020/08/13/envoy-1-15-introduces-a-new-postgres-extension-with-monitoring-support/
https://www.elastic.co/guide/en/beats/packetbeat/current/packetbeat-pgsql-options.html

Cosas importantes que monitorizar: VACUUM, connection overhead, shared buffers
Tiempo entre checkpoints (más datos en checkpoint.md)
Mirar si al menos tenemos una hora de WALs, si tenemos menos, deberíamos incrementar el max_wal_size para reducir los checkpoints.

Mirar si tenemos queries idle in transactions.
Un típico fallo es un programa en python que se cierra incorrectamente y deja una tx abierta. Esta TX puede bloquear otras operaciones (nos pasó que no dejaba particionar una tabla por un select que se había realizado desde esa tx)
Podemos limitar el tiempo que las sesiones están en idling transaction: https://postgresqlco.nf/en/doc/param/idle_in_transaction_session_timeout/

mirar en timeout_queries.md sección "Gestion timeout"

Si estamos haciendo archive, mirar que estamos siendo capaces de archivarlo.
Si no se puede archivar un wal se genera un error:
2023-10-27 12:19:18.704 UTC [717] LOG:  archive command failed with exit code 82
2023-10-27 12:19:18.704 UTC [717] DETAIL:  The failed archive command was: pgbackrest --config /etc/pgbackrest/pgbackrest.conf --stanza=iometrics archive-push pg_wal/000000060000074A00000003

Tambien veremos que hay ficheros NOMBREWAL.ready en /var/lib/postgresql/data/pg_wal/archive_status



Toda la info que queremos sacar lo tendremos catalog views o tables, y también tendremos que mirar el log file para buscar WARNINGS o ERRORS.

Es mejor llevarse los números en crudos y no haciendo los cálculos en la query.
Por ejemplo, el cálculo del tiempo entre checkpoints que se hace aqui (https://github.com/cavaliercoder/libzbxpgsql/blob/master/src/pg_bgwriter.c#L93) lo calcula en la bd, usando el tiempo respecto al último reset de las métricas. Esto implica que cuanto más largo sea ese tiempo, tendremos un valor medio cada vez más suavizado.


Current view
  pg_stat_activity, un row por cada worker más el bgwriter, checkpointer, etc
  pg_locks
  pg_prepared_xacts

Cumulatime view (podemos resetearlas con pg_stat_reset(), podemos elegir si todas o algunas con pg_stat_reset_shared('nombre'), siendo nombre, bgwriter o archiver):
  pg_stat_database
  pg_stat_bgwriter
  pg_stat_archiver
  pg_stat_user_xxx
  pg_statio_user_xxx
    functions, tables, indexes, sequences

  Borrar todas las estadísticas. Útil resetearlas de vez en cuando? Si obtenemos las métricas con cálculos respecto al tiempo del reset, si no resteamos, estaremos obteniendo cada vez una media más suavizada:
  select pg_stat_reset();

  Ejemplo reset las estadísticas del bgwriter:
  select pg_stat_reset_shared('bgwriter')


# pg_stat_database
Es útil monitorizar el llenado de shared_buffers? O es normal que se mantenga lleno? Como saber si estamos forzando flushes por falta de memoria antes de lo que querría.
Hay una pg_catalog que monitoriza cuando sucede este flusheo forzado.
Backend writes growing significa eso.

Si queremos borrar las métricas tendremos que llamar a pg_stat_reset(), borrando todo.

Aquí también tenemos un contador de deadlocks.

blks_read, tuvimos que ir al disco a leer
blks_hit, lo encontramos en el shared buffer

tup_returned/fetched/inserted/updated/etc

temp_files/bytes si usamos mucho es que el work_mem se queda corto, posiblemente tengamos que incrementar el work_mem

blk_read/write movimiento de memoria a disco

En esta tabla tambien tenemos: blk_read_time y blk_write_time. Tiempo de las llamadas IO en ms.
Está desactivado por defecto porque hace muchas llamadas al SO para obtener el tiempo actual.
https://www.postgresql.org/docs/current/runtime-config-statistics.html#GUC-TRACK-IO-TIMING
Hay una herramienta para poder medir ese overhead para decidir si activar estas métricas.
Al ejecutar la herramienta debemos obtener >90% por debajo de 1us para considerarlo adecuado (la doc oficial más o menos dice eso)
Para activar esta medición:
alter database "zabbix-server" set track_io_timing=on;



# pg_stat_bgwriter
Como se flushea la memoria a disco
https://www.influxdata.com/blog/metrics-to-monitor-in-your-postgresql-database/

buffers_backend – via backends
buffers_clean – via the background writer
buffers_checkpoint – via the checkpoint process
Ideally you want most of the flushes happening via the checkpoint process, but sometimes the background writer steps in to help lighten the I/O load that often occurs in the checkpoint process. An increase in buffers written directly by backends could mean a write-intensive load that is creating buffers so fast the checkpoint process can’t keep up.



# pg_stat(io)
pg_stat_
  monitoring data of tables

pg_statio_
  datos "físicos", io discos, etc

Esto está para tablas e índices.


## PG v16
A key aspect of tuning the performance of database workloads is understanding the impact of your I/O operations on your system. PostgreSQL 16 introduces pg_stat_io, a new source of key I/O metrics for granular analysis of I/O access patterns.

# pg_stat_all_tables (pg16)
Additionally, this release adds a new field to the pg_stat_all_tables view that records a timestamp representing when a table or index was last scanned. PostgreSQL 16 also makes auto_explain more readable by logging values passed into parameterized statements, and improves the accuracy of the query tracking algorithm used by pg_stat_statements and pg_stat_activity.


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
https://github.com/aiven/pglookout
  de aqui podemos ver cosas interesantes que monitorizar. Se integra con telegraf

Tenemos funciones y valores, en pg_stat_replication, para poder ver en donde tenemos un problema.

Mirar write_lag, flush_lag, reply_lag también, pero si se para la replicación este número se quedará parado (no tiene forma de saber el número).
Por lo que tendremos que mirar este número junto con la diferencia de bytes entre los wal del master y lo del slave.

En las réplicas podemos ver su lag con:
select status, last_msg_receipt_time from pg_stat_wal_receiver;
select now()-pg_last_xact_replay_timestamp() as replication_lag;

Podemos también ir mirando la delta de los bytes que se están procesando en el receiver, para ver la velocidad en bytes que está procesando el receiver.

La gráfica puede tener picos por que los envíos pueden ir a golpes y porque los VACUUM no tiene que aplicarse automáticamente, así que pueden hacerse esperar.

Cuidado, si los slaves no flushean los wal, el master los mantendrá llenando su disco.
Número de WALs en disco (hace falta permiso especial para esta función):
select count(*) from pg_ls_waldir();
Para dar permisos a otros usuarios no superadmin:
grant pg_monitor to "usuario";


Antiguo:
SELECT COUNT(*) FROM pg_ls_dir('pg_wal') WHERE pg_ls_dir ~ '^[0-9A-F]{24}';
  SELECT COUNT(*) FROM pg_ls_dir('pg_xlog') WHERE pg_ls_dir ~ '^[0-9A-F]{24}'; -- antiguo, postgres <=9.6 creo


Si usamos replication slots y el cliente se desconecta, estaremos llenando el disco con los wal hasta que reconecte.
La solución es monitorizar ese número de arriba o el espacio en disco
https://info.crunchydata.com/blog/wheres-my-replica-troubleshooting-streaming-replication-synchronization-in-postgresql
Si hemos perdido el cliente y se nos está llenando, tal vez la solución es borrar el replication slot. Mirar en replication.md

Hay un parámetro, pero solo para >=v13, para limitar el máximo numero de wals para los replication slots.
https://postgresqlco.nf/doc/en/param/max_slot_wal_keep_size/

Monitorizar conflictos, mirar ha_scalability.md


# Archivado de WALs
Si esta query nos da "t" es que no estamos pudiendo archivar los wal.

select last_failed_time>last_archived_time from pg_stat_archiver;


# Checkup
gitlab.com/postgres-ai/postgres-checkup

App en go para lanzar a mano cada x tiempo y obtener reportes del estado y futuras estimaciones.


# Metricas de uso por tablas
https://www.postgresql.org/docs/16/monitoring-stats.html#MONITORING-PG-STAT-ALL-TABLES-VIEW
A partir de la v16

Podemos ver cuantos seq o index scan se han hecho, cuantos analyze, vacuum, lecturas de tuplas, etc.
