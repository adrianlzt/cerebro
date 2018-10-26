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

Realizando GC todo el rato? Mirar los logs.
Cuando está fallando vemos trazas cada 10" tipo:
[2018-08-17T07:10:33,532][WARN ][o.e.m.j.JvmGcMonitorService] [NODO] [gc][3587755] overhead, spent [12.5s] collecting in the last [13s]
[2018-08-17T07:10:51,471][WARN ][o.e.m.j.JvmGcMonitorService] [NODO] [gc][old][3587756][138006] duration [17.3s], collections [1]/[17.9s], total [17.3s]/[16.9h], memory [7.3gb]->[7.3gb]/[7.9gb], all_pools {[young] [4.1mb]->[28.2mb]/[532.5mb]}{[survivor] [0b]->[0b]/[66.5mb]}{[old] [7.3gb]->[7.3gb]/[7.3gb]}

Parece que esto sucede cuando se llena el heap (o próximo a llenado ~96%)?



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




# Diagnosis
https://github.com/elastic/support-diagnostics

Herramienta en java para generar un fichero de diagnosis del estado del cluster
Bajarnos el .zip de la última release.
Ejecutarlo mejor en uno de los nodos del cluster (porque también va a recoger info genérica del estado del SO)
La versión de la heramienta de diagnosis no tiene que ver con la versión de ES

Lo que ejecuta:
08:20:22 INFO  Currently running query: _alias?pretty
08:20:22 INFO  Currently running query: _cat/allocation?v
08:20:25 INFO  Currently running query: _cat/master?format=json
08:20:25 INFO  Currently running query: _cat/nodes?v&h=ip,heap.percent,ram.percent,cpu,load_1m,load_5m,load_15m,node.role,master,name,nodeId,diskAvail
08:20:30 INFO  Currently running query: _cat/indices?v
08:20:35 INFO  Currently running query: _cat/segments?v
08:20:39 INFO  Currently running query: _cat/health?v
08:20:39 INFO  Currently running query: _cat/pending_tasks?v
08:20:39 INFO  Currently running query: _cat/aliases?v
08:20:39 INFO  Currently running query: _cat/thread_pool?v
08:20:39 INFO  Currently running query: _cat/fielddata?v
08:20:43 INFO  Currently running query: _cat/shards
08:20:48 INFO  Currently running query: _cluster/health?pretty
08:20:48 INFO  Currently running query: _cluster/pending_tasks?pretty&human
08:20:48 INFO  Currently running query: _cluster/settings?pretty&flat_settings
08:20:49 INFO  Currently running query: _cluster/settings?include_defaults&pretty&flat_settings
08:20:50 INFO  Currently running query: _cluster/state?pretty&human
08:20:54 INFO  Currently running query: _cluster/stats?pretty&human
08:20:58 INFO  Currently running query: _count?pretty
08:21:28 INFO  count did not complete normally.
08:21:28 INFO  Currently running query: _stats?pretty&human
08:21:36 INFO  Currently running query: _mapping?pretty
08:21:37 INFO  Currently running query: _cat/master?format=json
08:21:38 INFO  Currently running query: _nodes/hot_threads?threads=10000
08:21:42 INFO  Currently running query: _nodes/stats?pretty&human
08:21:50 INFO  Currently running query: /_nodes/stats/indices/fielddata?pretty=true&fields=*
08:21:50 INFO  Currently running query: _cat/fielddata?format=json&bytes&pretty
08:21:54 INFO  Currently running query: _cat/plugins?format=json
08:21:54 INFO  Currently running query: _cat/recovery?v
08:21:58 INFO  Currently running query: _recovery?pretty
08:22:02 INFO  Currently running query: _cat/shards?format=json&bytes=b&pretty
08:22:10 INFO  Currently running query: _segments?pretty&human
08:22:12 INFO  Currently running query: _settings?pretty&human
08:22:13 INFO  Currently running query:
08:22:13 INFO  Currently running query: _nodes?pretty&human
08:22:13 INFO  Currently running query: _template?pretty
08:22:13 INFO  Currently running query: _cat/nodeattrs
08:22:13 INFO  Currently running query: _tasks?pretty&human&detailed
08:22:14 INFO  Currently running query: _ingest/pipeline/*?pretty&human
08:22:14 INFO  Currently running query: _cluster/allocation/explain?pretty
08:22:14 INFO  No data retrieved.
08:22:14 INFO  Currently running query: _cluster/allocation/explain?include_disk_info=true&pretty
08:22:14 INFO  No data retrieved.
08:22:14 INFO  Currently running query: _shard_stores?pretty
08:22:14 INFO  Currently running query: _license?pretty
08:22:14 INFO  Currently running query: _xpack/usage?pretty&human
08:22:44 INFO  xpack did not complete normally.
08:22:44 INFO  Currently running query: _xpack/ml/datafeeds?pretty
08:22:44 INFO  Currently running query: _xpack/ml/anomaly_detectors?pretty
08:22:45 INFO  Currently running query: _xpack/ml/anomaly_detectors/_stats?pretty
08:23:15 INFO  ml_stats did not complete normally.
08:23:15 INFO  Currently running query: _watcher/stats/_all
08:23:15 INFO  Currently running query: _xpack/security/user?pretty
08:23:15 INFO  Endpoint does not exist.
08:23:15 INFO  Currently running query: _xpack/security/role?pretty
08:23:15 INFO  Endpoint does not exist.
08:23:15 INFO  Currently running query: /_xpack/security/role_mapping?pretty
08:23:15 INFO  Endpoint does not exist.
08:23:18 INFO  Finished querying SysInfo.
08:23:18 INFO  Checking the supplied hostname against the node information retrieved to verify location. This may take some time...
08:23:18 INFO  Processing log files.
08:23:18 INFO  Finished processing logs.
08:23:18 INFO  Running: top -b -n1
08:23:18 INFO  Running: netstat -an
08:23:18 INFO  Running: ss
08:23:18 INFO  Running: ps -ef
08:23:18 INFO  Running: top -b -n1 -H
08:23:19 INFO  Running: uname -a -r
08:23:19 INFO  Running: cat /proc/cpuinfo
08:23:19 INFO  Running: iostat -c -d -x -t -m 1 5
08:23:19 INFO  Running: sar -A
08:23:19 INFO  Running: sysctl -a
08:23:19 INFO  Running: dmesg
08:23:19 INFO  Running: cat /sys/kernel/mm/transparent_hugepage/enabled
08:23:19 INFO  Running: cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor
08:23:19 INFO  Running: cat /etc/security/limits.conf
08:23:19 INFO  Running: /opt/jdk-10.0.2/bin/jstack 1
08:23:30 INFO  Running: cat /proc/1/limits
08:23:30 INFO  Running: /opt/jdk-10.0.2/bin/jps -l -m -v
