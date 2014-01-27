Cada índice se rompe en cinco piezas, llamadas shards.

Cada Documento solo puede vivir en un único shard, y por lo tanto en un único nodo. Pero los shards son replicados entre nodos (por defecto se hace una réplica).

El estado del cluster nos devuelve, tras crear un índice:
"active_primary_shards":5,
"active_shards":10
Estos son los 5 shards del índice creado, y 5 más de las réplicas hechas en el segundo nodo.


Directorio donde se almacenan los datos:
/var/lib/elasticsearch/NOMBRE-CLUSTER

Los shards de un índice llamado 'vehicles' estarán en:
/var/lib/elasticsearch/icaro/nodes/0/indices/vehicles/
  Y los 5 shards serán los 5 directorios llamados '0','1','2','3','4' y '5'

La información almacenada se puede leer, más o menos en text claro, haciendo cat de NUMERO_DE_SHARD/index/_0.cfs


Si no existe replicación, los distintos directorios solo se encontrarán en uno de los nodos, por ejemplo:
nodo1: '1','2' y '4'
nodo2: '0' y '3'
