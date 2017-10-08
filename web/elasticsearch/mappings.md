https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping.html
Field types: https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-types.html

UN SOLO MAPPING POR INDICE
https://www.elastic.co/guide/en/elasticsearch/reference/6.x/removal-of-types.html
Indices created in Elasticsearch 6.0.0 or later may only contain a single mapping type. Indices created in 5.x with multiple mapping types will continue to function as before in Elasticsearch 6.x. Mapping types will be completely removed in Elasticsearch 7.0.0.

Si queremos seguir usando varios "types" por indice podemos hacerlo a mano. Creando el mapping index con los campos de todos los types que vayamos a usar y luego prefijando cada elemento con el tipo:
  INDEX/TYPE/MITIPO1-aaa
  INDEX/TYPE/MITIPO2-bbb


Mapping es definir como un documento, y los fields que contiene, son almacenados e indexados.
Por ejemplo nos sirve para marcar que strings deberán ser tratadas como "full text fields", que es un número, fecha, etc

ES genera automáticamente el 'mapping' de un índice a partir de los elementos que le pasemos.
Nos lo avisará en el log:
[vehicles] update_mapping [tv] (dynamic)

CUIDADO! con meter muchos documentos cada uno con un mapping distinto -> mapping explosion. Peligroso si ese índice puede tener muchos documentos.

Otra opción es generarlo a priori.


Podemos obtener el mapping con:
curl localhost:9200/vehicles/_mapping

Mapping de un type determinado
curl http://localhost:9200/iris-telematics-2015.06.10/_mapping/access_combined/?pretty

Detalle de field de un mapping concreto:
curl "localhost:9200/tete/_mapping/user/field/msg?pretty"

Si ES no genera correctamente el mapping, podemos suministrarlo al crear el índice.



# Crear mapping
curl -XPUT 'localhost:9200/my_index?pretty' -H 'Content-Type: application/json' -d'
{
  "mappings": {
    "user": { 
      "_all":       { "enabled": false  }, 
      "properties": { 
        "title":    { "type": "text"  }, 
        "name":     { "type": "text"  }, 
        "age":      { "type": "integer" }  
      }
    }
  }
}
'



# Analyzed fields
https://www.elastic.co/guide/en/elasticsearch/reference/2.4/mapping-types.html#_multi_fields

Si queremos poder buscar full-text en una string esta debe ser "analyzed". La contrapartida es que no podremos usar este campo para hacer sorting o agregaciones.


Por defecto cuando se detecta el tipo de cada field se marca como "analyzed field", de modo que si el campo es "valor-otra-cosa" lo partirá en tres trozos.
Si no queremos que haga esto tendremos que modificar ese field para que no lo analice. Esto se hace con la mapping API.

No se puede cambiar el "datatype" de un field si ya tiene datos indexados.

Podemos usar elasticdump para reindexar la información.
