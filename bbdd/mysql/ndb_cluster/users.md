https://dev.mysql.com/doc/refman/5.7/en/mysql-cluster-security-mysql-privileges.html

CREATE USER...
DROP USER...

It is important to keep in mind that, by default, the MySQL grant tables use the MyISAM storage engine. Because of this, those tables are not normally duplicated or shared among MySQL servers acting as SQL nodes in an NDB Cluster. In other words, changes in users and their privileges do not automatically propagate between SQL nodes by default. If you wish, you can enable automatic distribution of MySQL users and privileges across NDB Cluster SQL nodes; see Section 20.5.15, “Distributed MySQL Privileges for NDB Cluster”, for details. 


https://dev.mysql.com/doc/refman/5.7/en/mysql-cluster-privilege-distribution.html
Comprobar si tenemos creadas las rutinas para distribuir los usuarios por el cluster:
SELECT ROUTINE_NAME, ROUTINE_SCHEMA, ROUTINE_TYPE FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_NAME LIKE 'mysql_cluster%' ORDER BY ROUTINE_TYPE;
