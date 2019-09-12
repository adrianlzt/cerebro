mirar ha_scalability.md
mirar pl-proxy.md
mirar monitoring.md

https://www.opsdash.com/blog/postgres-getting-started-patroni.html

https://repmgr.org/


El el nodo "slave" quien conecta al master para obtener los valores.

El master tiene un "WAL sender" (otro proceso), que lee los ficheros de WAL que los envía al "WAL reciever" del slave, se usa el mismo protocolo que usan los usuarios para conectar (psql).
En el slave, del wal pasa al "startup" y de ahí a la database (recive en memoria, escribe a disco, flush and replay changes)
  pg_current_wal_insert_lsn -> wal en memoria
  pg_current_wal_lsn -> wal escrito en disco
  pg_current_waL_flush_lsn -> wal flushed al disco
  sent_lsn -> el último enviado al slave
  write_lsn -> wal escrito por el slave
  flush_lsn -> wal flusheado por el slave
  replay_lsn -> wal aplicado en el slave
  Podemos usar pg_wal_lsn_diff() para comparar lsn

El master tendrá un "WAL sender" por cada slave. max_wal_senders para evitar crear muchos wal seders en caso de bugs, problemas de reconexión, etc
El slave pide datos desde un punto y arranca un "COPY" que envia indefinidamente datos.
El master no borrará los wal hasta que los slaves hayan hecho flush.

El slave va dando feedback enviando el LSN (Log Sequence Number) que ha procesado.
LSN es un puntero a una posición del WAL, empezando en 0 cuando se inició el db server (no cuando arrancó, si no la primera vez que se creó)

Las cosas uncommited también se envían, porque se están escribiendo en el WAL.



Significado el nombre de los ficheros WAL (sin espacios blancos):
00000001 00000ACB 000000A2

Un LSN podría ser (primera parte matchea la parte de enmedio del wal, la segunda la última parte del wal y lo que resta es el offset dentro del fichero del wal):
00000ACB A2 F4D212

select pg_current_wal_lsn();
4/DF75D0E0

Esto apuntaría al fichero:
00000001 00000005 000000DF


Podemos usar pg_dumpwall para ver el contenido de un fichero WAL.



# Hot Standby
https://cloud.google.com/community/tutorials/setting-up-postgres-hot-standby



# Logical replication
Streaming replication is a fast, secure and is a perfect mechanism for high availability/disaster recovery needs. As it works on the whole instance, replicating only part of the primary server is not possible, nor is it possible to write on the secondary. Logical replication will allow us to tackle those use-cases.


# master-master
Postgres-BDR
De pago
