https://www.elastic.co/guide/en/elasticsearch/reference/2.3/docs-index_.html

Mejora la performance.
Enviar entre 50 y 150 en cada bulk.
No pasar de 500.

Si en la petición se nos meten errores, perderemos los beneficios de la performance.


Los datos se insertan con peticiones HTTP POST (sin especificar el id). Con PUT podemos insertar docs especificando un id.
Se actualizan con PUT (deberemos especificar el elemento exacto: localhost:9200/vehicles/tv/one)
Si intentamos crear un documento en un index que no existe, se autogenera. Posiblemente queremos deshabilitar esto en producción.

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
  "_index": "test",
  "_type": "test",
  "_id": "1",
  "_version": 1,
  "result": "created",
  "_shards": {
    "total": 2,
    "successful": 1,
    "failed": 0
  },
  "_seq_no": 0,
  "_primary_term": 1
}


_version es un campo interno de ES para la replicación
Las versiones antiguas no se almacenan (se marcan para borrado). Si queremos almacenar versiones antiguas tendremos que encargarnos nosotros de cambiarlo de índice o almacenarnlo en otro sitio de alguna manera.

El campo "result" nos dirá si hemos creado un nuevo doc ("created") o actualizado uno ya existente ("update")

Podemos usar el endpoint _create que solo permitirá crear nuevos elementos (no override).
Nos devolverá un error 409 si el doc ya existe.
POST indice/type/id/_create


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

Solo actualiza, o añade, lo que le pasemos.
Internamente, lee el doc, crea uno nuevo con los campos leído más los añadidos y marca para borar el anterior.

curl -XPUT "https://localhost:9100/alt390/internalusers/0?pretty" -d '{"usuario": {"hash": "xxxx"}}'
  creamos el doc

curl -XPOST "https://localhost:9100/alt390/internalusers/0/_update?pretty" -d '{"doc": {"usuario2": {"hash": "222"}}}'
  lo actualizamos

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



## update_by_query
https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-update-by-query.html
Si modificamos el mapping de nuestro indice para agregar nuevos subfields, para que se generan los índices ejecutaremos:
POST blogs_fixed/_update_by_query

También podemos usarlo para pasar un indice por una pipeline (mirar ingest_node.md)


Ejemplo filtrando que actualizar con una query y usando un script:
POST twitter/_update_by_query
POST twitter/_update_by_query
{
  "script": {
    "source": "ctx._source.likes++",
    "lang": "painless"
  },
  "query": {
    "term": {
      "user": "kimchy"
    }
  }
}



## Reindex Batch Field
Si vamos a reindexar cosas, para tener control de que docs se han reindexado, no empezar de nuevo en caso de fallo y controlar problemas con las versiones lo mejor es usar un campo custom.
No me queda muy claro si este ejemplo funcionaría, pero la idea es actualizar los docs y como último paso marcar en un bit que se han reindexado correctamente.
Y en las siguientes ejecucciónes filtrar para solo actuar sobre los que no han sido procesados aún.

PUT blogs_fixed/doc/_mapping
{
 "properties": {
   "reindexBatch": {
     "type": "short"
   }
 }
}

POST blogs_fixed/_update_by_query{
  "query": {
    "bool": {
      "must_not": [
        {
          "range": {
            "reindexBatch": {
              "gte": 1
            }
          }
        }
      ]
    }
  },
  "script": {
    "source": """
if(ctx._source.containsKey("content")) {
  ctx._source.content_length = ctx._source.content.length();
} else {
  ctx._source.content_length = 0;
}
ctx._source.reindexBatch=1;
"""
  }
}




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



# Delete
DELETE my_blog/_doc/1

Un delete también sube el _version
