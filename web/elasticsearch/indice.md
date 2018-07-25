mirar conceptos.md para entender el significado.
mirar mappings.md para más info, campos, detalles, etc
ES usa inverted index (ver bbdd/indices.md) para almacenar los datos.
Básicamente es una tabla donde para cada entrada nos dice donde está el fichero que contiene esa palabra


# Estado del cluster
curl http://localhost:9200/_status


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

curl -s "localhost:9200/_cat/indices?bytes=mb&h=index,store.size" | sort -nk2
  ocupación total de cada índice en MB (primary + replicas). Para obtener solo el peso de los primary consultar por "pri.store.size"

GET _cat/indices?bytes=gb&h=index,store.size&s=store.size:desc
  ya ordenado por tamaño en GB



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

Dentro del dir de cada shard tendremos:
_state
_state/state-0.st
index                     (aqui se almacenan los segmentos)
index/segments_2
index/write.lock
index/_0.fdt              (fdt, fdx: estos son temporales mientras no esta creando el segmento)
index/_0.fdx

index/_0.cfs              (cfs, si, cfe: estos tres ficheros son un segmento almacenado en disco, seguro? O son los siguientes?)
index/_0.si
index/_0.cfe

index/_2.nvm              (ficheros tras un forcemerge. Estos son los ficheros de Lucene de verdad?)
index/_2_Lucene50_0.tip
index/_2.fdt
index/_2.fdx
index/_2.dii
index/_2_Lucene50_0.pos
index/_2.si
index/_2.dim
index/_2_Lucene50_0.doc
index/_2_Lucene50_0.tim
index/_2_Lucene70_0.dvm
index/_2.fnm
index/_2_Lucene70_0.dvd
index/_2.nvd

translog                  (transaction log)
translog/translog.ckp
translog/translog-1.tlog
