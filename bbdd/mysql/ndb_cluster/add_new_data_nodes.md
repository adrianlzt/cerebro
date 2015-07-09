http://www.tokiwinter.com/mysql-cluster-adding-new-data-nodes-online/
https://dev.mysql.com/doc/refman/5.1/en/mysql-cluster-online-add-node-basics.html

 - assign IDs to new nodes (no hace falta, podemos no asignar un id, lo hará automáticamente)
 - deploy the common part (mysql cluster binary and config files)
 - add new nodes to /etc/config.ini in mgm nodes
 - Reload mgm nodes with --reload (al mismo tiempo los dos nodos)
    - primero parar mgm_ndb, luego arancarlo con --reload o --initial
    - comprobar que la nueva configuración ha entrado: ndb_mgm -e 'ALL STATUS'

 - restart all current data nodes (one by one, in order)
    - en cada nodo: /etc/init.d/ndbd restart
    - mejor reinicio en cada nodo que dede la consola de mgm_ndb. Me ha fallado alguna vez

 - restart of mysql nodes (SQL or API nodes)
    - systemctl restart mysqld

 - start new data nodes con --initial (se puede hacer en paralelo)
    - /etc/init.d/ndbd start-initial
    - podemos ver con 'ndb_mgm -e "SHOW"' que los nuevos data nodes no pertenecen a ningún nodegroup

 - "CREATE NODEGROUP" to add the new data nodes. Lo creamos pasando sus ids:
    - Obtener el id de cada nodo: ./ndb_mgm -c 172.16.1.70:1186 -e "show" | grep 172.16.1.71 | sed 's/id=\([0-9]*\).*/\1/
    - db_mgm -e "CREATE NODEGROUP 5,6"

 - Tablas que debemos reorganizar y optimizar:
    - mysql> SELECT TABLE_SCHEMA, TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE ENGINE = 'NDBCLUSTER';

 - Redistribute the cluster's data among all data nodes (including the new ones) by issuing an ALTER ONLINE TABLE ... REORGANIZE PARTITION statement in the mysql client for each NDBCLUSTER table.
    - mysql> ALTER ONLINE TABLE clusterdb.testtable REORGANIZE PARTITION;
    - Para ver que se ha reorganizado: ndb_desc -d clusterdb testtable -pn

 - Reclaim the space freed on the “old” nodes by issuing, for each NDBCLUSTER table, an OPTIMIZE TABLE statement in the mysql client.
    - mysql> OPTIMIZE TABLE clusterdb.testtable;
