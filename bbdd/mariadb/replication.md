# Master-slave (nativo)

SHOW SLAVE STATUS \G
  para ver el estado de un slave (solo funciona si lo ejecutamos en un slave)
  Para saber que la replicación está funcionando deben tener estos valores
    Slave_IO_Running: Yes
    Slave_SQL_Running: Yes

Generalmente se configuran los slaves para bloquear la escritura.
Podemos comprobar si está activo (1) con:
SELECT @@global.super_read_only;
CUIDADO! los SUPER users (root típicamente) pueden seguir modificando la tabla. Esto puede llevar a que se rompa la sincronización (por ejemplo si borramos una tabla)
  hay un super_read_only, pero no en mariadb https://www.percona.com/blog/2016/09/27/using-the-super_read_only-system-variable/
Modificar el valor:
SET @@global.read_only=1;  // poner en read-only


## promote slave to master
https://mariadb.com/kb/en/library/changing-a-slave-to-become-the-master/
https://www.percona.com/blog/2013/04/17/reset-slave-vs-reset-slave-all-disconnecting-a-replication-slave-is-easier-with-mysql-5-5/


## Borrar un slave para que empieze de cero
stop slave;
reset slave;

En este punto tendremos que dejar la bbdd limpia para que se puedan replicar los statements del master.
Por ejemplo, tuve que renombrar el user root de mysq.user (y hacer un flush privileges;) porque el primer statement era la creación de ese usuario (que ya existía en esta bbdd)

start slave;
SHOW SLAVE STATUS \G





# Galera
http://galeracluster.com/documentation-webpages/index.html
https://severalnines.com/blog/9-tips-going-production-galera-cluster-mysql
Limitaciones: https://mariadb.com/kb/en/library/mariadb-galera-cluster-known-limitations/

bbdd/percona tambien usa galera

Podemos montar un nodo con dos mariadb y un arbitrador (http://galeracluster.com/documentation-webpages/arbitrator.html)

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

Dos ips en el nodo y tenemos que usar una para wsrep? Definir:
wsrep_node_address="10.0.2.29"


Quitar selinux
Quitar, o configurar, firewall para permitir la transferencia de estado y la conexión.

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



# Agregar un nodo
https://www.percona.com/doc/percona-xtradb-cluster/LATEST/add-node.html
Instalar la misma version de mariadb
Instalar tambien net-tools (necesita ifconfig)
Copiar la conf /etc/my.cnf.d/server.cnf al nuevo nodo
Comprobar que el datadir tiene permisos mysql:mysql
Arrancar el nuevo nodo (tardará en terminar el comando):
  systemctl start mariadb
Comprobar mientras arranca los logs:
  journalctl -f
Si no arranca bien mirar los logs del journal entero (filtrando solo por mariadb nos perdemos cosas):
  journalctl -n 200

Si falla el wsrep_sst_rsync, podemos intentar ejecutarlo a mano para ver que dice. IP correcta?

Le hará una transferencia de estado (si falla mirar los logs de todos los nodos del cluster)
Una vez tengamos el nodo corriendo, iremos parando los nodos que ya estaban y modificando su configuración para agregar el nuevo nodo a wsrep_cluster_address



# Resetting the quorum
http://galeracluster.com/documentation-webpages/quorumreset.html

En caso de parada del cluster, debemos rearrancar el cluster.
Primero buscaremos el nodo más avanzado
SHOW STATUS LIKE 'wsrep_last_committed';

En ese ejecutaremos:
SET GLOBAL wsrep_provider_options='pc.bootstrap=YES';



# Quorum / weights
Podemos hacer que un cluster siga funcionando aunque haya pérdida de quorum si desactivamos la protección de split brain.
pc.ignore_sb


http://galeracluster.com/documentation-webpages/weightedquorum.html
Podemos jugar con los pesos de cada nodo para evitar una pérdida de quorum

El quorum se pierde si la suma de nodos*su_peso < (nodos_antes*peso - nodos_eliminados_corretamente*peso)/2
http://galeracluster.com/documentation-webpages/weightedquorum.html#quorum-calculation

Si vamos quitando nodos de forma ordenada (parando mariadb correctamente) no perdemos el quorum, aunque nos quedemos con un único nodo.





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
https://mariadb.com/kb/en/library/about-galera-replication/
http://galeracluster.com/documentation-webpages/introduction.html
Replicación síncrona -> el cluster bloquea la transacción hasta que los cambios se producen en todos los nodos
Replicación asíncrona -> existe un delay entre que los cambios se producen en el nodo donde se ejecuta el commit y el resto

Galera usa una técnica llamada "Certification-based" para conseguir replicación síncrona.
http://galeracluster.com/documentation-webpages/certificationbasedreplication.html

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
