A partir de 5.5.33

Si queremos sacar un nodo del cluster:
Desync functionality has now been exposed to the client. This can be done either via /*! WSREP_DESYNC */ comment on the query or by setting the global wsrep_desync variable to 1.  (http://www.mysqlperformanceblog.com/2013/09/18/percona-xtradb-cluster-5-5-33-23-7-6-now-available/)

mysql> SET GLOBAL wsrep_desync=1;


