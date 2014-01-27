Significado de las variables:
http://www.percona.com/doc/percona-xtradb-cluster/wsrep-status-index.html
http://www.percona.com/doc/percona-xtradb-cluster/wsrep-system-index.html
http://www.percona.com/doc/percona-xtradb-cluster/glossary.html
http://dev.mysql.com/doc/refman/5.5/en/innodb-parameters.html
http://dev.mysql.com/doc/refman/5.5/en/server-system-variables.html


High availability (http://www.percona.com/doc/percona-xtradb-cluster/features/highavailability.html)
SST: State Snapshot Transfer
IST: Incremental State Transfer

Cuando un nodo entra nuevo (o se recupera un nodo caído bastante tiempo), otro nodo le pasa la imagen que debe tener (SST). Un nodo del cluster se conectará al puerto SST del nuevo nodo para transmitirle la información.
SST puede hacerse mediante mysqldump, rsync y xtrabackup 
http://www.percona.com/doc/percona-xtradb-cluster/wsrep-system-index.html#wsrep_sst_method
mysqldump y rsync ponen la base de datos en READ ONLY mientras pasan los datos.
	mysqldump: un nodo del cluster haría un dump de su bd, se conectaría al nuevo (), e importaría dicha bd.
		necesita conocer user:pass de un user privilegiado (root generalmente), se ponen en la variable wsrep_sst_auth
	rsync: un nodo del cluster sincronizaría sus ficheros de mysql con los del nodo nuevo (es así?)
xtrabackup solo se pondrá en READ ONLY cuando tenga que sincronizar los ficheros de definición de tabla (.frm)
	Un nodo del cluster se conectaría al puerto SST del nodo nuevo para pasarle los datos de la bd.
	Hace falta tambien definir la variable wsrep_sst_auth con user:pass de un usuario con determinados permisos:
		http://www.percona.com/doc/percona-xtrabackup/innobackupex/privileges.html#permissions-and-privileges-needed

Otra opción no bloqueante es IST.
Esta funcionalidad es útil ante caídas cortas. Se trata de enviarle los cambios que se produjeron desde su caída hasta su reinicio.
Cada nodo almacena una cache de los últimos N cambios. Si el servidor caído necesita menos de estos N cambios, se podrá usar este sistema.
Este número es configurable.


Grupos
Los nodos se conectan al grupo que tenga el nombre que esté en su configuración (no a las ips de wsrep_cluster_address)
Cuando un nodo arranca sin ips definidas en wsrep_cluster_address, el crea el cluster, y se pone la variable wsrep_cluster_conf_id a 1.
Esta variable indica el número de cambios de membresía que ha sufrido el grupo. 
	# mysqladmin -u root -p<password> variables  | grep wsrep_cluster_conf_id


Preparar para insertar un cluster. Pasarle la información para que no bloquee al 'donor':
http://www.mysqlperformanceblog.com/2012/08/02/avoiding-sst-when-adding-new-percona-xtradb-cluster-node/
