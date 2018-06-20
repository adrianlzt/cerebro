https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping.html
Field types: https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-types.html
query/fields.md para ver los tipos de los datos del indice

UN SOLO MAPPING POR INDICE
https://www.elastic.co/guide/en/elasticsearch/reference/6.x/removal-of-types.html
Indices created in Elasticsearch 6.0.0 or later may only contain a single mapping type. Indices created in 5.x with multiple mapping types will continue to function as before in Elasticsearch 6.x. Mapping types will be completely removed in Elasticsearch 7.0.0.
El problema con multiples types por indice es que cada campo es compartido entre todos los types. Si el campo "status", por ejemplo, en un sitio es str y en otro int, esto no funciona.
Otro problema era que todos los campos de un type estaba ocupando hueco en otros types que no usasen esos campos.

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
En general es mejor práctica definir los mappings porque el guessing de ES puede fallar.
Por ejemplo, "true" lo va a reconocer como una string en vez de como un boolean (las comillas hace que se confunda)


# Leer mapping
curl localhost:9200/vehicles/_mapping

Detalle de field de un mapping concreto:
curl "localhost:9200/tete/_mapping/user/field/msg?pretty"




# Crear mapping
Típicamente podemos coger el autogenerado y retocarlo.
Subiremos un documento con todos los campos que queremos a un indice con nombre XXX_tmp. Obtendremos el mapping y lo pegaremos en el Dev Console.
Tendremos que borrar la primera key, con el nombre del index.
Ahí iremos modificando. Y lo guardaremos ya sobre el indice bueno.
Un cambio que haremos será definir para los text fields si los dejamos como text o como keyword.
También podemos poner un field de texto y pasarlo por distintos analyzers, por ejemplo en distintos idiomas.
Dates, tendremos que especificar el formato. Podemos especificar que el formato puede estar en diferentes formatos: basic_data||epoch_millis (los probará en orden)
Tambien chequear si tenemos locations (GeoLocations).
También tener cuidado con el tipo de datos que seleccionamos con los números. Por ejemplo si ponemos un precio a un short int (ejemplo), si intentamos hacer la suma de muchos elementos, la suma se verá truncada al máximo de ese valor. Tenemos que elegir los tipos de datos pensando en que vamos a querer calcular en ese valor.

Arrays? Tal vez nos vienen una string con valores separados por coma y lo queremos meter como un array.

curl localhost:9200/test/test -XPUT -d '{"mappings": {"test":{"properties": {"name":{"type":"text"},"@timestamp":{"type":"date"}}}}}'
El formato por defecto de fecha es tipo: 2017-10-25T09:48:05.419953Z

curl localhost:9200/test/test -XPUT -d '{"mappings": {"test":{"properties": {"name":{"type":"text"},"@timestamp":{"type":"date","format":"epoch_millis"}}}}}'
mappings con name:text y timestamp:date(epoch_millis)


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



## Tipos de datos
Simples:
  text: for full text (analyzed) strings
  keyword: for exact value strings
  date: string formatted as dates, or numeric dates
  integer types: like byte, short, integer, long
  floating-point numbers: float, double, half_float, scaled_float
  boolean
  ip: for IPv4 or IPv6 addresses
Hierarchical Types: like object and nested
Specialized Types: geo_point, geo_shape and percolator
Plus range types and more


## Multi-fields
https://www.elastic.co/guide/en/elasticsearch/reference/current/multi-fields.html

Un determinado field puede indexarse de varias maneras distintas para poder usarlo de varias formas.
Por ejemplo, una string se puede indexar como "string" y a la vez como "keyword" para poder hacer full text search y también usarlo en agregaciones o sorting (por defecto es lo que hace ES, ignorando por encima de 256 chars)
"properties": {
  "city": {
    "type": "text",
    "fields": {
      "raw": {
        "type":  "keyword"
      }
    }
  }
}

Podemos usar "city.raw" (raw sera un sub-field de city)

Multi field son dos subfields, uno usando otro analyzer
"title": {
  "type": "text",
  "fields": {
    "keyword": {
      "type": "keyword",
      "ignore_above": 256
    },
    "my_analyzer": {
      "type": "text",
      "analyzer": "mio"
    }
  }
}



# Actualizar mapping
curl -XPUT 'localhost:9200/tele/_mapping/user?pretty' -d '
      "properties": {
         "msg" : {
            "type" : "text",
            "fields" : {
              "keyword" : {
                "type" : "keyword",
                "ignore_above" : 256
              }
            }
          }
      }
'
Actualizamos el type "user" del index "tele" para modificar el field "msg" y añadirle un subfield tipo keyword.
Solo los documentos indexados a partir de ese momento tendrán ese nuevo subfield.md





# Analyzed fields
https://www.elastic.co/guide/en/elasticsearch/reference/2.4/mapping-types.html#_multi_fields

Si queremos poder buscar full-text en una string esta debe ser "analyzed". La contrapartida es que no podremos usar este campo para hacer sorting o agregaciones (excepto usando scripts, pero es más lento. Mirar ejemplo en query/aggregations.md).


Por defecto cuando se detecta el tipo de cada field se marca como "analyzed field", de modo que si el campo es "valor-otra-cosa" lo partirá en tres trozos.
Si no queremos que haga esto tendremos que modificar ese field para que no lo analice. Esto se hace con la mapping API.

No se puede cambiar el "datatype" de un field si ya tiene datos indexados.

Podemos usar elasticdump para reindexar la información.



# Dynamic mappings
https://www.elastic.co/guide/en/elasticsearch/reference/current/dynamic-mapping.html
