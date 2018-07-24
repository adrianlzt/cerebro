Para consultar la API lo mejor es usar las "Dev tools" de Kibana.
Nos da una web donde lanzar las peticiones de forma sencilla, con un poco de autocompletado

POST, esperamos respuesta del server (por ejemplo, tras indexar un doc, que nos pase un id)
PUT, metemos datos a ES sin esperar respuesta


# CAT api
https://www.elastic.co/guide/en/elasticsearch/reference/current/cat.html

Api con formato para humanos (en vez de JSON)

Formato general:
/_cat/xxx

Consultar que apis tenemos disponibles:
GET /cat/

Verbose (muestra la cabecera):
/_cat/xxx?v

Mostrar columnas:
/_cat/xxx?help

Solo mostrar ciertas columnas:
/_cat/xxx?h=ip,port,name

Cambiar formato de los datos de salida (https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#_number_values):
/_cat/xxx?bytes=b  (b, kb, mb, gb, tb, pb)
/_cat/xxx?time=b   (d, h, m, s, ms, micros, nanos)
/_cat/xxx?size=b   (`` single, k, m, g, t, p)

Cambiar formato de salida:
/_cat/xxx?format=json  (json, yaml, smile, cbor)

Ordenar:
/_cat/xxx?s=campo:desc,otrocampo

Filtrar que mostrar (https://www.elastic.co/guide/en/elasticsearch/reference/6.3/common-options.html#common-options-response-filtering):
?filter_path=hits.hits._source.title,hits.hits._source.author
?filter_path=routing_table.indices.**.state
  para coger todos los dicts de ese nivel y seguir filtrando por debajo
?filter_path=-_shards
  eliminar un campo
?filter_path=metadata.indices.*.state,-metadata.indices.logstash-*


Flat settings:
GET twitter/_settings?flat_settings=true
  devuelve las settings como index.version.created, en vez de en diccionarios


