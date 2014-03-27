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


