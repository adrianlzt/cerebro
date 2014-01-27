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
curl localhost:9200/vehicles/_search -d'
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
