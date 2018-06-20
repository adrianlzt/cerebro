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



# Search operation
Un cliente se conecta a uno cualquier de los nodos del cluster y pregunta por el top 10 de una query.
Ese nodo será el coordinating node para esa query.
Query phase, se pregunta a todos los shards (eligiendo el primary o replica)
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
