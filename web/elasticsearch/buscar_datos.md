https://www.elastic.co/guide/en/elasticsearch/reference/current/search.html
https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html

Para que se pueda buscar por un campo, este tiene que estar indexado en Lucene (el motor de búsqueda por debajo de ES).
Para acelerar las cosas, ES cachea las peticiones a lucene (escrituras a disco). Por defecto se hace flush cada segundo.


Búsqueda de campos particulares:
curl 'localhost:9200/vehicles/tv/_search?q=_id:one'
curl 'localhost:9200/_search?q=_id:one'
curl 'localhost:9200/vehicles/_search?q=make:pontiac'

En campos anidados:
curl 'localhost:9200/vehicles/_search?q=driver.name:Walter'

Búsqueda de un campo cualquiera:
curl 'localhost:9200/vehicles/_search?q=pontiac'

Todos los elementos de un índice:
curl localhost:9200/vehicles/_search

Las búsquedas con case-insensitive.
Se busca por palabras, por lo tanto 'ponti' no encontrará 'Pontiac'
Podemos usar wildcards: '*onti*' encontrará 'Pontiac'.

También podemos hacer búsquedas proveyendo un JSON:
curl localhost:9200/vehicles/_search/?pretty -d'
{
    "query": {
        "prefix": {
            "driver.name": "walt"
        }
    }
}'

## Querys mas complejas

Busca que make=pontiac y el año > 2000
curl localhost:9200/vehicles/_search -d'
{
    "query": {
        "bool": {
            "must": [
                {
                    "match": {
                        "make": "pontiac"
                    }
                },
                {
                    "range": {
                        "year": {
                            "gte": 2000
                        }
                    }
                }
            ]
        }
    }
}'


Busca que make=pontiac y sugiere que el año sea > 2000
Esto provoca que las entradas tenga un 'score' diferente. Mayor score es devuelto primero.
curl localhost:9200/vehicles/_search -d'
{
    "query": {
        "bool": {
            "must": {
                "match": {
                    "make": "pontiac"
                }
            },
            "should": {
                "range": {
                    "year": {
                        "gte": 2000
                    }
                }
            }
        }
    }
}'



Las búsquedas permiten buscar términos similares (car,auto,automobile,truck), o buscar sinónimos (en el vídeo no se explica como)


Si queremos solo mostrar ciertos campos del documento:
https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-source-filtering.html

curl 'http://172.16.1.43:9200/logstash-iris-telematics-2015.06.09/_search?&scroll=1m&size=1000' -d '{"_source" : "messa*" , "query": { "match": { "offset": "13638288" } } }' | python -m json.tool


Es distinto que usar el 'fields' o 'partial_fields'
https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-fields.html#search-request-fields
Si usamos eso los campos los devuelve en un subapartado:

curl 'http://172.16.1.43:9200/logstash-iris-telematics-2015.06.09/_search?&scroll=1m&size=1000' -d '{"fields" : [ "message"], "query": { "match": { "offset": "13638288" } } }' | python -m json.tool
                "_type": "beitelematics_log",
                "fields": {
                    "message": [
                        "2015-06-10T01:50:07.490+0200 | INFO | pd-core | load | [875676716988873216_p0] loaded ios (/mnt/phonedrive/ZQQwwKOsD1R9GXGSqw8Ir3WI.zip) of user '336948cddd8cd5a2fe24fa736c3492a18cbb6dc9' in 6.098s"




curl 'http://172.16.1.43:9200/logstash-iris-telematics-2015.06.09/_search?&scroll=1m&size=1000' -d '{"partial_fields" : { "partial1": { "include" : "message" }}, "query": { "match": { "offset": "13638288" } } }' | python -m json.tool
                "_type": "beitelematics_log",
                "fields": {
                    "partial1": [
                        {
                            "message": "2015-06-10T01:50:07.490+0200 | INFO | pd-core | load | [875676716988873216_p0] loaded ios (/mnt/phonedrive/ZQQwwKOsD1R9GXGSqw8Ir3WI.zip) of user '336948cddd8cd5a2fe24fa736c3492a18cbb6dc9' in 6.098s"

