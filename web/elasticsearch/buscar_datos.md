https://www.elastic.co/guide/en/elasticsearch/reference/current/search.html
https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html

Para que se pueda buscar por un campo, este tiene que estar indexado en Lucene (el motor de búsqueda por debajo de ES).
Para acelerar las cosas, ES cachea las peticiones a lucene (escrituras a disco). Por defecto se hace flush cada segundo.

Para ver como generar queries más complejas una solución fácil es jugar con kibana y ver la query que genera.


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

Unos pocos elementos de un indice:
curl "https://localhost:9200/.operations.2017.10.01/_search?size=10"
  si ponemos "&from=1000", me dará los 10 siguientes a partir del 1000

Las búsquedas con case-insensitive.
Se busca por palabras, por lo tanto 'ponti' no encontrará 'Pontiac'
Podemos usar wildcards: '*onti*' encontrará 'Pontiac'.

También podemos hacer búsquedas proveyendo un JSON:
curl localhost:9200/vehicles/_search/?pretty -d'
{
    "query": {
        "term": {
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





## Filtros por fecha
https://www.elastic.co/guide/en/elasticsearch/reference/5.6/query-dsl-range-query.html
{
    "query": {
        "range" : {
            "date" : {
                "gte" : "now-1d/d",
                "lt" :  "now/d"
            }
        }
    }
}

{
    "query": {
        "range" : {
            "born" : {
                "gte": "01/01/2012",
                "lte": "2013",
                "format": "dd/MM/yyyy||yyyy"
            }
        }
    }
}


{
    "query": {
        "range" : {
            "timestamp" : {
                "gte": "2015-01-01 00:00:00",
                "lte": "now",
                "time_zone": "+01:00"
            }
        }
    }
}




## Sort
https://www.elastic.co/guide/en/elasticsearch/reference/5.6/search-request-sort.html

{
    "sort" : [
        { "post_date" : {"order" : "asc"}},
        "user",
        { "name" : "desc" },
        { "age" : "desc" },
        "_score"
    ],
    ...
}





# Aggregations

## Contar cuentos elementos hay para cada valor distinto de un field:
curl "https://localhost:9200/.operations.2017.10.01/_search" -d '{"fields":["aggregations"], "aggs": {"genres": {"terms": {"field":"hostname"}} }}'
  ...
	"buckets": [
    {
      "key": "MA02P",
      "doc_count": 78570548
    },
    {
      "key": "AP01P",
      "doc_count": 77955426
    },
  ...

