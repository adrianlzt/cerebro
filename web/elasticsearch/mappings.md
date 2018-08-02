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

Granular, tal vez no es más util romper el campo en varios campos más pequeños? Por ejemplo, una version (6.2.1) en major:6, minor:2, bugfix:1

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



# Actualizar mapping / update
PUT my_index/_mapping/_doc
{
  "properties": {
    "name": {


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
Si queremos que se reindexen los nuevos usar update_by_query (mirar update.md)



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

### Ranges
Campo que almacena un rango de datos.
Tipos de datos soportados:
  integer_range
  float_range
  long_range
  double_range
  date_range
  ip_range

Cuando indexemos un field de este tipo tendremos que indexarlo de la siguiente manera (pensar si queremos gt, gte, lt, lte):
  "miles_travelled": {
    "gt": 0,
    "lte": 25
  }

Para buscar mirar query/ranges.md

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





# Analyzed fields
https://www.elastic.co/guide/en/elasticsearch/reference/2.4/mapping-types.html#_multi_fields

Si queremos poder buscar full-text en una string esta debe ser "analyzed". La contrapartida es que no podremos usar este campo para hacer sorting o agregaciones (excepto usando scripts, pero es más lento. Mirar ejemplo en query/aggregations.md).


Por defecto cuando se detecta el tipo de cada field se marca como "analyzed field", de modo que si el campo es "valor-otra-cosa" lo partirá en tres trozos.
Si no queremos que haga esto tendremos que modificar ese field para que no lo analice. Esto se hace con la mapping API.

No se puede cambiar el "datatype" de un field si ya tiene datos indexados.

Podemos usar elasticdump para reindexar la información.



# Dynamic mappings / templates
https://www.elastic.co/guide/en/elasticsearch/reference/current/dynamic-mapping.html
https://www.elastic.co/guide/en/elasticsearch/reference/current/dynamic-templates.html

Decidir que hacer basado en:
  - field datatype (autodetectado por ES)
  - el nombre del field (o un regex)
  - el path de un field (no suele usarse porque es facil que cambie)

Cuando se haga el match, se añadirá el campo en el mapping.

Ejemplo, si detectamos una string, convertirla en keyword:
PUT test2{
  "mappings": {
    "_doc": {
      "dynamic_templates": [
        {
          "my_string_fields": {
            "match_mapping_type": "string",
            "mapping": {
              "type": "keyword"
            }

Seleccionando por nombre (suponiendo que todos nuestros float empiezan por "f_"):
"my_float_fields": {
  "match": "f_*",
  "mapping": {
    "type": "float"
  }



# Templates
https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-templates.html
Para definir mappings a priori apuntando a un nombre de índice que aparecerá en un futuro, por ejemplo: logs-*

PUT _template/logs_template
{
  "index_patterns": "logs-*",
  "order": 1,
  "settings": {
    "number_of_shards": 4,
    "number_of_replicas": 1
  },
  "mappings": {
    "_doc": {
      "properties": {
        "@timestamp": {
          "type": "date"
        }
      }
    }
  }
}

Podemos testearlo creando un indice que cumpla el index_pattern y consultando su _mapping despues.


## Cascading
Se puede definir "order" en los templates.
Un order 5 hará override de los order menores.
Típicamente tendremos: 1, 10 y 100


# Strict / dynamic feature
dynamic=strict
  solo dejamos indexar datos que están en el mapping, fallará el indexado (error 400)

dynamic=false
  si tenemos campos que no están en el mapping, dejamos pasar el documento, pero no indexando esos campos (estarán en _source, pero no tendran indices ni aparecerán en el mapping)

dynamic=true (default)
  se actualiza el mapping si encontramos nuevos fields


PUT blogs/_doc/_mapping
{
  "dynamic": "strict"
}


# ignore malformed
https://www.elastic.co/guide/en/elasticsearch/reference/current/ignore-malformed.html
Una vez tenemos un field ya definido, si llega un tipo de dato que no cuadra, ES rechaza el documento.
Podemos poner "ignore_malformed" a nivel de índice, o de un field en particular, para ignorar esos fields con tipo de dato incorrecto pero seguir indexado el resto del documento.

Al crear un índice podemos especificar que aplique esa opción para todo (no podremos modificarlo en un índice existente):
PUT my_index
{
  "settings": {
    "index.mapping.ignore_malformed": true
  },
  ...
}

También podemos actualizar el mapping.
Parece que no funciona para types text o types object.
Para ese caso (object vs otro tipo) tendremos que hacer un enabled:false al campo, no permitiendo buscar ni agregar por él, aunque si apareerá en el _source
https://discuss.elastic.co/t/force-an-object-type-into-a-text-field/118609/4


# _meta
Meter metadata en un índice.
PUT blogs/_mapping/_doc{
  "_meta": {
    "blog_mapping_version": "2.1"
  }
}


# Type Properties

## index
Evitar que un documento sea indexado. Esto quiere decir que no se puede buscar, pero si podemos usarlo para sort o aggregate
Cargamos menos el heap, usamos el cache de disco del OS.
"mappings":{
   "doc":{
      "properties":{
         "http_version":{
            "type":"keyword",
            "index":false
         }

## disabled/enabled
Ni se indexa, ni se puede usar para sort o aggregate.
Lo usaremos solo cuando no queremos usar alguna parte del JSON enviado.

## _all
Deprecated a partir de la 6
Era un campo donde se concatenaban todos los campos.
Incrementa al doble el storage. Ralentiza búsquedas.
Si queremos desactivarlo para una ES 5.x:
PUT blogs{
   "mappings":{
      "_doc":{
         "_all":{
            "enabled":false
         },


## copy_to
Copiar valores to otro field. El valor estará en el field original y en el definido en copy_to.
Al hacer un GET del documento no veremos el campo donde estamos haciendo el copy_to
Esto usará más espacio.
Puede ser útil en caso de que estemos haciendo búsquedas con varios OR, lo simplificamos a hacer una única búsqueda contra el campo generado con copy_to.

Ejemplo, componer un solo campo con todos los valores de una definición de sitio:
"region_name": "Victoria",
"country_name": "Australia",
"city_name": "Surrey Hills"
->
"locations_combined"


"mappings": {
  "_doc": {
    "properties": {
      "region_name": {
        "type": "keyword",
        "copy_to": "locations_combined"
      },
      "country_name": {
        "type": "keyword",
        "copy_to": "locations_combined"
      },
      "city_name": {
        "type": "keyword",
        "copy_to": "locations_combined"
      },
      "locations_combined": {
        "type": "text"
      }



# Indexing data, detalles

## null values
Cuidado con indexar documentos a los que les faltan campos. Siempre mejor definirlos a null.
Podemos dar un valor por defecto a valores null (que no se verá al hacer un get, pero afectará al hacer agregaciones)

  "course_rating": {
    "type": "integer",
    "coarce": false,
    "null_value": 1.0
  }


## coercing
Por defecto ES intenta convertir las values al tipo de dato del campo.
Ejemplo, tipo long
 4 -> 4, ok
 "3" -> 3, ok
 4.5 -> 4, ok

"mappings": {
  "_doc": {
    "properties": {
      "rating": {
        "type": "long",
        "coerce": false
      }

Con este nuevo mapping "3" y 4.5 devolverán un error al intentar indexar
