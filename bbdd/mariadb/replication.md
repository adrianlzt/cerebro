http://galeracluster.com/documentation-webpages/index.html
https://severalnines.com/blog/9-tips-going-production-galera-cluster-mysql
Limitaciones: https://mariadb.com/kb/en/library/mariadb-galera-cluster-known-limitations/

bbdd/percona tambien usa galera


# Bootstrap cluster

Editar /etc/my.cnf.d/server.cnf
[galera]
wsrep_on=ON
wsrep_provider=/usr/lib64/galera/libgalera_smm.so
wsrep_cluster_address="gcomm://db4,db5,db6"
binlog_format=row
default_storage_engine=InnoDB
innodb_autoinc_lock_mode=2
bind-address=0.0.0.0


En un nodo:
galera_new_cluster

En los otros:
systemctl start mariadb

En todos:
mysql_secure_installation



Si se paran los dos nodos consultaremos el fichero grastate.dat y arrancaremos (con galera_new_cluster) el que tenga el último id.
Si no nos deja podemos forzarlo editando ese fichero y poniendo el safe_to_bootstrap a 1
http://inside-out.xyz/technology/recovering-mariadb-galera-cluster-after-a-restart.html


# Estado
SHOW GLOBAL STATUS like "wsrep%";

MariaDB 10:
  Group commit
  Global transacion ID GTIDs
  Parallel Slave
  Multi-source replication
  MySQL/MariaDB 5.x compatibility (kind of)


Master - Slave
El master es el único que puede escribir


## Group Commit ##
Se hacen grupos de transacciones para commitearlas al disco (esto reduce el número de operaciones de escritura en el disco)

binlog_commits = total number of transactions commited to the binary log
binlog_group_commits: total number of groups os transactions committed to the binary log. When sync_binlog=1 it is the number of fsync()'s


## GTIDs ##
Global "event" ID (represent a group of transactions)
XXX-YYY-ZZZ
Three elements: domain id + server id + sequence


## Parallel slave ##
Un grupo de transacciones que vienen del master al slave, se pueden aplicar en el slave de forma paralela.
Antiguamente la replicación se basaba en dos threads, un thread para coger datos del master y el segundo thread cogía las transacciones y las escribía en la bd de forma secuencial.
Ahora esa segunda hebra es multithread

Se ejecuten en paralelo en el slave si se han ejecutado en paralelo en el master.

Para saber si se aplican en paralelo, MariaDB se encarga de ver si las transacciones van sobre difenrentes schemas (bases de datos) y creará los threads necesarios.

slave_parallel_threads: number of parallel thread on the slave node
slave_parallel_max_queued: number of parallel threads on the slave


## Multi-source replication ##
Datos particionados en muchos masters pueden ser cogidos en un único slave para queries analíticas.

Varios masters pueden replicar en el mismo slave y desde este se puede hacer un backup completo.

Podemos usar esto para tener un slave muy potente mientras actualizamos los master.

Límite de 64 masters.


## Multi-master replication ##
3 grupos de nodos, cada grupo con 1 master y 3 slaves.

Tenemos replicación entre los masters de los distintos grupos.
Si se cae uno de los masters podemos "promote" uno de los slaves para que se convierta en master.

Standar replication is asynchronous




## Galera / Replicación síncrona / Replicacion multi-master ##
Es más lento que la replicación asíncrona (el cluster será tan lento como el nodo más lento)

Los nodos que se unen al cluster son sincronizados automáticamente.

Logically it is only one node.

El commit que se hace en un nodo se aplica síncronamente. Existe un bloqueo hasta que el commit se ha producido en todos los nodos. 
Optimistic locking para que esto no sea tan lento. Una transacción, hasta que no se haga commit, no se bloque nada ni se informa de nada a los otros nodos.
Es malo si tenemos mucho tráfico trabajando simultáneamente en los mismos recursos (row por ejemplo), alguna de las transacción será matada (rollback). Los developers tienen que encargarse del rollback si la transacción falla.


WAN replication, no recomendado:
  works fine
  use higher timeouts and send windows
  no impact on reads
  no impact within a transaction
  no impact within a transaction
  adds 100-300 ms to commit latency
  no major impact on tps
  quorum between data centers
    3 data centers
    distribute nodes evenly

Mejor, sincronización replicación asíncrona entre datacenters, y replicación síncrona dentro de los datacenters.


State Transfer:
  Lo mejor es usar xtrabackup
  IST: se aplica si las transacciones están en la cache de los otros nodos

Las tablas de sistema son MyISAM, no son replicadas.
Pero parece que la de usuarios si que se replica.
