Estado del cluster
curl localhost:9200/_cluster/health\?pretty
  RED: algún primary shard no allocated
  YELLOW: todos los primary shards allocated, pero al menos un replica no lo está
  GREEN: todos los shards allocated

El estado es a 3 niveles: shard, index, cluster.
Cluster toma el estado del peor índice.
Index health tiene el estado del worst shard de ese indice


Query que espera hasta que el cluster se ponga en un estado:
GET _cluster/health?wait_for_status=yellow


Bajar al nivel de health de indices:
GET _cluster/health?level=indices

Health de un indice determinado:
GET _cluster/health/my_index

Bajar al nivel de health de shards (generalmente demasiados detalles):
GET _cluster/health?level=shards

Explicación
POST _cluster/allocation/explain

Explicación para un shard determinado:
GET _cluster/allocation/explain
{
  "index" : "my_index",
  "shard" : 0,
  "primary" : true
}

Shards sin asignar?
curl "http://localhost:9200/_cat/shards?v&h=index,shard,prirep,state,unassigned.reason" | grep -v STARTED


Si el cluster ha intentado inicializar el shard mas de n veces (5 por defecto), deja de intentarlo y el comando anterior devuelve una salida que contiene "shard has exceeded the maximum number of retries [5] on failed allocation attempts". Para solucionar este problema, una vez solucionado el problema de espacio o lo que sea, sencillamente forzar que lo intente de nuevo:
curl -X POST "localhost:9200/_cluster/reroute?retry_failed=true"


# Disco
Discos por encima del watermark (default 90%) en los data nodes? No permite crear nuevos indices diarios (por ejemplo de logstash o beats).
Limpiar indices viejos
GET _cat/nodes?v&h=name,node.role,heap.percent,cpu,load_1m,disk.used_percent,disk.avail,file_desc.percent&s=node.role


## read only
cluster.routing.allocation.disk.watermark.flood_stage
si sobrepasa este valor, ES pone en read only los índices que tengan al menos un shard en el nodo que cumpla está condición

Chequear indices en read only:
GET _all/_settings/index.blocks.read_only?flat_settings=true
GET _cluster/state/metadata?filter_path=metadata.indices.**.settings.index.blocks

Si se nos han puesto indices en readonly podemos ponerlos de nuevo en rw con:
PUT /nombreindice/_settings
{
  "index.blocks.read_only_allow_delete": null
}

O para todos los indices:
PUT _all/_settings
{
  "index.blocks.read_only_allow_delete": null
}



Si queremos forzar que no estén en read-only:
PUT _all/_settings
{
  "index": {
    "blocks.read_only": false,
    "blocks.read_only_allow_delete": false
  }
}

Y más tarde, tras comprobar que todo está correcto, podemos ponerlo a null para volver a dejar a ES la potestad de ponerlos en RO en caso de ser necesario.




Ver que búsquedas/inserciones lentas, slow log, mirar monitorizar.md

Tambien podemos mirar en
GET _tasks/ por tareas lentas (running_time_in_nanos)
Mirar monitorizar.md


# Thread pools
Mirar monitorizar.md


# Return code
429, ES saturado. Esta solicitando al cliente que le de un poco de tiempo para procesar datos.
Seguramente sea una queue de un thread pool lleno.


# OutOfMemory
https://discuss.elastic.co/t/large-size-of-hprof-files-on-data-nodes/18004/2
https://www.elastic.co/blog/a-heap-of-trouble
Genera un dump. En los logs aparece:
java.lang.OutOfMemoryError: Java heap space
Dumping heap to java_pid1.hprof ...

Si estamos en docker nos puede llenar la partición /

Parece que se puede desactivar quitando de la JVM:
-XX:+HeapDumpOnOutOfMemory



# Errores con queries
query_shard_exception: estamos intentando lanzar una query sobre varios indices donde los fields se llaman igual pero son de distinto tipo?
En este caso la query devuelve un 200, pero _shards.failed=5



# Heap / garbage collector
Problemas con picos en el garbage collector? Tal vez tenemos demasiado heap reservado. Probar a bajarlo.



# Responses

## Common HTTP Errors
Issue: Unable to connect
Reason: networking issue or cluster down
Action: check network status and cluster health

Issue: connection unexpectedly closed
Reason: node died or network issue
Action: retry (with risk of creating a duplicate document)

Issue: 4xx error
Reason: client error
Action: fix bad request before retrying

Issue: 429 error
Reason: Elasticsearch is too busy
Action: retry (ideally with linear or exponential backoff)

Issue: 5xx error
Reason: internal server error in Elasticsearch
Action look into Elasticsearch logs to see what is the issue




# Típicos problemas de performance
Intentar usar filter cuando sea posible para aprovechar el cache.

Agregaciones de demasiados documentos.
  filtrar que documentos vamos a usar para la agregación
  usar filtros detro de las agregaciones
  usar samplling
  cachear queries repetidas

Intentar usar ES como si fuese una bbdd SQL (model_data.md)

Demasiados shards, seguramente muchos shards pequeños. Intentar tener shards de tamaño hasta 40GB
Cuanto más shards, peor la performance de las queries.
El default de 5 shards por índice generalmente es un valor demasiado grande (parece que cambiarán este default en futuras versiones)

Scripting innecesario, sobre todo cuando se podrían hacer en index time en vez de en query time

Regular expressiones, sobre todo las que no dan un prefijo, que obliga a ES a analizar todos los valores.
Truco, si no podemos poner un prefijo, tal vez podemos indexar el valor "reversed" y asi tener prefijo:
  .*work -> krow.*
