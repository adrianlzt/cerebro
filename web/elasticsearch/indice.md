mirar conceptos.md para entender el significado.
mirar mappings.md para más info, campos, detalles, etc
ES usa inverted index (ver bbdd/indices.md) para almacenar los datos.
Básicamente es una tabla donde para cada entrada nos dice donde está el fichero que contiene esa palabra


# Estado del cluster
curl http://localhost:9200/_status

# Stats del index
GET my_index/_stats


# Listar todos los índices:
curl "https://localhost:9200/_cat/indices?v"
curl "https://localhost:9200/_cat/indices/.oper*?v"
  indices que empiecen por ".oper"

curl 'localhost:9200/_cat/indices?v&health=yellow&pretty'
  indices en estado yellow (alguna de sus replicas no estan asignadas)
  en red, uno o varios de sus primary shards no estan asinagdos

curl "https://localhost:9200/_cat/shards?v&h=index,shard,prirep,state,unassigned.reason" | grep -v STARTED
  consultar que shards no estan allocated y por que https://www.elastic.co/guide/en/elasticsearch/reference/current/cat-shards.html#reason-unassigned

curl "localhost:9200/_cluster/allocation/explain?pretty"
  explicación de porque hay shards sin asignar (version >=5)

GET _cat/indices?bytes=gb&h=index,store.size&s=store.size:desc
  ya ordenado por tamaño en GB (storage, ocupación, gigas)

Si solo queremos de ciertos indices:
GET _cat/indices/nombre*?bytes=gb&h=index,store.size&s=store.size:desc




# Crear indice
mirar mappings.md
curl -XPUT 'http://localhost:9200/twitter/' -d '{}'
curl -XPUT 'http://localhost:9200/twitter/' -d '{ "settings" : { "index" : { "number_of_shards" : 3, "number_of_replicas" : 2 } } }'
mirar insertar_datos.md
El número de shards no se podrá cambiar a posteriori (aunque podríamos reindexar o usar alias para apuntar a otros indices).

PUT logs-2017-07-04
{
  "settings": {
    "index": {
      "number_of_shards": 1,
      "number_of_replicas": 1
    }
  }
}



# Get index
curl "https://localhost:9200/.operations.2017.10.01"

curl "https://localhost:9200/.operations.2017.10.01/_mappings" | jq '.[].mappings | to_entries[] | .key'
  mappings de un indice (mirar mappings.md para más info sobre ellos)

curl "https://localhost:9200/.operations.2017.10.01/_mappings/com.redhat.viaq.common" | jq '.[].mappings[].properties | to_entries[] | .key'
  properties de un mapping (cada propertie puede tener subproperties)
  Si queremos indagar en algun campo seguiremos como: jq '.[].mappings[].properties.kubernetes.properties | to_entries[] | .key'

# Contenido de un indice:
curl http://localhost:9200/logstash-iris-adrian-2015.06.19/_search/?pretty



# Stats de un índice:
curl http://localhost:9200/logstash-2015.06.09/_stats/?pretty
En _all, primaries, docs, count tenemos el número total de documentos indexados.
En _all, primaries, store, size_in_bytes tenemos el tamaño total de los documentos indexados.
Nos saca las estadísticas tres veces, una para primaries, otra para total y otra para el nombre del índice.

Se puede preguntar por varios índices separados por comas.





# Parámetros
Podemos modificar los parámetros de un índice:

Cambiar el número de réplicas de un índice a 0
curl -XPUT localhost:9200/vehicles/_settings -d'
{
    "number_of_replicas": 0
}'


Si el cluster tenía varios nodos, los shards están repartidos entre los nodos, y al quitar las réplicas, si un nodo de cae, dejará de encontrar la información que se encuentra en esos shards ahora desconectados.




# Borrar índices
curl -XDELETE 'http://localhost:9200/logstash-2014.03.02/'

curl -XDELETE 'http://localhost:9200/logstash-*'


# Aliases
Una buena práctica es siempre usar alias para los nombres de los indices que usarán las aplicaciones.
Si usamos los aliases para escribir, solo pueden apuntar a un indice.
Se pueden poner filtros, que un alias solo pueda llegar a ciertos documentos, pero puede ser confuso para los usuarios.
Si creamos un alias a indice-* y luego creamos más índices indice-*, esos nuevos no estarán apuntados por el alias.

Parece (https://www.elastic.co/guide/en/elasticsearch/reference/6.4/search.html#search-concurrency-and-parallelism) que elasticsearch optimiza la búsqueda para que no tenga mucho impacto el lanzar una query con un filtro de tiempo sobre un índice que no tiene ese rango temporal.
Unas pruebas que he hecho me salían unos 0.08ms el coste por abrir esos índices no necesarios (sobre unos 100ms en los índices donde se realizaban búsquedas con datos).

GET _alias/
  ver los alias existentes

POST _aliases
{
  "actions": [
    {
      "add": {
        "index": "INDEX_NAME",
        "alias": "ALIAS_NAME"
      }
    },
    {
      "remove": {
        "index": "INDEX_NAME",
        "alias": "ALIAS_NAME"
      }
    }
  ]
}

Otra forma más simple:
PUT /{index}/_alias/{name}


# Rollover
https://www.elastic.co/blog/managing-time-based-indices-efficiently
https://www.elastic.co/guide/en/elasticsearch/reference/master/indices-rollover-index.html

API para hacer cambios a un alias que usemos para escribir. Al llamar a la API, se analizará el índice actualmente apuntdo por el alias, si cumple las condiciones (edad o número de documentos) se creará un índice nuevo y se moverá el alias.

Curator puede lanzar los rollover: https://www.elastic.co/guide/en/elasticsearch/client/curator/current/rollover.html
Cuidado con limitar por tamaño, podría darse el caso de un incremento temporal

Curator puede borrar los índices por fecha realizando una consulta a cada uno de los índices para ver que fechas tiene almacenadas: https://www.elastic.co/guide/en/elasticsearch/client/curator/current/filtertype_age.html#_literal_field_stats_literal_based_ages

Si queremos borrar índices sin fecha, podemos consultar que fecha máxima y mínima tienen almacenados con esta query:
GET NOMBREINDICE/_search
{
  "size": 0,
  "aggs": {
    "max_time": {
      "max": {
        "field": "@timestamp"
      }
    },
    "min_time": {
      "min": {
        "field": "@timestamp"
      }
    }
  }
}



# Open/Close
https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-open-close.html
Podemos cerrar un índice para reducir el consumo. No prodemos buscar sobre él.
Reduciremos el consumo de los shards al mínimo.


# Internals
Como se indexan

Inverted index (para búsquedas) + doc values (para aggregations)

Si marcamos un field como index:false (en el mapping), no podremos buscar por el valor, pero podremos hacer aggregations.

Si queremos que un doc se pueda buscar pero no aggregations, podemos poner en el mapping: doc_values:false

Podemos ahorrar espacio y CPU/mem.


Field data desactivado por defecto. Esto es que no podemos usar analyzed text para hacer aggregations, sorting, etc.
Para esto usaremos los subfields .keyword
Se puede activar al vuelo modificando el mapping.
Es arriesgado, nos podemos comer toda la memoria del nodo.
Normalmente nos soltará un warning, pero no siempre. y nos puede tirar el nodo.

Lo activaremos como
properties: {
 fieldB: {
   fielddata: true,
   type: text,
   analyzer: snowball


## Almacenamiento
elasticsearch/data/nodes/0/indices/XXX
XXX será el id del índice (que podemos ver haciendole un GET)

Dentro de ese directorio tendremos otro dir que tiene por nombre un número, que índica el número de shard que está almacenado en ese nodo.
Si tenemos replicas tendremos un dir con el número del shard (viendo el nombre del dir no podemos saber si es primary o replica)
Aqui vemos que no es posible meter primary y shard en el mismo nodo.

Serie de comandos que se van a ejecutar: test_creating_index.txt

Creamos un índice con refresh 1h (para controlar nosotros cuando hacerlo), no tiene segments (según la API de segments), ficheros de un shard:
index/write.lock
index/segments_2
_state/state-0.st
translog/translog-2.tlog
translog/translog-1.ckp
translog/translog-1.tlog
translog/translog.ckp

Indexamos un documento, sigue sin segments. Aparecen dos nuevos ficheros respecto a el listado anterior (tamaño 0):
index/_0.fdt  The stored fields for documents
index/_0.fdx  Contains pointers to field data
Hasta ahora ES tiene almacenados los datos en el buffer de memoria (tal vez representado en "GET _nodes/stats" -> buffer_pools?
Parece que algo ha crecido translog-2.tlog

Forzamos refresh, aparece un segment. No commiteado. Aparecen nuevos ficheros:
index/_0.cfe  An optional "virtual" file consisting of all the other index files for systems that frequently run out of file handles
index/_0.cfs  An optional "virtual" file consisting of all the other index files for systems that frequently run out of file handles
index/_0.si   Stores metadata about a segment

Segmentos:
index           shard prirep ip         segment generation docs.count docs.deleted  size size.memory committed searchable version compound
my_refresh_test 0     p      172.17.0.2 _0               0          1            0 4.4kb        2212 false     true       7.3.1   true



Forzamos flush. Ahora lo marca como commited. El fichero segments ahora es segments_3. Aqui ya se puede analizar con Luke (tenemos los datos en los ficheros)
Aparecen nuevos ficheros del translog:
translog/translog-2.ckp
translog/translog-3.tlog

Segmentos (a cambiado a commited=true):
index           shard prirep ip         segment generation docs.count docs.deleted  size size.memory committed searchable version compound
my_refresh_test 0     p      172.17.0.2 _0               0          1            0 4.4kb        2212 true      true       7.3.1   true


Forzamos un merge. Desaparecen los fichero _0 y aparecen muchos _1. Segments pasa a segments_5:
index/_1.fdx
index/_1_Lucene70_0.dvd
index/_1.si
index/_1.fdt
index/_1.dii
index/_1_Lucene50_0.doc
index/_1_Lucene50_0.pos
index/_1.nvd
index/_1.fnm
index/_1_Lucene50_0.tip
index/_1_Lucene70_0.dvm
index/_1.dim
index/_1_Lucene50_0.tim
index/_1.nvm

Segmentos, sube el número de segment y de generation. Compound pasa a false:
index           shard prirep ip         segment generation docs.count docs.deleted  size size.memory committed searchable version compound
my_refresh_test 0     p      172.17.0.2 _1               1          1            0 4.5kb        2212 true      true       7.3.1   false



Explicación de cada fichero https://lucene.apache.org/core/7_3_0/core/org/apache/lucene/codecs/lucene70/package-summary.html#package.description
