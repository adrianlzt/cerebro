Mirar x-pack.md, tiene un módulo de Monitoring que almacena datos y los grafica.
Recomendado montar un segundo cluster para monitorizar.
Podemos configurar alarmas con Alert

https://github.com/ViaQ/watches-cli
App en python para obtener estadisticas sobre ES
pip install watches
watches cluster_health --url https://localhost:9200 --cacert admin-ca --cert admin-cert --key admin-key
cluster_state
cluster_stats
nodes_stats
nodes_info
indices_stats
nodes_hotthreads
just_nodes_stats
just_indices_stats


# APIs para monitorizar el estado

Node Stats: _nodes/stats
            _nodes/nombreNodo/stats
            _nodes/stats/jvm
            _nodes/nombreNodo/stats/jvm
            _nodes/nombreNodo/stats/indices/docs
Cluster Stats: _cluster/stats

Index Stats: my_index/_stats

Pending Cluster Tasks API: _cluster/pending_tasks
  tareas cluster-level que no se han ejecutado aún. Suele estar vacío. Tenemos que mirar que no haya tareas que su time_in_queue_millis sea superior a 100ms
  seguramente tendremos otros problemas primero, por ejemplo una alta latencia en el cluster


https://www.elastic.co/guide/en/elasticsearch/reference/6.4/tasks.html#_current_tasks_information
GET _tasks?detailed
  tasks ejecutándose actualmente
  por defecto agrupa por nodos, podemos cambiar la agrupación por tasks parents o por nada: GET _tasks?group_by=parents  (o =none)
  un número interesante es running_time_in_nanos para tareas de indexación/búsqueda mostrando que esa tarea tiene problemas
  podemos parar las tasks, pero no se paran al instante. Las búsquedas tiene distintos checkpoints donde miran si las han matado.
  podemos preguntar por una task determinada: _tasks/oTUltX4IQMOUUVeiohTt8A:124
  por las tasks child de un parent: _tasks?parent_task_id=oTUltX4IQMOUUVeiohTt8A:123
  filtrar por action: _tasks?actions=*search&detailed
GET _cat/tasks?v&s=running_time_ns:desc
  en formato tabla, ordenadas por las mas costosas

Cancelar actions
POST _tasks/oTUltX4IQMOUUVeiohTt8A:12345/_cancel
POST _tasks/_cancel?nodes=nodeId1,nodeId2&actions=*reindex


Limitar globalmente el timeout de las búsquedas a 1m (no retroactivo)
PUT /_cluster/settings?flat_settings=true
{
    "transient" : {
        "search.default_search_timeout" : "1m"
    }
}



También podemos usar las APIs _cat para ver la información mas human-friendly.
_cat/nodes
_cat/pending_tasks
_cat/health




Importante, de los nodos data vigilar su USE (utilization/saturation/errors) de CPU, memoria y disk I/O.

Que los índices no estén en read only (se hayan puesto por superar en algún momento cluster.routing.allocation.disk.watermark.flood_stage)


Espacio global del cluster (total, libre, disponible):
watches --url https://localhost:9200 --cacert admin-ca --cert admin-cert --key admin-key cluster_stats | jq '.nodes.fs'
  libre: espacio libre en disco (como lo que ve df)


Ocupación por shard:
curl "https://localhost:9200/_cat/shards?bytes=b" | sort -nk6
curl -s --cacert admin-ca --cert admin-cert --key admin-key "https://localhost:9200/_cat/shards?h=index,docs,store&bytes=b" | sort -nrk3 | numfmt --to=iec --field 2,3 | head

Evitar llenado de los discos
Mirar opciones cluster.routing.allocation.disk.watermark.low, cluster.routing.allocation.disk.watermark.high
En ES6 también cluster.routing.allocation.disk.watermark.flood_stage para evitar seguir escribiendo en un disco que está llegando a su límite.
En ES<6, cuidado con tener el cluster lleno y seguir escribiendo. Si no hay más hueco en el cluster, podremos acabar llenando los discos con los shards que tengamos. Los parámetros de arriba nos protegerán para no meter nuevos shards o mover los que tengamos a nodos con espacio libre, pero si no hay espacio de manera global no nos protegen.


Heap memory usada por cada fieldata:
https://www.elastic.co/guide/en/elasticsearch/reference/2.4/cat-fielddata.html
curl "https://localhost:9200/_cat/fielddata?v"


Logs de ES:
/elasticsearch/logging-es/logs/logging-es.log (rota con .YYYY-MM-DD)
/elasticsearch/logging-es/logs/logging-es_deprecation.log
/elasticsearch/logging-es/logs/logging-es_index_indexing_slowlog.log
/elasticsearch/logging-es/logs/logging-es_index_search_slowlog.log

Monitorizar mensajes de:
[WARN ]
[ERROR]
[FATAL]

El nodo master será el que tenga los logs interesantes.
Los que no sean mastar también tendrán información, pero menos relevante.

Monitorizar mensajes de ¿warn/error? donde nos esté avisando que en las queries no se está devolviendo toda la info (sección _shards con failures)

Monitorizar búsquedas/inserciones lentas: https://www.elastic.co/guide/en/elasticsearch/reference/current/index-modules-slowlog.html


Errores que veo en logging-es.log (parecen errores de conexión por fallos de los usuarios):
[2017-10-06 11:42:53,535][WARN ][com.floragunn.searchguard.configuration.PrivilegesEvaluator] logstash-* does not exist in cluster metadata
[2017-10-06 11:45:23,934][WARN ][rest.suppressed          ] path: //.operations.2017.10.06/_search, params: {index=.operations.2017.10.06, search_type=count}
Failed to execute phase [query], all shards failed
[2017-10-06 11:38:02,170][WARN ][indices.breaker.fielddata] [fielddata] New used memory 3230878335 [3gb] for data of [message] would be larger than configured breaker: 2556061286 [2.3gb], breaking
[2017-10-06 07:38:46,620][ERROR][com.floragunn.searchguard.http.SearchGuardHttpServerTransport] [American Samurai] SSL Problem Received fatal alert: decrypt_error
javax.net.ssl.SSLException: Received fatal alert: decrypt_error
[2017-10-06 07:47:15,078][WARN ][com.floragunn.searchguard.configuration.PrivilegesEvaluator] _all does not exist in cluster metadata
[2017-10-05 08:34:47,298][ERROR][com.floragunn.searchguard.http.SearchGuardHttpServerTransport] [American Samurai] SSL Problem Received fatal alert: certificate_unknown
javax.net.ssl.SSLException: Received fatal alert: certificate_unknown
[2017-10-05 08:28:24,435][ERROR][com.floragunn.searchguard.http.SearchGuardHttpServerTransport] [American Samurai] SSL Problem illegal change cipher spec msg, conn state = 6, handshake state = 1
javax.net.ssl.SSLException: illegal change cipher spec msg, conn state = 6, handshake state = 1



Una métrica interesante podría ser cuanto tiempo tarda en constestar para una información a priori conocida.
Por ejemplo, cuando tarda en hacer una agregación con una subagregación sobre un índice con 5000 documentos.
Midiendo el tiempo de respuesta cada x podemos hacernos una idea como esta yendo el cluster


Vigilar que no haya trazas duplicadas.
No se muy bien como se podría hacer, pero en openshift, agregando logs con fluentd tuvimos un problema de que ciertas trazas estaban duplicadas 10000 veces.
https://qbox.io/blog/minimizing-document-duplication-in-elasticsearch
La idea es hacer una agregación "term" sobre el campo que marca la duplicidad (este tendremos que elegirlo nosotros)
Parece que no se puede aplicar sobre "Analyzed Field", que suele ser el message.


Vigilar que la máquina no swapee:
https://www.elastic.co/guide/en/elasticsearch/guide/current/heap-sizing.html#_swapping_is_the_death_of_performance

ES llegando a su límite de memoria?
https://www.elastic.co/guide/en/elasticsearch/guide/current/heap-sizing.html#heap-sizing

Vigilar que no llegue al número máximo de FDs
https://www.elastic.co/guide/en/elasticsearch/guide/current/_file_descriptors_and_mmap.html





https://www.elastic.co/guide/en/elasticsearch/reference/current/cluster-nodes-stats.html
GET /_nodes/stats
GET /_nodes/nodeId1,nodeId2/stats

https://www.elastic.co/guide/en/elasticsearch/reference/current/cluster-stats.html
curl -XGET 'http://localhost:9200/_cluster/stats?pretty'

Si tenemos certs:
curl -v --key es_key.pem --cert es_cert.pem 'https://172.30.180.163:9200/_cluster/stats?pretty=true'

https://www.elastic.co/guide/en/elasticsearch/reference/current/cluster-health.html
GET _cluster/health
https://localhost:9200/_cluster/health?pretty=true'
mirar problemas.md

Health en estado columnas
https://172.30.180.163:9200/_cat/health?v


Health: red
RED: some shards are not assigned, which means that your data is not fully available.
RED: Damnit. Some or all of (primary) shards are not ready.
YELLOW: Elasticsearch has allocated all of the primary shards, but some/all of the replicas have not been allocated.
GREEN: Great. Your cluster is fully operational. Elasticsearch is able to allocate all shards and replicas to machines within the cluster.

Para entender porque tenemos unassigned shards:
https://www.elastic.co/guide/en/elasticsearch/reference/current/cluster-allocation-explain.html
https://www.elastic.co/blog/red-elasticsearch-cluster-panic-no-longer
http://chrissimpson.co.uk/elasticsearch-yellow-cluster-status-explained.html


Mirar que shards estan unassigned:
curl 'https://172.30.180.163:9200/_cat/shards' | grep UNASSIGNED



# Thread pool queues
Many cluster tasks (bulk, index, get, search, etc.) use thread pools to improve performance
Delante de estos threads hay colas.
Cuando las colas están llenas, se contesta un 429 al cliente

Tenemos distintos thread pools para cada tipo de tarea.
Se pueden modificar los parámetros, pero es muy raro tener que modificarlos.

GET _nodes/thread_pool
  vemos que tipos de thread pools hay y el número de ellos y de la cola
GET _nodes/stats/thread_pool
  en el momento de la query, como están los thread pools
  queue y active: point in time (valor en el momento de la query)
  rejected, completed, largest: valor total (se va incrementando)

GET _cat/thread_pool?v


# hot_threads
Most active thread por nodo (nos devuelve java classes)
Útil si somos desarrolladores de java, si no dificil de entender.

GET _nodes/hot_threads
GET _nodes/nombreNodo/hot_threads


# slow log
https://www.elastic.co/guide/en/elasticsearch/reference/current/index-modules-slowlog.html

Captura info sobre operaciones sobre índices que toman mucho tiempo.
Cada nodo registra las operaciones lentas sobre los shards que tiene en su nodo (_tasks nos dará una visión más global).
Los distintos niveles los configuramos según el tiempo que tardan en ejecutarse las operaciones.
Se crea un nuevo fichero "slowlog.log" o similar en el log/ dir
Se puede configurar los thresholds por indexing, searching, etc.
CUIDADO! se puede exponer información sensible en este log

Para queries lentas podemos relanzarlas con profiling para intentar ver por qué va lenta (query/profiling.md)

Configurado en log4j2.properties, se puede configurar para enviar a stdout (por ejemplo si estamos usando ES en docker)

Modificar en caliente (podemos quitar "my_index" para que se aplique para todo)

PUT my_index/_settings{
  "index.indexing.slowlog": {
    "threshold.index": {
      "warn": "10s",
      "info": "5s",
      "debug": "2s",
      "trace": "0s"  (esto activa para todas las trazas)
    },
    "level": “trace",
    "source" : 1000
  }
}
