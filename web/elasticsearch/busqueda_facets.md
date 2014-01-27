Busquedas para las que también se hace un análisis estadístico de los resultados.


Cuenta cuantos coches de cada marca hay, y la suma, valor, valor mínimo, máximo y media del precio
curl localhost:9200/vehicles/_search -d'
{
    "facets": {
        "vehicle_make": {
            "terms": {
                "field": "make"
            }
        },
        "vehicle_value": {
            "statistical": {
                "field": "value_usd"
            }
        }
    },
    "query": {
        "match_all": {}
    }
}'

