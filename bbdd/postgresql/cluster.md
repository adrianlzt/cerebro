mirar ha_scalability.md
mirar pl-proxy.md
mirar monitoring.md

https://repmgr.org/
Usar repmgr.md para gestionar replication

patroni
https://www.opsdash.com/blog/postgres-getting-started-patroni.html
https://github.com/zalando/spilo

physical replication es "sencillo".
logical replication es un poco más complejo (gestión de conflictos)
multi master logical replication (muy complejo)

pgcat logical replication (go): https://github.com/kingluo/pgcat


El el nodo "slave" quien conecta al master para obtener los valores.


Crear user para streaming
createuser -P --replication streaming_barman
Añadirlo al pg_hba:
local   replication  streaming_barman  trust
Probarlo:
psql -U streaming_barman -h pg -c "IDENTIFY_SYSTEM" replication=1




# Physical streaming replication
Just 4 steps to set up streaming replication in #PostgreSQL:
In master server
 initdb -D data
 pg_ctl -D data start
In standby server
sudo -u postgres pg_basebackup -D data -PRv -U <user> -h <master's ip>
    -R, --write-recovery-conf
                           write recovery.conf for replication
    -P, --progress         show progress information
    -v, --verbose          output verbose messages

 Si queremos pasar la password
 echo 12.3.17.16:5432:*:replication:MIPASSWORD > .pgpass
 chmod 400 .pgpass
 PGPASSFILE=.pgpass pg_basebackup -D data -PRv -h 12.3.17.16 -U replication


 El pg_basebackup no empezará hasta que el master haga un checkpoint.
 Mirar en wal.md la query para ver el tiempo entre checkpoints y el último checkpoint realizado.
 No se debe ejecutar CHECKPOINT a mano, ya que le estaremos pidiendo que lo haga lo más rápido posible, colapsando los discos posiblemente.

 En el server master veremos un proceso preparado para enviar el backup, ejemplo:
 postgres: data: walsender replication 172.3.17.13(54370) sending backup "pg_basebackup base backup"

 Tambien podemos ver el proceso desde SQL
 select * from pg_stat_activity where application_name='pg_basebackup';

 Si vemos que se queda indefinidamente en "waiting for checkpoint to complete" mirar mensajes de error en el master.
 Si vemos "ERROR:  base backup could not send data, aborting backup" tendremos que volver a intentar lanzar el comando.

 Esto tal vez se debe a una pérdida de conectividad entre la replica y el primario. Podría ser algún elemento de red que cierre la conexión por llevar mucho tiempo
 sin tráfico (ya que la replica pide el backup, el primario dice que OK y no vuelve a enviar nada hasta que no pase el checkout).
 Una posible solución sería ejecutar pg_basebackup en los últimos minutos antes de que salte el checkpoint.

 No conseguí que se arrancase si usar "-c fast".
 Lo que hice fue ejecutarlo después de un checkpoint, para saber que no iba a tener mucho impacto.



 pg_ctl -D data start


Comprobar en el master que vemos la replica conectada:
select * from pg_stat_replication;

Comprobar si somos un primario o replica (off para el primario, on para replica):
show in_hot_standby;


Hay cambios en las versiones 11/12/13 con el tema del fichero recovery.conf/replica.conf/standby.signal
https://dba.stackexchange.com/a/259892


Solo para mismas versiones de postgres (major, las minor si son compatibles). No compatible entre distintos SO (linux, windows, osx).
Se pasan diffs de binary files.

Conf needed:
wal_level = replica (o logical, si queremos que también se pueda hacer replicación lógica)
max_wal_senders, por defecto vale
max_replication_slots
  estos slots se les asocia un id y evitan borrar WALs si no han sido consumidos, por una desconexión del cliente por ejemplo.
  Mirar monitoring.md para evitar llenar el disco
  https://www.postgresql.org/docs/current/warm-standby.html#STREAMING-REPLICATION-SLOTS

Conf slave, in recovery.conf (fichero eliminado en postgres 12):
standby_mode = on
primary_conninfo = "host=nodeMaster"
application_name = "xxx"  # nombres para distinguir varios stand-bys, típicamente hostname

También info en ha_scalability.md "Hot standby"


Delayed apply:
Por defecto se intentan aplicar los cambios tan rápido como sea posible.
Podemos usarlo como truco para retrasar los cambios y usarlo como un "control+z"

Podemos forzar el pausado de replication pg_wal_replay_pause(), pg_wal_replay_resume()


Chequear estados:

select pg_is_in_backup();
  True if an on-line exclusive backup is still in progress.

select pg_is_in_recovery();
  True if recovery is still in progress
  True también si estamos en una réplica, false en master.
  Nos vale para distinguir master de replica.

select pg_is_wal_replay_paused();
  True if recovery is paused.



El master tiene un "WAL sender" (otro proceso), que lee los ficheros de WAL que los envía al "WAL reciever" del slave, se usa el mismo protocolo que usan los usuarios para conectar (psql).
En el slave, del wal pasa al "startup" y de ahí a la database (recibe en memoria, escribe a disco, flush and replay changes)
select pg_current_wal_insert_lsn();
  wal en memoria
select pg_current_wal_lsn()
  wal escrito en disco
select pg_current_waL_flush_lsn()
  wal flushed al disco

Podemos usar pg_wal_lsn_diff() para comparar lsn
select pg_wal_lsn_diff('12D71/A2D142B8', '11EF2/8F000000');

select * from pg_stat_replication;
    solo muestra clientes actualmente conectados
    sent_lsn -> el último enviado al slave
    write_lsn -> wal escrito por el slave
    flush_lsn -> wal flusheado por el slave
    replay_lsn -> wal aplicado en el slave

Si estamos usando replication slots, podemos ver la configuración y el último LSN pendiente de enviar con:
select * from  pg_replication_slots;
select slot_name,pg_walfile_name(restart_lsn) from pg_replication_slots;


Doc de esos comandos: https://www.postgresql.org/docs/12/functions-admin.html#FUNCTIONS-ADMIN-BACKUP-TABLE


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

Esto apuntaría al fichero (tambien podemos usar la función "select pg_walfile_name(pg_current_wal_lsn());" para obtener el nombre del fichero):
00000001 00000005 000000DF


Podemos usar pg_dumpwall para ver el contenido de un fichero WAL.


Si queremos crear a mano un replication slot:
SELECT * FROM pg_create_physical_replication_slot('replica1');

Borrar a mano un replication slot (le llevará unos minutos hasta que borre los WAL antiguos, posiblemente espere a un checkpoint, pero no lo he comprobado):
SELECT * FROM pg_drop_replication_slot('replica1');




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

Config necesaria:
wal_level = logical

Se instala una extensión en wal_sender y en el backgroup worker (en el slave, que es quien inicia la conex).
Ese plugin es el que gestiona la traducción de los WAL al formato para replicación lógica.

La diferencias más importantes contra el physical replication:
  - el target node (el que recibe los datos de la replicación) es un nodo master
    - permite tener temp tables en el target
    - permite diferentes índices
    - permite tener distintos security/users
  - selective replication
  - cross-version replication


# Estado de los replication slots
https://www.postgresql.org/docs/current/warm-standby.html#STREAMING-REPLICATION-SLOTS
https://www.postgresql.org/docs/current/view-pg-replication-slots.html
select * from pg_replication_slots;
  solo vemos entradas si hay cosas conectadas



# master-master
Postgres-BDR, de pago
  permite hacer sharding
  multimaster simétrico
  tiene solución de conflictos, un log donde se muestran errores de, por ejemplo, inserciones que colisionan
https://www.symmetricds.org/about/overview
https://info.crunchydata.com/blog/active-active-on-kubernetes


https://github.com/timbira/krahodb

open source asynchronous multi-master
https://bucardo.org
