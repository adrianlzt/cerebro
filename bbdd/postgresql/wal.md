Write ahead log

Ficheros donde postgres va escribiendo las transacciones antes de sincronizarlas con disco.

Por defecto cada fichero crece hasta 16MB.

Se define el número mínimo de ficheros wal que debemos tener.


# pg_resetwal
reset the write-ahead log and other control information of a PostgreSQL database cluster

It should be possible to start the server, but bear in mind that the database might contain inconsistent data due to partially-committed transactions
