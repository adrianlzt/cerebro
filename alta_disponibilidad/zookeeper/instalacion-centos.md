# Requisitos
http://zookeeper.apache.org/doc/r3.4.5/zookeeperAdmin.html#sc_systemReq
At Yahoo!, ZooKeeper is usually deployed on dedicated RHEL boxes, with dual-core processors, 2GB of RAM, and 80GB IDE hard drives.

# Instalacion
## CentOS 7

Rol de ansible: https://github.com/rackerlabs/ansible-kafka/tree/master/playbooks/roles/zookeeper

yum install -y wget java-1.8.0-openjdk
wget http://ftp.cixug.es/apache/zookeeper/zookeeper-3.4.6/zookeeper-3.4.6.tar.gz
tar zxvf zookeeper-3.4.6.tar.gz
mv zookeeper-3.4.6 /opt
cd /opt/zookeeper-3.4.6
cp conf/zoo_sample.cfg conf/zoo.cfg
mkdir datadir/
sed -i 's#/tmp/zookeeper#/opt/zookeeper-3.4.6/datadir#' conf/zoo.cfg



# Configuración

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


conf/log4j.properties
  Fichero de configuración del logging

Set the Java heap size. This is very important to avoid swapping, which will seriously degrade ZooKeeper performance. To determine the correct value, use load tests, and make sure you are well below the usage limit that would cause you to swap. Be conservative - use a maximum heap size of 3GB for a 4GB machine.

## Standalone
No hay que hacer nada.

## Cluster
datadir/myid
  definir que máquina es esta en el cluster (entre 1 y 255)

conf/zoo.cfg
...
server.1=zoo1:2888:3888
server.2=zoo2:2888:3888
server.3=zoo3:2888:3888


# Funcionamiento
bin/zkServer.sh start
  comienza a escuchar en el puerto 2181

bin/zkServer.sh status
  para ver si ha arrancado correctamente

zookeeper.out
  aqui tendremos el log de ejecucción

echo stat | nc localhost 2181
  deberemos obtener si es el nodo leader o follower y cuantos nodos conectados hay
