Se puede instalar de tres maneras distintas:

A partir de RPMs:
http://dev.mysql.com/doc/refman/5.5/en/mysql-cluster-install-linux-rpm.html

A partir de los sources:
http://dev.mysql.com/doc/refman/5.5/en/mysql-cluster-install-linux-source.html

Paquetes binarios de Oracle:
http://dev.mysql.com/doc/refman/5.5/en/mysql-cluster-install-linux-binary.html
http://downloads.mysql.com/tutorials/cluster/mysql_wp_cluster_quickstart_linux.pdf

Hacer todo como un usuario NO root.

tar zxvf mysql-cluster-gpl-7.3.6-linux-glibc2.5-x86_64.tar.gz
cp -r mysql-cluster-gpl-7.3.6-linux-glibc2.5-x86_64 ~/
ln -s mysql-cluster-gpl-7.3.6-linux-glibc2.5-x86_64/ mysqlc
cd
mkdir my_cluster my_cluster/ndb_data my_cluster/mysqld_data my_cluster/conf

Esto creo que en los data y servers:
sudo yum install -y libaio-devel
mysqlc/scripts/mysql_install_db --no-defaults --datadir=/home/vagrant/my_cluster/mysqld_data/


Conf para el mysql server
cat <<END > my_cluster/conf/my.cnf
[mysqld] 
ndbcluster 
datadir=/home/vagrant/my_cluster/mysqld_data 
basedir=/home/vagrant/mysqlc 
port=5000 

[mysql_cluster]
# Options for MySQL Cluster processes:
ndb-connectstring=10.0.3.154  # location of management server
END

Conf para el nodo mgmt
Estamos definiendo el el nodo mgmt tiene dicha ip, y espera que conecte un nodo data (ndb) desde la ip .146 al que se le asignará el id 3.
Lo mismo para el otro data node. Para el server mysql se espera una conexión desde cualquier ip.
cat <<END > my_cluster/conf/config.ini
[ndb_mgmd] 
hostname=10.0.3.154
datadir=/home/vagrant/my_cluster/ndb_data 
NodeId=1 

[ndbd default] 
noofreplicas=2 
datadir=/home/vagrant/my_cluster/ndb_data 

[ndbd] 
hostname=10.0.3.146
NodeId=3 

[ndbd] 
hostname=10.0.3.248
NodeId=4 

[mysqld] 
NodeId=50 
END


Arrancamos el nodo management:
/home/vagrant/mysqlc/bin/ndb_mgmd -f conf/config.ini --initial --configdir=/home/vagrant/my_cluster/conf/
Para recargar el nodo mgt: /home/vagrant/mysqlc/bin/ndb_mgmd -f conf/config.ini --configdir=/home/vagrant/my_cluster/conf/ --reload


Podemos consultar el status del host:
/home/vagrant/mysqlc/bin/ndb_mgm -e show
Nos dirá que tenemos dos data nodes (NDB) sin conexión.
Un nodo mgm conectado.
Un mysql sin conexión.

Arrancamos los data nodes (ndb)
/home/vagrant/mysqlc/bin/ndbd -c localhost:1186

Esperar hasta que arranquen los data nodes (no aparezca la palabra starting en el comando /home/vagrant/mysqlc/bin/ndb_mgm -e show)
Luego arrancar el servidor:
/home/vagrant/mysqlc/bin/mysqld --defaults-file=conf/my.cnf & 

Definimos password para root:
mysqlc/bin/mysqladmin -u root password root

Conectamos:
mysqlc/bin/mysql -u root -proot

Probamos la bbdd:
create database clusterdb;use clusterdb; 
create table simples (id int not null primary key) engine=ndb; 
insert into simples values (1),(2),(3),(4); 
select * from simples;

En el otro nodo:
use clusterdb;select * from simples;


# Shutdown
The MySQL Server must be shut down manually but then the other Cluster nodes can be stopped using the ndb_mgm tool: 
/home/vagrant/mysqlc/bin/mysqladmin -u root -h 127.0.0.1 -P 5000 shutdown 
/home/vagrant/mysqlc/bin/ndb_mgm -e shutdown 
