Cada índice se rompe en cinco piezas, llamadas shards.

Cada Documento solo puede vivir en un único shard, y por lo tanto en un único nodo. Pero los shards son replicados entre nodos (por defecto se hace una réplica).

El estado del cluster nos devuelve, tras crear un índice:
"active_primary_shards":5,
"active_shards":10
Estos son los 5 shards del índice creado, y 5 más de las réplicas hechas en el segundo nodo.

A partir de la version 5.x hay una API para explicar porque las asignaciones de shards están como están:
https://www.elastic.co/guide/en/elasticsearch/reference/current/cluster-allocation-explain.html


Directorio donde se almacenan los datos:
/var/lib/elasticsearch/NOMBRE-CLUSTER

Los shards de un índice llamado 'vehicles' estarán en:
/var/lib/elasticsearch/icaro/nodes/0/indices/vehicles/
  Y los 5 shards serán los 5 directorios llamados '0','1','2','3','4' y '5'

La información almacenada se puede leer, más o menos en text claro, haciendo cat de NUMERO_DE_SHARD/index/_0.cfs


Si no existe replicación, los distintos directorios solo se encontrarán en uno de los nodos, por ejemplo:
nodo1: '1','2' y '4'
nodo2: '0' y '3'


# Listar shards
https://www.elastic.co/guide/en/elasticsearch/reference/2.3/cat-shards.html

curl "localhost:9200/_cat/shards?v"
The shards command is the detailed view of what nodes contain which shards. It will tell you if it’s a primary or replica, the number of docs, the bytes it takes on disk, and the node where it’s located.

curl "https://localhost:9200/_cat/shards?v&h=index,shard,prirep,state,unassigned.reason" | grep -v STARTED
  consultar que shards no estan allocated y por que https://www.elastic.co/guide/en/elasticsearch/reference/current/cat-shards.html#reason-unassigned
  Si estan en UNASSIGNED pero no pone ninguna razón es que está en la cola de hacerlo, pero no tenemos problemas

curl "localhost:9200/_cluster/allocation/explain?pretty"
  explicación de porque hay shards sin asignar (version >=5)



# Rellocating
https://www.elastic.co/blog/red-elasticsearch-cluster-panic-no-longer
When a node leaves the cluster for whatever reason, intentional or otherwise, the master reacts by:

Promoting a replica shard to primary to replace any primaries that were on the node.
Allocating replica shards to replace the missing replicas (assuming there are enough nodes).
Rebalancing shards evenly across the remaining nodes.

These actions are intended to protect the cluster against data loss by ensuring that every shard is fully replicated as soon as possible.

Even though we throttle concurrent recoveries both at the node level and at the cluster level, this “shard-shuffle” can still put a lot of extra load on the cluster which may not be necessary if the missing node is likely to return soon. Imagine this scenario

Node 5 loses network connectivity.
The master promotes a replica shard to primary for each primary that was on Node 5.
The master allocates new replicas to other nodes in the cluster.
Each new replica makes an entire copy of the primary shard across the network.
More shards are moved to different nodes to rebalance the cluster.
Node 5 returns after a few minutes.
The master rebalances the cluster by allocating shards to Node 5.
