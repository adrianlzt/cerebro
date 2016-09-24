http://docs.mongodb.org/manual/replication/

A replica set in MongoDB is a group of mongod processes that maintain the same data set. Replica sets provide redundancy and high availability, and are the basis for all production deployments.

In some cases, you can use replication to increase read capacity. Clients have the ability to send read and write operations to different servers. You can also maintain copies in different data centers to increase the locality and availability of data for distributed applications.
A replica set can have up to 12 members. [1] However, only 7 members can vote at a time.

# Primary
http://docs.mongodb.org/manual/core/replica-set-primary/
One mongod, the primary, receives all write operations. All other instances, secondaries, apply operations from the primary so that they have the same data set.
By default, an application directs its read operations to the primary member (http://docs.mongodb.org/manual/core/read-preference/)

If the primary is unavailable (more than 10s), the replica set will elect a secondary to be primary (http://docs.mongodb.org/manual/core/replica-set-elections/)


# Secundarios
http://docs.mongodb.org/manual/core/replica-set-secondary/
Secondaries apply operations from the primary asynchronously. By applying operations after the primary, sets can continue to function without some members. However, as a result secondaries may not return the most current data to clients (http://docs.mongodb.org/manual/core/write-concern/ para evitar lecturas de secundarios no sincronizadas).
To replicate data, a secondary applies operations from the primary’s oplog to its own data set in an asynchronous process.

You can configure a secondary to:

Prevent it from becoming a primary in an election, which allows it to reside in a secondary data center or to serve as a cold standby. http://docs.mongodb.org/manual/core/replica-set-priority-0-member/
Prevent applications from reading from it, which allows it to run applications that require separation from normal traffic. http://docs.mongodb.org/manual/core/replica-set-primary/
Keep a running “historical” snapshot for use in recovery from certain errors, such as unintentionally deleted databases. Al consultarle podemos ver los datos que estaban hace x horas. http://docs.mongodb.org/manual/core/replica-set-delayed-member/


# Arbitro
http://docs.mongodb.org/manual/core/replica-set-arbiter/
You may add an extra mongod instance to a replica set as an arbiter. Arbiters do not maintain a data set. Arbiters only exist to vote in elections. If your replica set has an even number of members, add an arbiter to obtain a majority of votes in an election for primary. Arbiters do not require dedicated hardware. See arbiter for more information.


# Arquitecturas de replica set
http://docs.mongodb.org/manual/core/replica-set-architectures/

In a deployment with very high read traffic, you can improve read throughput by distributing reads to secondary members. As your deployment grows, add or move members to alternate data centers to improve redundancy and availability.

To protect your data if your main data center fails, keep at least one member in an alternate data center. Set these members’ priority to 0 to prevent them from becoming primary.

Keep a Majority of Members in One Location

Each mongod instance on a separate host server serviced by redundant power circuits and redundant network paths.



# Connfiguración
http://docs.mongodb.org/manual/tutorial/deploy-replica-set/
Tener los mongos instalados.
Que las máquinas tengan resolución por DNS o meterlo en /etc/hosts
Comprobar conectividad entre ellos.
El fichero de configuracion solo tenemos que definir el nombre del replica set y la key que comparten:
/etc/mongod.conf
replSet=nonmbre # si no lo definimos no podremos iniciar un replicaset
#keyFile=/etc/mongod.key
# Si ponemos esto no funcionara el acceso remoto sin autorizacion
# http://docs.mongodb.org/manual/reference/configuration-options/#security.keyFile

Crear la key:
openssl rand -base64 741 > /etc/mongod.key
chmod 400 /etc/mongod.key
chown mongod:mongod /etc/mongod.key

Arrancar mongo:
service mongod start

Iniciar cluster (lo pongo como un script, se podria hacer entrando en la consola de mongo y ejecutando los comandos a mano):
/tmp/repset_init.js
rs.initiate()
sleep(13000)
rs.add("nombremongo1")
sleep(8000)
rs.add("nombremongo2")
sleep(8000)
rs.add("nombremongo3")
sleep(8000)
printjson(rs.status())

Se debe ejecutar solo en una de las máquinas.
/usr/bin/mongo /tmp/repset_init.js 

Ahora cuando conectemos a uno de los cyclops en la consola nos dirá si es el primario o el secundario:
cyclops:PRIMARY>
cyclops:SECONDARY>


Comandos:
http://docs.mongodb.org/manual/reference/replication/

Estado:
> rs.status()

mongo --quiet --eval "rs.status().ok"
0  -> no hay replica set
1  -> replica set activado



Borrar un replicaset:
> use local;
> db.dropDatabase()
service mongod restart


## Estados
http://docs.mongodb.org/manual/reference/replica-states/


## Optlog
http://docs.mongodb.org/manual/core/replica-set-oplog/#replica-set-oplog-sizing
http://docs.mongodb.org/manual/tutorial/change-oplog-size/
A larger oplog can give a replica set a greater tolerance for lag, and make the set more resilient.
rs.printReplicationInfo() 


## Pasar de replica set a standalone

Cuando no tenemos mayoría: https://docs.mongodb.com/manual/tutorial/reconfigure-replica-set-with-unavailable-members/

cfg = rs.conf()
cfg.members = [cfg.members[X]] //Poner el nodo que sigue vivo
rs.reconfig(cfg, {force : true})

El nodo que sigue vivo se habrá puesto como primario

