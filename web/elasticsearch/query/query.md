https://www.elastic.co/guide/en/elasticsearch/reference/current/search.html
https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html

Dos tipos de búsquedas (no se pueden combinar):
  Query string: fácil de usar, usando la URL
  Query DSL: haciendo un POST de un JSON donde especificamos la query que queremos

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

En varios incdices
GET index1,index2/_search

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


# Bool query
{
  "query": {
    "bool": {
      "must": [  # lo que pongamos aqui debe aparecer obligatoriamente. Cuenta para el _score
        {}
      ],
      "must_not": [  # estas queries NO deben aparecer en las respuestas
        {}
      ],
      "should": [  # si estas queries matchean, aportan al _score. Si solo definimos "should", él solo pondra un minimum_should_match de 1 entre las queries
        {}
      ],
      "should": {  # esto es si queremos hacer un "not should"
        "bool": {
          "must_not": {
            "match": {
              "title": "stack"
            }
          }
        }
      }
      "filter": [  # estas queries deben estar obligatoriamente en los documentos, pero no aporta al _score. Pueden aprovecharse del cache
        {}
      ]
    }
  }
}


Ejemplo:
{
 "query": {
   "bool": {
     "must": [
       {
         "match": {
           "content": "logstash"
         }
       },
       {
         "match": {
           "category": "engineering"
         }
       }
     ]
   }
 }
}



{
 "query": {
   "bool": {
     "must": {
       "match_phrase": {
         "content": "elastic stack"
       }
     },
     "should": {
       "match_phrase": {
         "author": "shay banon"  # no es obligatorio que aparezca, pero si aparece tendran el maximo score
       }
     }
   }
 }
}


Truco para potenciar el resultado de una phrase pero sin ser excluyente:
{
  "query": {
    "bool": {
      "must": {
        "match": {
          "content": "open data"
        }
      },
      "should": {
        "match_phrase": {
          "content": "open data"
        }
      }
    }
  }
}



## Filters
Se usa por ejemplo para los rangos de fechas. Donde no tiene sentido tener más o menos score. Solo queremos los documentos que estén dentro.

Los filtros pueden ser cacheados.
Como los filtros no se calcula el score esto ahorra memoria "heap"

Por ejemplo, si queremos filtrar por tags de unos posts de blogs, el filtro de tag seria un filter, y las palabras que buscasemos serían "must".




## Querys mas complejas

Busca que el campo "clock" sea > 1508927505 y < 1508927505
curl -u elastic:changeme "localhost:9200/dbl/_search?pretty" -d '{"query":{ "bool":{"must":[{"range":{"clock":{"gte":1508927505}}},{"range":{"clock":{"lte":1508927505}}}]}}}'

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



# Limitar campos
Si queremos solo mostrar ciertos campos del documento:
https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-source-filtering.html

curl 'http://172.16.1.43:9200/logstash-iris-telematics-2015.06.09/_search?&scroll=1m&size=1000' -d '{"_source" : ["messa*"] , "query": { "match": { "offset": "13638288" } } }'


FIELDS esta deprecated en 5.x
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



# Wildcard
No recomendado. Ineficiente.
Costoso, especialmente si ponemos un "*" o "?" al comienzo (le estamos obligando a entrar en todos los docs)
Al menos intentar darle un prefijo estatico

* = anything
? = any single character

GET blogs/_search{
  "query": {
    "wildcard": {
      "title.keyword": {
        "value": "* 5.*"
      }
    }
  }
}


# Regexp
https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-regexp-query.html#regexp-syntax
No usar.
Ineficiente, costoso!
Al menos intentar darle un prefijo estatico

GET blogs/_search{
  "query": {
    "regexp": {
      "title.keyword": ".*5\\.[0-2]\\.[0-9].*"
    }
  }
}


# Exists
Para chequear que el campo existe y no es null
GET blogs/_search {
  "query": {
    "exists": {
      "field": "locales"
    }
  }
}

Para chequear que no existe:
GET logs_server*/_search {
  "query": {
    "bool": {
      "must_not": {
        "exists": {
          "field": "geoip.region_name"
        }
      }
    }
  }
}

Tambien podríamos hacer "field": "geoip", que nos dirá si el object existe (sin tener que especificar un field)



# Script
Cuidado con el coste en performance!
Se ejecutará el script por cada hit.
Intentar hacerlo más eficientemente, por ejemplo usando un ingest pipeline o modelar los datos para que no nos haga falta.

Usando un script painless para chequear que el size de un array es mayor de 1:

GET blogs_fixed/_search{
  "query": {
    "bool": {
      "filter": {
        "script": {
          "script": {
            "source": "doc['locales'].size() > 1"
          }
        }
      }
    }
  }
}


Agregar fields al vuelo (se usa típicamente en Kibana para extraer campos de strings, etc):
GET blogs_fixed/_search{
  "script_fields": {
    "day_of_week": {
      "script": {
        "source": """
def d = new Date(doc['publish_date'].value.millis);
return d.toString().substring(0,3);
"""
      }
    }
  }
}

Por defecto no devolverá el "_source".
Si queremos obtenerlo pondremos:
GET blogs_fixed/_search {
  "_source": [],
  ...


Ejemplo usándolo para dividir dos campos (típico cuando tenemos el load1 y por otro lado el número de cpus)
script":"_value / doc[\"system.n_cpus\"].value"
Entero:
{"search_type":"query_then_fetch","ignore_unavailable":true,"index":["telegraf-2021.05.13"]}
{"size":0,"query":{"bool":{"filter":[{"range":{"@timestamp":{"gte":1620909560720,"lte":1620931160720,"format":"epoch_millis"}}},{"query_string":{"analyze_wildcard":true,"query":"measurement_name: system"}}]}},"aggs":{"3":{"terms":{"field":"tag.host","size":10,"order":{"_key":"desc"},"min_doc_count":0},"aggs":{"2":{"date_histogram":{"interval":"15s","field":"@timestamp","min_doc_count":0,"extended_bounds":{"min":1620909560720,"max":1620931160720},"format":"epoch_millis"},"aggs":{"1":{"avg":{"field":"system.load1","script":"_value / doc[\"system.n_cpus\"].value"}}}}}}}}
