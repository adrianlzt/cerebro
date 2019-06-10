https://www.postgresql.org/docs/current/wal-configuration.html<Paste>

Write ahead log

Ficheros donde postgres va escribiendo las transacciones antes de sincronizarlas con disco.

Por defecto cada fichero crece hasta 16MB.

Se define el número mínimo de ficheros wal que debemos tener.


# pg_resetwal
reset the write-ahead log and other control information of a PostgreSQL database cluster

It should be possible to start the server, but bear in mind that the database might contain inconsistent data due to partially-committed transactions


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




