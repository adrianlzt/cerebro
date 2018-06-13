Estado del cluster
curl localhost:9200/_cluster/health\?pretty

Shards sin asignar?
curl "http://localhost:9200/_cat/shards?v&h=index,shard,prirep,state,unassigned.reason" | grep -v STARTED

Explicación:
curl "localhost:9200/_cluster/allocation/explain?pretty"

Si el cluster ha intentado inicializar el shard mas de n veces (5 por defecto), deja de intentarlo y el comando anterior devuelve una salida que contiene "shard has exceeded the maximum number of retries [5] on failed allocation attempts". Para solucionar este problema, una vez solucionado el problema de espacio o lo que sea, sencillamente forzar que lo intente de nuevo:
curl -X POST "localhost:9200/_cluster/reroute?retry_failed=true"


Discos por encima del watermark (default 90%) en los data nodes?
Limpiar indices viejos



# OutOfMemory
https://discuss.elastic.co/t/large-size-of-hprof-files-on-data-nodes/18004/2
https://www.elastic.co/blog/a-heap-of-trouble
Genera un dump. En los logs aparece:
java.lang.OutOfMemoryError: Java heap space
Dumping heap to java_pid1.hprof ...

Si estamos en docker nos puede llenar la partición /

Parece que se puede desactivar quitando de la JVM:
-XX:+HeapDumpOnOutOfMemory
