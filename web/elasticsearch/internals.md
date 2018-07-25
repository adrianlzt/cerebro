# Memoria
https://www.elastic.co/blog/a-heap-of-trouble


# Communication
HTTP para REST clients

transport para comunicación intra-nodos
Intentar poner fibra para el canal de transport entre nodos.



# Write operation
Las escrituras se pueden lanzar contra cualquier nodo.
En ese nodo se hará un id del hash (tras generarlo si es necesario) y hará el módulo sobre el número de primary shards.

shard = hash(_routing) % number_of_primary_shards
  _routing por defecto es _id, pero puede usarse otro.

El nodo que tenga ese primary shard se encargará de la request. Aunque el nodo que recibió la petición original será el que conteste al cliente (es el que tiene la conex)

Primero se escribe al primary y luego al resto de replicas en paralelo.
Cuando termina esta escritura, se contesta al cliente.

Cada doc se escribe al buffer para luego ser escrito a un segmento (mirar abajo Shards).
También se escribe a un transaction log (tras ser procesado por el Lucene index).
Cuando se produce un lucene commit (se ha escrito al disco), se pueden elminiar los docs del transactio log.
El transaction log se usa para evitar pérdidas en caso de un apagado brusco.

Podemos forzar el flush de los segmentos, pero no es una buena idea:
POST my_index/_flush

Lo que si tal vez queramos en synced flush.
	A synced flush performs a normal flush, then adds a generated unique marker (sync_id) to all shards
	sync_id provides a quick way to check if two shards are identical
Esto simplifica el arranque, porque los shards al comenzar tienen que chequear los cambios que se han producido. Si todos tienen el mismo sync_id no hace falta hacer nada.
Para backups o si sabemos que vamos a tener que reiniciar nodos.


## Shards
Un shard es una instancia de Lucene, es un search engine en si mismo.
El número máximo de docs es Integer.MAX_VALUE-128

Indexar un doc en Lucene tiene 4 pasos, ES simplifica esto.


ES tiene un buffer que, por defecto, suele tener un valor de ~10% (compartido por todos los shards de ese nodo).
  indices.memory.index_buffer_size: 5%
Cuando intentamos indexar un documento se mete en el buffer y se espera a almacenarlo en un segmento de Lucene hasta que:
  se llena el buffer
  se alcanza el "refresh_interval" (default 1s)
  se hace un es flush
Esto reduce el consumo de IO (a cambio de memoria).
Mientras los docs están en el buffer aún no se pueden buscar (no se ha generado el inverted index), pero si podemos hacer un GET sobre el ID.

En caso de index con mucha indexación, podemos aumentar el refresh_interval para reducir la creación de segmentos (a cambio de tardar más en poder buscar los documentos):
PUT test/_settings
{
 "refresh_interval": "30s"
}

Mirar query/refresh.md para que las queries de indexación sean aware de como va su refresh.



# Segment
Es una colección de segmentos.
Podemos pensar en un segmento como un inmutable mini-índice.
Cada segmento es un paquete con diferentes estructuras de datos representando un índice invertido.
Son read-only.

Cuando indexamos documentos del mismo índice en el mismo segmento (al hacerse el refresh), se generá un inverted index por cada field de los documentos (con la frecuencia de aparición y un puntero al doc).
También se genera una estructura con los fields procesados.
Y una estructura "term proximity", donde se apunta cada palabra indexada la distancia a otras palabras.
  Ej.: Elastic Cloud Enterprise Beta
  elastic    (14:   0) (27: 0)
	Depende del text analysis no almacenaremos ciertas cosas (por ejemplo stop words)
También se almacenan los documentos eliminados (opcional)
El contenido de los documentos se almacenan en en otra estructura.
BKD trees en otra esctructura
Normalizaction factors, para hacer boosting al indexar (cada field de cada doc almacena un numero por el que será multiplicado para el score). Se suele usar boosting en runtime
doc_values: usado para sorting y otras operaciones que no requieren un inverted index
  mirar más abajo ## doc_values

Cuando se hace un borrado, es "soft", solamente se marca ese documento como borrado y se ignora cuando se hacen las búsquedas.

Un update que hae un overwrite, simplemente se marcará para borrar el viejo y se reutilizará el ID para el nuevo doc.

## Segment merge
Cada cierto tiempo, se crean un nuevo segmento copiando únicamente los documentos válidos (los que no han sido borrados).
Tras ese proceso ya podemos borrar, de verdad, los segmentos antiguos.


Force merge
POST my_index/_forcemerge
POST my_refresh_test/_forcemerge?max_num_segments=1
  especificar que queremos como máximo un segmento
  Sin especificar esto, si hacemos un force merge Lucene decidirá que segmentos mergear (según tamaño, etc)
Debemos evitar llamarlo. Estamos jodiendo el scheduler que se encarga de esto.
En el caso de usarlo, asegurarnos que solo lo usamos en índices que no tendrán write operations en el futuro.
Puede ser útil ejecutarlo antes de un backup, para reducir el tamaño final que vamos a almacenar.


## doc_values
Si queremos hacer un sort por un text field no podremos, porque el text se ha troceado en tokens y ya no tenemos el texto original.
Si lo necesitamos podemos hacer:
  fielddata:
    puede ser muy costoso para la heap
    lo podemos activar al definir el mapping (o modificando el mapping una vez existe). No hace falta reindexar:
      "message": {
        "type": "text",
        "fielddata": true
      }
    Desactivarlo tras el uso que hayamos necesitado
  doc values
    almacena los valores en una forma column-oriented, lo que permite hacer sorting y aggregations
    los doc values no existen para los analyzed strings, por que los hemos tokenizado antes y no tendría sentido.

Podemos desactivar el doc_value para un field para ahorrar disk space y tener faster indexing. A cambio no podremos hacer sorting o aggregations. (No es una buena idea, tal vez luego queramos hacer sort o agg)
"http_version": {
  "type": "keyword",
  "doc_values": false
}




# Search operation
Un cliente se conecta a uno cualquier de los nodos del cluster y pregunta por el top 10 de una query.
Ese nodo será el coordinating node para esa query.
Query phase, se pregunta a todos los shards (eligiendo el primary o replica)
  Dentro de cada shard, se tiene que consultar cada segment.
Cada nodo hace localmente la query y contesta al nodo coordinating.
Todos los nodos contestan al nodo coordinating con los IDs encontrados y las sort values de los top hits.
El nodo coordinating mergea estos valores y crea una lista global de todos los resultados.
Ahora el nodo coordinating conoce los IDs de los documentos que necesita y donde están, los coge y se los pasa al cliente.


## _score
Se calcula localmente en cada shard
Se puede forzar el calculo de forma global, pero es muy costoso (solo para pruebas o pequeños data sets)
GET blogs/_search?search_type=dfs_query_then_fetch



# Responses

## _shards
Si hacemos CRUD, nos retorna algo tipo:
"_shards": {
 "total": 2,
 "successful": 2,
 "failed": 0
}

total: how many shard copies (primary and replica shards) the index operation should be executed on
successful: the number of shard copies the index operation successfully executed on
failed: the number of shard copies the index operation failed on
failures: in case of failures, an array that contains related errors

Si total != successful, tenemos un problema
No estaremos retornando toda la info que podríamos.


Si hay un error tendremos un array "failures" que explicará el problema.
También lo logueará en el log.


Si hacemos una búsqueda tendremos una respuesta tipo:
"_shards": {
 "total": 47,
 "successful": 47,
 "skipped": 0,
 "failed": 0
}

total: the number of shards the search should be executed on
successful: the number of shards the search succeeded on
skipped: the number of shards that cleverly avoided search execution because they contain data which cannot possibly match the query
failed: the number of shards the search failed on
failures: in case of failures, an array that contains related errors
