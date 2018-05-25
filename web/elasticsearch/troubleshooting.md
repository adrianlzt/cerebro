Estado del cluster
curl localhost:9200/_cluster/health\?pretty

Shards sin asignar?
curl "http://localhost:9200/_cat/shards?v&h=index,shard,prirep,state,unassigned.reason" | grep -v STARTED

Explicación:
curl "localhost:9200/_cluster/allocation/explain?pretty"


Discos por encima del watermark (default 90%) en los data nodes?
Limpiar indices viejos
