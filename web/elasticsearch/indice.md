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
El número de shards no se podrá cambiar a posteriori.



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
Se pueden poner filtros, que un alias solo pueda llegar a ciertos documentos, pero puede ser confuso para los usuarios.
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
