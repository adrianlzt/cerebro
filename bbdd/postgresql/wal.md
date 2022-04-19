https://www.postgresql.org/docs/current/wal-configuration.html

Write ahead log
Más info en debug.md

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


Como postgres decide cuantos wal mantener:
The number of WAL segment files in pg_wal directory depends on min_wal_size, max_wal_size and the amount of WAL generated in previous checkpoint cycles. When old log segment files are no longer needed, they are removed or recycled (that is, renamed to become future segments in the numbered sequence). If, due to a short-term peak of log output rate, max_wal_size is exceeded, the unneeded segment files will be removed until the system gets back under this limit. Below that limit, the system recycles enough WAL files to cover the estimated need until the next checkpoint, and removes the rest. The estimate is based on a moving average of the number of WAL files used in previous checkpoint cycles. The moving average is increased immediately if the actual usage exceeds the estimate, so it accommodates peak usage rather than average usage to some extent. min_wal_size puts a minimum on the amount of WAL files recycled for future usage; that much WAL is always recycled for future use, even if the system is idle and the WAL usage estimate suggests that little WAL is needed.

Al final solo vamos a tener los wal que defina min_wal_size, a partir de ese valor, postgres puede decidir borrarlos, así que no podemos suponer que vayamos a tener más de eso.

También mirar wal_keep_segments/wal_keep_size, que fuerza a tener un determinado número (mirar su sección más abajo).

Como estimar cuantos WAL queremos:
https://www.2ndquadrant.com/en/blog/basics-of-tuning-checkpoints/
"Now we need to estimate how much WAL..."


# pg_resetwal
reset the write-ahead log and other control information of a PostgreSQL database cluster

It should be possible to start the server, but bear in mind that the database might contain inconsistent data due to partially-committed transactions

Ejecutado una vez sobre la bbdd de zabbix. Datos incoherentes. Por ejemplo, dos valores en una tabla saltándose la unicidad marcada por la primary key.


# pg_waldump
https://www.postgresql.org/docs/12/pgwaldump.html

Mostrar contenido de los ficheros wal.
Muestra datos generales de las operaciones, no el contenido (no podemos ver que se ha insertado tal o cual dato)


# pg_filedump
https://git.postgresql.org/gitweb/?p=pg_filedump.git;a=blob;f=README.pg_filedump
Display formatted contents of a PostgreSQL heap, index or control file.

Lo mismo pero para un editor hex gráfico
https://github.com/petergeoghegan/pg_hexedit/blob/master/README.md



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
Por lo tanto el checkpoint tardará un porcentaje del tiempo medio que suele utilizar. No se considerará completado hasta que haya terminado (no se actualizará checkpoints_timed/checkpoints_req).

checkpoint;
Podemos forzar la ejecucción con ese comado. En este caso irá todo lo rápido que pueda.
No se recomienda en un funcionamiento normal, va a saturar el SO con escrituras a disco.

Si tenemos un checkpoint muy corto estaremos saturando el disco.
Si tenemos uno muy largo, si se llena el shared buffer, estaremos obligando al "backend process" a guardar datos a disco para hacer hueco, no ayudará a limpiar wal files.
Hay algunos casos, DDL, que se hacen escrituras por el "backend process" de manera legítima.

El bgwriter escanea regularmente para ir sacando esas dirty pages no usadas.
El número de páginas que se van a flushear es un cálculo basado en dos parametros https://postgresqlco.nf/en/doc/param/bgwriter_lru_multiplier

Después de un checkpoint el wal crece más para poder recuperarse de una escritura parcial de un bloque (8kB de bloque de postgres VS 4kB de linux)

Obtener tiempo entre checkpoints (estimación).
Esto nos da la media desde el último reset. Más interesante llevarse los distintos números (select checkpoints_timed,checkpoints_req from pg_stat_bgwriter;) y poder obtener ese valor en distintos periodos.
SELECT
    (checkpoints_timed+checkpoints_req) AS total_checkpoints,
    CASE checkpoints_timed + checkpoints_req
        WHEN 0 THEN 0
        ELSE EXTRACT(EPOCH FROM (NOW() - stats_reset)) / (checkpoints_timed + checkpoints_req) / 60
    END as minutes_between_checkpoints
FROM pg_stat_bgwriter;

Ejemplo de salida:
 total_checkpoints | minutes_between_checkpoints
-------------------+-----------------------------
                37 |            27.7296053148649


Para sacar último checkpoint:
/usr/pgsql-11/bin/pg_controldata -D /var/lib/pgsql/11/data/ | grep "latest checkpoint:"
Parece que no hay una forma con SQL: https://www.postgresql.org/message-id/flat/1279653778.28450.4.camel%40localhost
Esa fecha será cuando empezó el checkpoint.
Si tenemos 30' de tiempo entre checkpoints, por ejemplo, podríamos ver que el último checkpoint ha sido a las 11:30 (que lo habrá hecho entre las 11:30 y las 11:59).
Sobre las 12:30 veremos que se actualizará y pondra el último a las 12:00.



Mirar monitoring.md pg_stat_bgwriter para ver si los checkpoints llegan tarde y los shared_buffers están saturados.

Tunear sysctl vm.dirty_background_bytes o vm.dirty_background_ratio en sistemas con mucha memoria.
https://www.kernel.org/doc/Documentation/sysctl/vm.txt



# Datos sobre el wal
select pg_current_wal_lsn();
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


# wal_keep_segments / wal_keep_size
https://postgresqlco.nf/doc/en/param/wal_keep_segments/
Si tenemos "wal_keep_segments" estamos forzando a la bbdd a dejar ese número de ficheros de wal, por si una replica se tuviese que conectar.
Por defecto está a 0, que quiere decir que no guardamos ninguno extra
Si usamos replicación, podemos poner >0 para conseguir que si se pierde la replicación, darle un tiempo a la réplica a que conecte.

En PG13 ahora se llama wal_keep_size


# wal_level
https://postgresqlco.nf/en/doc/param/wal_level/
Decide cuanta info se escribe en el wal.
Por defecto "replica", que permite hacer streaming replication.
"logical" permite hacer replicación lógica.
"minimal" si no estamos haciendo replicación, ahorrando escrituras en el wal (con este nivel solo conseguimos tener crash recovery)


# wal_compression
https://postgresqlco.nf/en/doc/param/wal_compression/
Podemos reducir el uso de disco, a cambio de usar más CPU, activando wal_compression


# Llenado directorio wal
https://blog.dataegret.com/2018/04/pgwal-is-too-big-whats-going-on.html
Posibles causas:
  - archive command no funcion
  - replication slot sin cliente conectado
    select * from  pg_replication_slots;
    Parece que la única solución es monitorizar que no se llene el disco: https://info.crunchydata.com/blog/wheres-my-replica-troubleshooting-streaming-replication-synchronization-in-postgresql
    Mirar en monitoring.md

