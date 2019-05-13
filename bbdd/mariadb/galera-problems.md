## active-active: como arrancar

wsrep_cluster_address=gcomm://172.31.200.1,172.31.200.2,172.31.200.3

Trata de arrancar uniéndose a alguno de estos nodos.
Para iniciar el cluster. /init.d/mysql --gcomm="" start

No hay solución. Sobre todo el problema es saber el tamaño del cluster antes de que se apagase y quien tiene la información más actualizada.
El problema que veo yo también es que los nodos enciendan con una partición de red, de esta manera se podría producir una partición, al crearse dos clusters distintos.



## network looses packages
Configurar parámetros para aumentar el timeout para considerarse una desconexión.



## los nodos no son exactamente iguales.
Script que hacia escrituras y lecturas muy seguidas fallaba.
https://github.com/jayjanssen/percona-xtradb-cluster-tutorial/blob/master/instructions/Tuning%20Replication.rst#wsrep-causal-reads




## how to decide to which node should balancer send traffic
check_tcp WRONG! DONOR time!
problema con el pyclustercheck



## how to make backup
bad doc




## doc to understant logs



## wsrep_notify críptico
wsrep_notify_cmd=/usr/local/bin/wsrep_notify.sh





# deadlock
https://www.percona.com/blog/2012/08/17/percona-xtradb-cluster-multi-node-writing-and-unexpected-deadlocks/
https://www.percona.com/blog/2012/11/20/understanding-multi-node-writing-conflict-metrics-in-percona-xtradb-cluster-and-galera/
http://galeracluster.com/documentation-webpages/dealingwithmultimasterconflicts.html

ERROR 1213 (40001): Deadlock found when trying to get lock; try restarting transaction
Esto se produce si dos transacciones intentan modificar el mismo valor.
Ejemplo:
nodoA                          nodoB
begin;                         begin;
update tabla set a=1;          update tabla set a=2;
commit;
                               commit;
                               ERROR 1213 (40001): Deadlock found when trying to get lock; try restarting transaction

Se incrementará el valor de wsrep_local_bf_aborts en 1 (en el nodo donde falló la TX).
