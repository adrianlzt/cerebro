https://www.postgresql.org/docs/current/wal-configuration.html

Write ahead log

Ficheros donde postgres va escribiendo las transacciones antes de sincronizarlas con disco.

Por defecto cada fichero crece hasta 16MB.

Se define el número mínimo de ficheros wal que debemos tener.


# pg_resetwal
reset the write-ahead log and other control information of a PostgreSQL database cluster

It should be possible to start the server, but bear in mind that the database might contain inconsistent data due to partially-committed transactions

Ejecutado una vez sobre la bbdd de zabbix. Datos incoherentes. Por ejemplo, dos valores en una tabla saltándose la unicidad marcada por la primary key.



# Checkpoint
Cuando las páginas de memoria se flushean a disco.
Se analiza todo el shared_buffer escribiendo todos los dirty blocks a disco.
Esto nos permite borrar las páginas WAL antiguas a cuando comenzamos el checkpoint.

Muchos ficheros WAL, aumentar la frecuencia de los checkpoint.

Los checkpoints se ejecutan cada x tiempo o cuando tenemos más de N ficheros WAL.


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


# Slots
select * from pg_replication_slots;
