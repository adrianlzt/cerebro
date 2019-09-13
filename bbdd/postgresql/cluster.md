mirar ha_scalability.md
mirar pl-proxy.md
mirar monitoring.md

https://www.opsdash.com/blog/postgres-getting-started-patroni.html

https://repmgr.org/

physical replication es "sencillo".
logical replication es un poco más complejo (gestión de conflictos)
multi master logical replication (muy complejo)


El el nodo "slave" quien conecta al master para obtener los valores.

# Physical streaming replication
Solo para mismas versiones de postgres

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
Streaming replication is a fast, secure and is a perfect mechanism for high availability/disaster recovery needs.
Logical replication allows us replicating only part of the primary server.
Compatible entre distintas versiones.
Suele usarse para upgradear.

Opciones:
  - está en version 10 (no avanza en 11 y 12), básica (CREATE PUBLICATION/SUBSCRIPTION)
    - limitado, no gestiona conflictos
    - no se lleva los índices
    - no se lleva las secuencias
    - podemos escribir en el target, pero con eso podemos romperlo, así que lo mejor es dar solo read-only a los usuarios
  - pglogical, módulo (CREATE EXTENSION), open source
    - más avanzada y compleja que la versión básica que está en pg10
    - más parámetros
  - algunas otras soluciones, no parecen muy recomendables (triggers es muy mala idea)


Se instala una extensión en wal_sender y en el backgroup worker (en el slave, que es quien inicia la conex).
Ese plugin es el que gestiona la traducción de los WAL al formato para replicación lógica.

La diferencias más importantes contra el physical replication:
  - el target node (el que recibe los datos de la replicación) es un nodo master
    - permite tener temp tables en el target
    - permite diferentes índices
    - permite tener distintos security/users
  - selective replication
  - cross-version replication


# master-master
Postgres-BDR, de pago
  permite hacer sharding
  multimaster simétrico
  tiene solución de conflictos, un log donde se muestran errores de, por ejemplo, inserciones que colisionan
https://www.symmetricds.org/about/overview
https://info.crunchydata.com/blog/active-active-on-kubernetes

