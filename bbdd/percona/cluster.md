http://www.mysqlperformanceblog.com/2012/11/20/understanding-multi-node-writing-conflict-metrics-in-percona-xtradb-cluster-and-galera/
http://www.mysqlperformanceblog.com/2013/05/02/galera-flow-control-in-percona-xtradb-cluster-for-mysql/

wsrep_local_cert_failures: Total number of local transactions that failed certification test.
Colisiones entre transacciones. Cuando se hace el COMMIT de una transacción, aparece un conflicto con otra transacción de otro nodo que ha hecho COMMIT antes.
Si sucede esto, se aumenta la variable en 1, y se hace ROLL BACK de la transacción local con problemas.
ETo put it another way, some other conflicting write from some other node was committed before we could commit, and so we must abort.
Cuenta cuantas transacciones locales se han cancelado por tener colisiones cuando se hace el COMMIT.
Este fallo se produce cuando se va a hacer COMMIT de una transacción local y se detecta una colisión con una transacción pendiente de ser aplicada (en la cola), de otro nodo


wsrep_local_bf_aborts: Total number of local transactions that were aborted by slave transactions while in execution. (bf = brute force)
Cuenta cuantas transacciones locales se han cancelado al colisionar con una transacción de otro nodo que se estaba aplicando.
Es una colisión entre una hebra esclava que está aplicando un 'writeset' de otro nodo, y una transacción abierta local.


Flow the node commit:
 local certification, enqueue on all other nodes, commit locally



http://www.mysqlperformanceblog.com/2013/06/05/multicast-replication-in-percona-xtradb-cluster-pxc-and-galera/
multicast para la comunicacion de los nodos
realmente util si empezamos a añadir más nodos
