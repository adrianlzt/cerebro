# Requisitos
http://zookeeper.apache.org/doc/r3.4.5/zookeeperAdmin.html#sc_systemReq

# Instalacion
## Ubuntu
apt-get install zookeeper

# Configuración
/etc/zookeeper/conf/zoo.cfg

tickTime
  the basic time unit in milliseconds used by ZooKeeper. It is used to do heartbeats and the minimum session timeout will be twice the tickTime.
dataDir
  the location to store the in-memory database snapshots and, unless specified otherwise, the transaction log of updates to the database.
clientPort
  the port to listen for client connections
initLimit
  The number of ticks that the initial synchronization phase can take
syncLimit
  The number of ticks that can pass between sending a request and getting an acknowledgement


/etc/zookeeper/conf/log4j.properties
  Fichero de configuración del logging

Set the Java heap size. This is very important to avoid swapping, which will seriously degrade ZooKeeper performance. To determine the correct value, use load tests, and make sure you are well below the usage limit that would cause you to swap. Be conservative - use a maximum heap size of 3GB for a 4GB machine.

## Standalone
No hay que hacer nada.

## Cluster
/etc/zookeeper/conf/myid
  definir que máquina es esta en el cluster (entre 1 y 255)

/etc/zookeeper/conf/zoo.cfg
...
server.1=zoo1:2888:3888
server.2=zoo2:2888:3888
server.3=zoo3:2888:3888


# Funcionamiento
/usr/share/zookeeper/bin/zkServer.sh start
  comienza a escuchar en el puerto 2181
