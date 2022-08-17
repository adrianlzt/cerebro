http://www.repmgr.org/

repmgr is a set of open source tools that helps DBAs and System administrators manage a cluster of PostgreSQL databases.

By taking advantage of the Hot Standby capability introduced in PostgreSQL 9, repmgr greatly simplifies the process of setting up and managing database with high availability and scalability requirements.

repmgr simplifies administration and daily management, enhances productivity and reduces the overall costs of a PostgreSQL cluster by:

monitoring the replication process;
allowing DBAs to issue high availability operations such as switch-overs and fail-overs.


Autofailover
Puede usar barman para hacer backups
Genera notificaciones de los cambios


Se instala en cada nodo y tienen un fichero de configuración para conectar al propio server, poniendo en cada server un node_id distinto y un node_name

# Admin
Ejemplos de comandos:

repmgr primary register

repmgr standby register
repmgr standby clone
repmgr standby promote
  si ya hay un master, no nos dejará hacer promote
repmgr standby follow
  este comando es necesario si tenemos un tercer nodo standby y se cae el master, este comando apuntará este tercer nodo para que apunte el nuevo master
repmgr standby switchover
  cambiar los roles de los nodos: A(master), B(standby) -> A(standby), B(master)

repmgr witness create

repmgr cluster show
repmgr cluster cleanup
  borrar logs antiguos

repmgr node status
repmgr node check
repmgr node rejoin
  para unir de nuevo un nodo que salió en un failover
  si el master dejó un trozo de wal sin enviar, necesitaremos --force-rewind, que borrará ese último trozo.
  Antes del force podemos mirar el wal del antiguo master por si hay algo interesante.
repmgr node service

repmgr daemon start
repmgr daemon stop


# Autofailover
Chequea periódicamente el estado de los nodos y en caso de que no conteste, hará el promote de un nodo y follow al resto.

failover=automatic
