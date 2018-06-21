Tenemos dos tipos de aggregations: metrics y buckets
Otras avanzadas: pipeline y matrix

GET logs_server*/_search
{
  "size": 0,  # no obtener resultados "hits"
  "aggs": {
    "nombre": {
      "avg": {
        "field": "response_size"
      }
    }
  }
}


Si los aggregations son muy costosos, una técnica que se suele utilizar es ejecutar el aggregation por la noche, almacenarnlo en un índice y consultar ese índice durante el día.
No es muy exacto, por que no tendremos lo datos en tiempo real, pero nos puede servir depende del caso.
O también podemos cachear resultados: https://www.elastic.co/guide/en/elasticsearch/reference/current/caching-heavy-aggregations.html



Para crear aggregations típicamente usaremos el "Visualize" de Kibana y luego miraremos la "Request" que genera.


# Metrics
https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics.html

Realizar cálculos matemáticos con los valores: max, min, mean, etc

https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-stats-aggregation.html
Típicamente usaremos "stats" (min, max, sum, count y avg)
"aggs": {
  "nombre": {
    "stats": {
      "field": "response_size"
    }
  }
}


# Cardinality
https://www.elastic.co/guide/en/elasticsearch/reference/6.3/search-aggregations-metrics-cardinality-aggregation.html
Contar cuantas apariciones de algo. Por ejemplo, cuantas IPs distintas visitan nuestra web.

GET logs_server*/_search
{
  "size": 0,
  "aggs": {
    "number_of_countries": {
      "cardinality": {
        "field": "geoip.country_name.keyword"
      }
    }
  }
}

El valor puede no ser exacto.
Podemos aumentar el valor de precision_threshold hasta 40.000 (por defecto es 3000) para intercambiar memoria por un valor más aproximado.


# Histogram
https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-histogram-aggregation.html
GET logs_server*/_search
{
  "size": 0,
  "aggs": {
    "runtime_histogram": {
      "histogram": {
        "field": "runtime_ms",
        "interval": 100
      }
    }
  }
}

Retornará todos los buckets necesarios para poner todos los datos del histograma.
CUIDADO con esto. Controlar que no nos vaya a devolver demasiados.
Podemos controlar con min_doc_count para evitar devolver buckets con pocos documentos.


## Date histogram
GET logs_server*/_search
{
  "size": 0,
  "aggs": {
    "logs_by_month": {
      "date_histogram": {
        "field": "@timestamp",
        "interval": "month"
      }
    }
  }
}

Por defecto el sort es _key ascending



# Nesting aggregations
Hacemos una aggregation y usamos el valor en otra aggregation.

GET logs_server*/_search
{
  "size": 0,
  "aggs": {
    "runtime_histogram": {
      "histogram": {
        "field": "runtime_ms",
        "interval": 100,
        "min_doc_count": 1000
      },
      "aggs": {
        "average_runtime": {
          "avg": {
            "field": "runtime_ms"
          }
        }
      }
    }
  }
}


date_histogram + stats
ET logs_server*/_search
{
  "size": 0,
  "aggs": {
    "logs_by_month": {
      "date_histogram": {
        "field": "@timestamp",
        "interval": "month"
      },
      "aggs": {
        "average_size": {
          "avg": {
            "field": "size"
          }
        }
      }
    }
  }
}

date_histogram + avg + sort
GET logs_server*/_search
{
  "size": 0,
  "aggs": {
    "logs_by_month": {
      "date_histogram": {
        "field": "@timestamp",
        "interval": "month",
        "order": {
          "average_runtime": "asc"  # fijarnos que estamos ordenado por un campo que estamos creando en la nested aggregation
        }
      },
      "aggs": {
        "average_runtime": {
          "avg": {
            "field": "runtime_ms"
          }
        }
      }
    }
  }
}




# Term aggregation
https://www.elastic.co/guide/en/elasticsearch/reference/6.3/search-aggregations-bucket-terms-aggregation.html
Nos genera buckets según los diferentes valores que vaya encontrando para un field (que no puede ser una string, pero si keyword)

GET logs_server*/_search
{
  "size": 0,
  "aggs": {
    "country_name_terms": {
      "terms": {
        "field": "geoip.country_name.keyword",
        "size": 5  # maximo 64000. Nos dará los resultados con más documentos
        "show_term_doc_count_error": true,  # esto nos devuelve un error por bucket (campo "doc_count_error_upper_bound" en cada bucket)
        "shard_size": 500  # esto acrecenta el size que se pide a cada shard. Mayor accuracy pero a costa de coste de CPU/mem
      }
    }
  }
}

Respuesta:
  "doc_count_error_upper_bound": 16223,
  "sum_other_doc_count": 620884,

Los valores son aproximados, en un rango +- doc_count_error_upper_bound (es el máximo error de todos los buckets)
Esto es debido a que los calculos se hacen localmente en cada shard. Cada shard devuelve el resultado para lo que tiene localmente almacenado.
Cuando solicitamos size=5, en realidad a cada shard va a pedir 5*1.5+10 (esto es el shard_size, que se puede forzar en la query)



# significant_crime_types
https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-significantterms-aggregation.html




## Contar cuentos elementos hay para cada valor distinto de un field:
Agregación por "genres" y solo devolvemos el campo de aggregations

curl "https://localhost:9200/.operations.2017.10.01/_search" -d '{"fields":["aggregations"], "aggs": {"1": {"terms": {"field":"hostname"}} }}'
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


Agregar por beat.hostname, sin devolver ningún hit y devolviendo todos los buckets:
GET adriinv/_search
{
  "size": 0,
  "aggs": {
    "0": {
      "terms": {
        "field": "beat.hostname",
        "size": 2147483647
      }
    }
  }
}



# Agregación por campos y por tiempo
curl "https://localhost:9200/.operations.2017.10.01/_search" -d '
{
  "fields":["aggregations"],
  "aggs": {
    "1" : {
      "terms": {"field":"hostname"},
      "aggs": { "2": {"date_histogram":{"field":"@timestamp", "interval": "1h"}}}
    }
  }
}'
  ...
  "buckets" : [ {
    "key" : "MA02P",
    "doc_count" : 78570548,
    "2" : {
      "buckets" : [ {
        "key_as_string" : "2017-10-01T10:00:00.000000+0000",
        "key" : 1506852000000,
        "doc_count" : 88477


Por defecto, si agregamos por terms, solo nos mostrará los mayores 10.
Podemos pedir más con "size: N" (N = 1 - 2147483647)
No podemos poner size:0




# Agregar por un campo text analyzed
CUIDADO! puede ser muy lento

curl "localhost:9200/INDICE/_search?pretty" -d '
{
  "_source":"aggs",
  "aggs": {
    "1": {
      "terms":{
        "script":"params[\"_source\"][\"msg\"]"
      }
    }
  }
}
'
