Cada índice se rompe en cinco (por defecto) piezas, llamadas shards y dos (por defecto) replicas.
No se puede modificar el número de shards de un índice ya creado, si se puede modificar el número de replicas.

Cada Documento solo puede vivir en un único shard, y por lo tanto en un único nodo. Pero los shards son replicados entre nodos (por defecto se hace una réplica).

Primary: el shard original
Replicas: copias de primary shard

Los shards se garantiza que estén en nodos diferentes -> Si no puede pondrá el cluster en YELLOW

Tener replicas nos ayuda a tener más throughput. ES eligirá los nodos menos cargados para realizar los cálculos, usando los primary shards o replicas indistintamente.

Tener muchos shards tambien impacta en la velocidad de ES. Cada shard tiene un coste (Lucene indices, file descriptors, memory, CPU).
40GB/shard es un buen número

Poner el mismo número de shards que el número de nodos puede ser una opción, pero luego nos costará escalar si metemos más nodos (tendremos que reindexar, usar alias, etc)

<1GB/shard está subutilizado y deberiamos mergearlo con otros.

Mirar production.md Capacity planning


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

GET _cat/recovery/INDICE?v
  si es están moviendo los shards lo podemos ver aqui
  primero mueve ficheros, luego bytes, luego translog (se ve de manera sencilla en Monitoring de kibana)



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



## Shard Allocation Filtering
https://www.elastic.co/guide/en/elasticsearch/reference/current/allocation-filtering.html
CUIDADO! Tocar esta API puede romper cosas.
Con esta API podemos controlar donde se van a distribuir los shards.

Por ejemplo, podemos marcar un nodo para que se le ignore en la distribución de shard (y se los quiten en caso de que ya tenga).
El típico ejemplo es cuando queremos sacar un nodo del cluster.
PUT _cluster/settings
{
  "transient" : {
    "cluster.routing.allocation.exclude._ip" : "10.0.0.1"
  }
}



# Shard filtering
mirar en hot_warm_architecture.md


# Shard allocation awareness
https://www.elastic.co/guide/en/elasticsearch/reference/6.3/allocation-awareness.html
Dar más inteligencia sobre como ES organiza los shards.
Ejemplo, tenemos dos racks distintos y queremos que no se asignen las réplicas en el mismo rack que los primaries.
Útil cuando tenemos más de un servidor que comparten recursos (disk, host machine, network switch, rack, etc)

Ejemplo de config (chequear attrs: GET _cat/nodeattrs?v):
  nodo1, node.attr.rack: rack1
  nodo2: node.attr.rack: rack2
  cluster.routing.allocation.awareness.attributes: rack (se pueden especificar varios separados por coma)

De esta manera ES intentará no poner primeries y replicas en el mismo rack.

Cuando ejecutamos búsquedas con awareness activado, ES intentará usar local shards (shards en el mismo awareness group).


# Forced awareness
https://www.elastic.co/guide/en/elasticsearch/reference/6.3/allocation-awareness.html#forced-awareness
Tenemos que tener cuidado ante una caída grande, por ejemplo un rack que contiene la mitad de nuestros nodos.
Esto puede provocar que ES intente rebalancear todo y se saturen los nodos que nos queden.
La idea de forced awareness es evitar que se intenten reasignar los shards en este caso.
Solo se asignarán réplicas en caso de que tengamos nodos en distintas zonas.
Esto provocará un cluster en YELLOW si no tenemos las zonas necesarias (peligroso si perdemos el nodo con los primaries, perderíamos todos los datos)
Si el cluster se mantiene en YELLOW/RED revisar /_cluster/allocation/explain para entender porque no está funcionando.

cluster.routing.allocation.awareness.force.zone.values: zone1,zone2 ￼
cluster.routing.allocation.awareness.attributes: zone



# Almacenamiento
Directorio donde se almacenan los datos:
/var/lib/elasticsearch/NOMBRE-CLUSTER

Los shards de un índice llamado 'vehicles' estarán en:
/var/lib/elasticsearch/icaro/nodes/0/indices/vehicles/
  Y los 5 shards serán los 5 directorios llamados '0','1','2','3','4' y '5'

La información almacenada se puede leer, más o menos en text claro, haciendo cat de NUMERO_DE_SHARD/index/_0.cfs


Si no existe replicación, los distintos directorios solo se encontrarán en uno de los nodos, por ejemplo:
nodo1: '1','2' y '4'
nodo2: '0' y '3'
