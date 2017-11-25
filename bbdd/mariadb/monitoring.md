https://www.webyog.com/product/monyog
De pago

http://galeracluster.com/documentation-webpages/monitoringthecluster.html#monitoring-cluster
Como monitorizar el cluster


Chequear que wsrep_ready esta a ON.

Tambien podemos crear una tabla innodb y lanzar una consulta contra ella.
create database galera_check;
use galera_check;
create table test(test int);
insert into test values(1);

Si el nodo no esta operativo:
$ mysql -e 'select test from galera_check.test;'; echo $?
ERROR 1047 (08S01) at line 1: WSREP has not yet prepared node for application use
1
