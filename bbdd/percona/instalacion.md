# http://www.percona.com/doc/percona-xtradb-cluster/installation/yum_repo.html
# http://form.percona.com/rs/percona/images/Percona_XtraDB_Cluster_1_0_Operations_Manual.pdf

Quitar SELinux: 
# set enforce 0

vi /etc/sysconfig/selinux
SELINUX=permissive


Bajar el repositorio de Percona:
http://www.percona.com/doc/percona-server/5.5/installation/yum_repo.html
# rpm -Uhv http://www.percona.com/downloads/percona-release/percona-release-0.0-1.x86_64.rpm

Habilitar puertos en iptables /etc/sysconfig/iptables: iptables.rules en este directorio
Galera: 4567
SST: 4444 (State Snapshot Transfer)
SST incremental port: 4568 (Galera port +1)
MySQL: 3306
Mirar iptables.rules

IMPORTANTE: 
	Los puertos de Galera, SST y IST se deben abrir solo en la interfaz interna.
	MySQL debe abrirse en la externa; y en la interna si se usa mysqldump o xtrabackup como SST

	What tcp ports are used by Percona XtraDB Cluster?
		Regular MySQL port, default 3306

		Port for group communication, default 4567. It can be changed by the option:
			wsrep_provider_options ="gmcast.listen_addr=tcp://0.0.0.0:4010; "

		Port for State Transfer, default 4444. It can be changed by the option:
			wsrep_sst_receive_address=10.11.12.205:5555

		Port for Incremental State Transfer, default port for group communication + 1 (4568). It can be changed by the option:
			wsrep_provider_options = "ist.recv_addr=10.11.12.206:7777; "

	
SST: mysqldump, xtrabackup o rsync
	mysqldump, utiliza el 3306 del cliente, necesita usuario y password del otro sistema
	rsync, que puerto usa?, no necesita user:pass, bloquea la base de datos ¿como?
	xtrabackup, 4444 del joiner, en el doner usa localhost?, necesita user:pass de la db local

Comprobar que no haya nada de mysql en la máquina actual: rpm -qa | grep -i mysql

Instalar paquetes:
yum -y install Percona-XtraDB-Cluster-server Percona-XtraDB-Cluster-client Percona-Server-shared-compat percona-xtrabackup
La última versión necesita de socat, que está en el repo EPEL.
Si queremos usar xtrabakcup, también: yum -y install perl-Time-HiRes (en la ultima versión ya vienen la libreria como dependencia)
El parámetros -y es para contestar a todo 'yes'.
Existe tambien un paquete Percona-XtraDB-Cluster-shared, pero la libreria que linka de mysql es muy nueva (libmysqlclient.so.18).
La shared compat en cambio linka con varias antiguas /usr/lib64/libmysqlclient.so.(12,14,15,16), que suelen ser necesarias para otras aplicaciones (normalmente, sin percona, linkarian contra mysql-libs), que suelen ser necesarias para otras aplicaciones (normalmente, sin percona, linkarian contra mysql-libs)

Arrancamos mysql para ejecutar el secure installation:
# service mysql start

Establecemos root passwd, borramos usuarios anónimos y tablas de pruebas:
# mysql_secure_installation

Configuramos los mysql /etc/my.cnf
	Usamos la misma configuración para todos los servidores.
En las configuraciones, a parte de este parámetro anteriormente comentado, deberemos definir:
	wsrep_sst_method=rsync ;rsync, xtrabackup, mysqldump
	wsrep_cluster_name=nombre_del_cluster ;muy importante, es lo que usan los nodos para decidir a que cluster unirse
	bind-address=ip.of.the.server ;interfaz que ofrecerá el servicio mysql. Cuidado, o escucha en una interfaz, o en todas
	wsrep_node_address=ip.of.the.server ;interfaz para comunicación interna de los nodos (SST, IST)
	wsrep_data_home_dir=/var/lib/mysql
	datadir=/var/lib/mysql


Bootstraping / Arrancando:
Los nodos se arrancan en orden, nunca todos a la vez.
El primer nodo que arranque definirá el cluster, para esto haremos un pequeño truco [*]:
	FORMA ANTIGUA:	/etc/init.d/mysql start --wsrep-cluster-address="gcomm://"
	/etc/init.d/mysql start bootstrap-pxc

Tras arrancarlo comprobamos que ha definido el cluster:
$ mysql -e "show status like 'wsrep_%'" -u root -pmysql | grep wsrep_cluster_conf_id
wsrep_cluster_conf_id   1

$ mysqladmin -u root -pmysql variables  | grep wsrep_cluster_name
| wsrep_cluster_name                                | dsn_cluster |

# netstat -ntlp
Galera: 4567
MySQL: 3306


Arrancamos un segundo nodo: service mysql start

Comprobar que arranca y conecta al cluster:
$ mysqladmin -u root -pmysql variables  | grep wsrep_cluster_name

Cuando se le pase la información, su estado deberá ser Synced:
mysql -e "show status like 'wsrep_%'" -u root -pmysql| grep state_comment
wsrep_local_state_comment       Synced


Arrancamos el tercer nodo.
Comprobamos que la variable wsrep_cluster_conf_id vale 3, ya que se han modificado 3 veces la membresía del cluster:

Tambien podemos comprobar en los logs de los otros nodos, que el nuevo se ha conectado (/var/lib/mysql/hostname.err):
130208 21:35:34 [Note] WSREP: Member 0 (percona3) synced with group
