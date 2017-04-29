https://geert.vanderkelen.org/2009/how-to-start-mysql-cluster-7-0-with-2-management-nodes/

Instrucciones para añadir de nuevo un nodo de mgmt.

Instalar los RPMs del cluster (misma version que el otro nodo de mgmt).

Copiar los ficheros /etc/my.cnf /etc/config.ini del otro nodo de mgmt al nuevo.

Mirar como arranca el cluster.
Script de init.d?
Copiar tambien si no lo tenemos (para ndb_mgmd he visto que severalnines mete uno propio)

En el caso del script de init.d de severalnines tendremos que editarlo y poner la ip del nuevo nodo de mgmt en la variable SERVER_ADDRESS
CONNECTSTRING apuntara al nodo que ya existe de mgmt.
La variable NODEID tendra que tener el valor que tenia (podemos verlo en ndb_mgm -e SHOW, o en el config.ini)

/etc/init.d/ndb_mgmd start

Comprobaremos que el nodo se ha unido correctamente ejecutando en los dos nodos de mgmt (al principio esta la seccion de los nodos de mgmt):
ndb_mgm -e "SHOW"
