Cada índice se rompe en cinco (por defecto) piezas, llamadas shards y dos (por defecto) replicas.
No se puede modificar el número de shards de un índice ya creado, si se puede modificar el número de replicas.

Cada Documento solo puede vivir en un único shard, y por lo tanto en un único nodo. Pero los shards son replicados entre nodos (por defecto se hace una réplica).

Primary: el shard original
Replicas: copias de primary shard

Los shards se garantiza que estén en nodos diferentes -> Si no puede pondrá el cluster en YELLOW

Tener replicas nos ayuda a tener más throughput. ES eligirá los nodos menos cargados para realizar los cálculos, usando los primary shards o replicas indistintamente.

El estado del cluster nos devuelve, tras crear un índice:
"active_primary_shards":5,
"active_shards":10
Estos son los 5 shards del índice creado, y 5 más de las réplicas hechas en el segundo nodo.

Numero total de shards: num_primary_shards * (num_replicas + 1)



# Estados
UNASSIGNED: el cluster reconoce que este shard debe existir, pero aún no tiene un sitio en algún data node
INITIALIZING: se están creando los shards, pero aún no se puede escribir en ellos
STARTED: shard listos para escritura, en ese momento se comenzarán a crear los shards replica
RELOCATING: cuando se ha agregado un nuevo nodo y se está copiando el shard al nuevo nodo


# Eligiendo el número de shards
Heavy indexing?
  Use a higher number of primary shards so as to scale the indexing across more nodes

Heavy search traffic?
  Increase the number of replicas (and add more nodes if necessary)

Large dataset?
  Allow for enough primary shards to keep each shard under 30-100GB

Small dataset?
  Nothing wrong with a one-shard index!


# Número de replicas (dicho en el curso)
1 es ok
2 tambien
3 si lo vemos necesario
>3 es mala idea




A partir de la version 5.x hay una API para explicar porque las asignaciones de shards están como están:
https://www.elastic.co/guide/en/elasticsearch/reference/current/cluster-allocation-explain.html


# Listar shards
https://www.elastic.co/guide/en/elasticsearch/reference/2.3/cat-shards.html

curl "localhost:9200/_cat/shards?v"
  The shards command is the detailed view of what nodes contain which shards. It will tell you if it’s a primary or replica, the number of docs, the bytes it takes on disk, and the node where it’s located.

curl "localhost:9200/_cat/miindice/shards?v"
  shards de un indice

curl "localhost:9200/_cat/shards?v&h=index,shard,prirep,state,node&s=index,shard,node"
  mostrar solo ciertas columnas y ordenar por index (luego por shard, luego por node)

curl "localhost:9200/_cat/shards?v&h=index,shard,prirep,state,unassigned.reason" | grep -v STARTED
  consultar que shards no estan allocated y por que https://www.elastic.co/guide/en/elasticsearch/reference/current/cat-shards.html#reason-unassigned
  Si estan en UNASSIGNED pero no pone ninguna razón es que está en la cola de hacerlo, pero no tenemos problemas

curl "localhost:9200/_cluster/allocation/explain?pretty"
  explicación de porque hay shards sin asignar (version >=5)



# Rellocating
https://www.elastic.co/blog/red-elasticsearch-cluster-panic-no-longer

Cuando agregamos un nuevo nodo:
  Se crea una replica de un índice en uno de los nuevos nodos (mientras dura esto el primary estará en RELOCATING y el nuevo en INITIALIZING)
  Cuando este nuevo shard está STARTED, se marca como primary y se elimina el original

When a node leaves the cluster for whatever reason, intentional or otherwise, the master reacts by:
  Promoting a replica shard to primary to replace any primaries that were on the deleted node (hasta este momento estaríamos en RED y pasamos a YELLOW)
  Allocating replica shards to replace the missing replicas (assuming there are enough nodes) (pasamos de YELLOW a GREEN)
  Rebalancing shards evenly across the remaining nodes.

These actions are intended to protect the cluster against data loss by ensuring that every shard is fully replicated as soon as possible.

Even though we throttle concurrent recoveries both at the node level and at the cluster level, this "shard-shuffle" can still put a lot of extra load on the cluster which may not be necessary if the missing node is likely to return soon. Imagine this scenario

Node 5 loses network connectivity.
The master promotes a replica shard to primary for each primary that was on Node 5.
The master allocates new replicas to other nodes in the cluster.
Each new replica makes an entire copy of the primary shard across the network.
More shards are moved to different nodes to rebalance the cluster.
Node 5 returns after a few minutes.
The master rebalances the cluster by allocating shards to Node 5.


Podemos configurar el cluster para esperar cierto tiempo antes de hacer relocatings, por ejemplo porque vamos a sacar un nodo para actualizarlo:
https://www.elastic.co/guide/en/elasticsearch/reference/current/delayed-allocation.html#delayed-allocation
PUT _all/_settings
{
  "settings": {
    "index.unassigned.node_left.delayed_timeout": "5m"
  }
}



# Internals
Directorio donde se almacenan los datos:
/var/lib/elasticsearch/NOMBRE-CLUSTER

Los shards de un índice llamado 'vehicles' estarán en:
/var/lib/elasticsearch/icaro/nodes/0/indices/vehicles/
  Y los 5 shards serán los 5 directorios llamados '0','1','2','3','4' y '5'

La información almacenada se puede leer, más o menos en text claro, haciendo cat de NUMERO_DE_SHARD/index/_0.cfs


Si no existe replicación, los distintos directorios solo se encontrarán en uno de los nodos, por ejemplo:
nodo1: '1','2' y '4'
nodo2: '0' y '3'


