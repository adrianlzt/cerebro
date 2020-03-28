https://www.postgresql.org/docs/current/wal-configuration.html

Write ahead log

Ficheros donde postgres va escribiendo las transacciones antes de sincronizarlas con disco.

Por defecto cada fichero crece hasta 16MB.

Se define el número mínimo de ficheros wal que debemos tener.

Si estamos usando continuous archiving (mirar backup.md), tener muchos WAL puede significar que no está funcionando el archivado.

Parámetros a tener en cuenta:
https://postgresqlco.nf/en/doc/param/archive_cleanup_command/?category=write-ahead-log&subcategory=archive-recovery

  checkpoint_timeout:
    default: 5m
    incrementarlo:
      cons: más tiempo en caso de crash recovery. Buffers vaciados a disco por el bgwriter porque se llena el shared_buffer?
      pros: si hacemos ETLs muy grandes, evitar checkpoints en medio
    decrementarlo:
      cons: más carga al disco
      pros: reducir RTO (recovery time objetive), si hacemos continuous archiving, evitar perder datos que están en el WAL

  max_wal_size:
    default: 30s
    incrementarlo:
      pros: si tenemos checkpoints con mucha frecuencia a causa de llenados de wal
      cons: incrementa el tiempo de crash recovery
    decrementarlo:
      cons: muchos checkpoints
      pros: tiempo de crash recovery reducido



# pg_resetwal
reset the write-ahead log and other control information of a PostgreSQL database cluster

It should be possible to start the server, but bear in mind that the database might contain inconsistent data due to partially-committed transactions

Ejecutado una vez sobre la bbdd de zabbix. Datos incoherentes. Por ejemplo, dos valores en una tabla saltándose la unicidad marcada por la primary key.



# Checkpoint
https://www.2ndquadrant.com/en/blog/basics-of-tuning-checkpoints/

Cuando las páginas de memoria se flushean a disco.
Se analiza todo el shared_buffer escribiendo todos los dirty blocks a disco.
Esto nos permite borrar las páginas WAL antiguas cuando comenzamos el checkpoint.

Muchos ficheros WAL, aumentar la frecuencia de los checkpoint.

Los checkpoints se ejecutan cada x tiempo (checkpoint_timeout, para evitar no hacer checkpoints en db con poco uso) o cuando tenemos más de N ficheros WAL (max_wal_size / 16MB).
min_wal_size para mantener un número de WAL files que se irán reusando (en vez de borrarlas y crear nuevas).
Si escribimos más de 1GB/hour de datos, subir el max_wal_size para tener al menos 1h de datos en WAL (https://postgresqlco.nf/en/doc/param/max_wal_size/)

Tenemos dos tipos de checkpoints, los scheduled (lanzados por checkpoint_timeout) y los requested (lanzados por max_wal_size)
Generalmente queremos que salten los scheduled

checkpoint está limitado para no hacer grandes picos de carga, se reparte durante un periodo de tiempo más largo.
checkpoint_completion_target, le dice que vaya a una velocidad suficiente para tardar el porcentaje definido del checkpoint_timeout.

checkpoint;
Podemos forzar la ejecucción con ese comado. En este caso irá todo lo rápido que pueda.

Si tenemos un checkpoint muy corto estaremos saturando el disco.
Si tenemos uno muy largo, si se llena el shared buffer, estaremos obligando al "backend process" a guardar datos a disco para hacer hueco, no ayudará a limpiar wal files.
Hay algunos casos, DDL, que se hacen escrituras por el "backend process" de manera legítima.

El bgwriter escanea regularmente para ir sacando esas dirty pages no usadas.
El número de páginas que se van a flushear es un cálculo basado en dos parametros https://postgresqlco.nf/en/doc/param/bgwriter_lru_multiplier

Después de un checkpoint el wal crece más para poder recuperarse de una escritura parcial de un bloque (8kB de bloque de postgres VS 4kB de linux)

Obtener tiempo entre checkpoints.
Esto nos da la media desde el último reset. Más interesante llevarse los distintos números y poder obtener ese valor en distintos periodos.
SELECT
    (checkpoints_timed+checkpoints_req) AS total_checkpoints,
    CASE checkpoints_timed + checkpoints_req
        WHEN 0 THEN 0
        ELSE EXTRACT(EPOCH FROM (NOW() - stats_reset)) / (checkpoints_timed + checkpoints_req) / 60
    END as minutes_between_checkpoints
FROM pg_stat_bgwriter;

Mirar monitoring.md pg_stat_bgwriter para ver si los checkpoints llegan tarde y los shared_buffers están saturados.

Tunear sysctl vm.dirty_background_bytes o vm.dirty_background_ratio en sistemas con mucha memoria.
https://www.kernel.org/doc/Documentation/sysctl/vm.txt



# Datos sobre el wal
select pg_current_wal_lsn()
select pg_walfile_name(pg_current_wal_lsn());
  ver en que wal estamos

Sacar con un comando más datos sobre wal, checkpoints, etc
/usr/pgsql-11/bin/pg_controldata -D /var/lib/pgsql/11/data

Latest checkpoint's REDO WAL file:    0000000100000257000000D4
  ultimo wal aplicado

Time of latest checkpoint:
  último checkpoint ejecutado


Podemos forzar a que se escriba en un nuevo wal con
select pg_switch_wal();


Si tenemos "wal_keep_segments" estamos forzando a la bbdd a dejar ese número de ficheros de wal, por si una replica se tuviese que conectar.
Usar para este caso (mantener wal necesarios para sincronizar) connection slots? https://blog.dataegret.com/2018/04/pgwal-is-too-big-whats-going-on.html


# wal_level
https://postgresqlco.nf/en/doc/param/wal_level/
Decide cuanta info se escribe en el wal.
Por defecto "replica", que permite hacer streaming replication.
"logical" permite hacer replicación lógica.
"minimal" si no estamos haciendo replicación, ahorrando escrituras en el wal (con este nivel solo conseguimos tener crash recovery)


# wal_compression
https://postgresqlco.nf/en/doc/param/wal_compression/
Podemos reducir el uso de disco, a cambio de usar más CPU, activando wal_compression
