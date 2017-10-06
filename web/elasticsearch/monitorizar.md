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

Espacio global del cluster (total, libre, disponible):
watches --url https://localhost:9200 --cacert admin-ca --cert admin-cert --key admin-key cluster_stats | jq '.nodes.fs'
  libre: espacio libre en disco (como lo que ve df)


Ocupación por shard:
curl "https://localhost:9200/_cat/shards?bytes=b" | sort -nk6
curl -s --cacert admin-ca --cert admin-cert --key admin-key "https://localhost:9200/_cat/shards?h=index,docs,store&bytes=b" | sort -nrk3 | numfmt --to=iec --field 2,3 | head

Una métrica interesante podría ser cuanto tiempo tarda en constestar para una información a priori conocida.
Por ejemplo, cuando tarda en hacer una agregación con una subagregación sobre un índice con 5000 documentos.
Midiendo el tiempo de respuesta cada x podemos hacernos una idea como esta yendo el cluster


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
