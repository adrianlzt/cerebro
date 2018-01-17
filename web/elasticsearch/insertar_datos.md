https://www.elastic.co/guide/en/elasticsearch/reference/2.3/docs-index_.html

Los datos se insertan con peticiones HTTP POST
Se actualizan con PUT (deberemos especificar el elemento exacto: localhost:9200/vehicles/tv/one)

curl -H "Content-Type: application/json" -XPOST "localhost:9200/vehicles/tv/?pretty" -d'
{
    "color": "green",
    "driver": {
        "born": "1959-09-07",
        "name": "Walter White"
    },
    "make": "Pontiac",
    "model": "Aztek",
    "value_usd": 5000.0,
    "year": 2003
}'

índice: 'vehicles'
document-type: 'tv'
id: 'one'

En el payload (el parámetro -d nos permite cargar este tipo de información) meteremos un documento JSON

Nos confirma la operación con (resulado de otro insert distinto):
{
  "_index" : "pruebaalt390",
  "_type" : "tweet",
  "_id" : "2",
  "_version" : 1,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "failed" : 0
  },
  "created" : true
}

_version es un campo interno de ES para la replicación


Si queremos meter un timestamp tendremos que ver en el mapping que format se ha puesto.
Generalmente se usa el campo @timestamp
Un formato tipico es epoch_millis.
curl localhost:9200/test/test/ -XPOST -d '{"name":"pepe", "@timestamp": 1509010812000}'

El formato de fecha por defecto es:
2017-10-25T09:48:05.419953Z


# Borrar
https://www.elastic.co/guide/en/elasticsearch/reference/2.3/docs-delete.html
curl -XDELETE "https://localhost:9100/INDICE/TYPE/ID?pretty"


# Modify
https://www.elastic.co/guide/en/elasticsearch/reference/current/_modifying_your_data.html

Si hacemos un PUT sobre un doc que ya existe lo estaremos reemplazando



# Update
https://www.elastic.co/guide/en/elasticsearch/reference/2.3/docs-update.html
curl -XPUT "https://localhost:9100/alt390/internalusers/0?pretty" -d '{"usuario": {"hash": "xxxx"}}'
curl -XPOST "https://localhost:9100/alt390/internalusers/0/_update?pretty" -d '{"doc": {"usuario2": {"hash": "222"}}}'

Creo un documento con id=0.
Luego se añade otro doc al mismo documento. Si usasemos la misma clave en el doc ("usuario"), estaríamos modificando el valor anterior (simple recursive merge, inner merging of objects, replacing core "keys/values" and arrays)
El resultado final:
  "usuario": {
    "hash": "xxxx"
  },
  "usuario2": {
    "hash": "222"
  }


## Update usando un script
mirar scripts.md para ver como definirlos

POST test/type1/1/_update
{
    "script" : {
        "source": "ctx._source.counter += params.count",
        "params" : {
            "count" : 4
        }
    }
}

ctx._source es la base del documento test/type1/1
counter es una clave de este documento, la que vamos a modificar sumadole 4


ctx tiene disponibles estas variables:
_index
_type
_id
_version
_routing
_parent
_now (current timestamp)


Para añadir un elemento a un array (en este caso que se llama "tags"):
ctx._source.tags.add(params.tag)

Añadir un nuevo campo (aunque esto es más fácil con "doc"):
"script" : "ctx._source.new_field = 'value_of_new_field'"

Borrar un campo:
"script" : "ctx._source.remove('new_field')"

Condicional:
 "script" : {
     "source": "if (ctx._source.tags.contains(params.tag)) { ctx.op = 'delete' } else { ctx.op = 'none' }",
     "lang": "painless",
     "params" : {
         "tag" : "green"
     }
 }



## Upsert
Actuar distinto si el documeto ya existe (insert) o si es una actualizacion (update)
  "script" : {
      "source": "ctx._source.counter += params.count",
      "lang": "painless",
      "params" : {
          "count" : 4
      }
  },
  "upsert" : {
      "counter" : 1
  }

Si el documeno es nuevo, se almacena el contenido que cuelga de la clave "upsert".
En caso de que ya exista, se aplica el script.





# Bulk
https://www.elastic.co/guide/en/elasticsearch/reference/5.5/docs-bulk.html

curl -s -H "Content-Type: application/x-ndjson" -XPOST localhost:9200/_bulk --data-binary "@requests"

El formato del fichero será tipo:
{"index":{"_index":"shakespeare","_type":"act","_id":0}}
{"line_id":1,"play_name":"Henry IV","speech_number":"","line_number":"","speaker":"","text_entry":"ACT I"}
{"index":{"_index":"shakespeare","_type":"scene","_id":1}}
{"line_id":2,"play_name":"Henry IV","speech_number":"","line_number":"","speaker":"","text_entry":"SCENE I. London. The palace."}
{"index":{"_index":"shakespeare","_type":"line","_id":2}}
{"line_id":3,"play_name":"Henry IV","speech_number":"","line_number":"","speaker":"","text_entry":"Enter KING HENRY"}

