https://dev.mysql.com/doc/refman/5.1/en/mysql-cluster-mgm-client-commands.html

ndb_mgm -e "SHOW" | less
ndb_mgm -e "ALL STATUS"



ndb_desc -d clusterdb testtable -pn
Particionado de datos de la tabla 'testtable' en la database 'clusterdb'
