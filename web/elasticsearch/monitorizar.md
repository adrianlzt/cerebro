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
curl -XGET 'http://localhost:9200/_cluster/stats?human&pretty'

https://www.elastic.co/guide/en/elasticsearch/reference/current/cluster-health.html
GET _cluster/health
https://localhost:9200/_cluster/health?pretty=true'
mirar problemas.md


Para entender porque tenemos unassigned shards:
https://www.elastic.co/guide/en/elasticsearch/reference/current/cluster-allocation-explain.html
