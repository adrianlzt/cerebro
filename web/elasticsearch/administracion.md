Si cambiamos el nombre del cluster los datos no permanecen.


Para "borrar la memoria" a elasticsearch:
rm -fr /var/lib/elasticsearch/NOMBRE-CLUSTER


Logs:
/var/log/elasticsearch/NOMBRE-CLUSTER.log
/var/log/elasticsearch/NOMBRE-CLUSTER_indexing_slowlog.log
/var/log/elasticsearch/NOMBRE-CLUSTER_search_slowlog.log


Consultar los índices que existe:
curl localhost:9200/_stats

Obtener las características de un índice:
curl -XGET 'http://localhost:9200/logstash-2013.11.06/_settings'

Borrar un índice:
curl -XDELETE 'http://localhost:9200/twitter/'

Crear un índice
curl -XPUT 'http://localhost:9200/twitter/'
