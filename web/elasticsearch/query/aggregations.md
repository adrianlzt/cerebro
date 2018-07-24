https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-pipeline.html

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


Cuidado con los nested aggregations, más niveles, más gasto de memoria.

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




# Percentiles
https://www.elastic.co/guide/en/elasticsearch/reference/6.3/search-aggregations-metrics-percentile-aggregation.html

GET logs_server*/_search {
  "size": 0,
  "aggs": {
    "runtime_percentiles": {
      "percentiles": {
        "field": "runtime_ms"
      }
    }
  }
}

"runtime_percentiles": {
  "values": {
    "1.0": 0,
    "5.0": 88.00109639047503,
    "25.0": 95.00000000000001,
    "50.0": 103.37306961911929,
    "75.0": 159.88916204500126,
    "95.0": 685.1015874756147,
    "99.0": 4198.930939937213
  }
}


Se puede especificar que queremos en los resultados:
"percents" : [95, 99, 99.9]


# percentiles_ranks
También podemos hacer la pregunta al revés, pasar un valor y que nos diga el porcentaje:
https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-percentile-rank-aggregation.html
GET latency/_search
{
    "size": 0,
    "aggs" : {
        "load_time_ranks" : {
            "percentile_ranks" : {
                "field" : "load_time", ￼
                "values" : [500, 600]
            }
        }
    }
}



# top hits
https://www.elastic.co/guide/en/elasticsearch/reference/6.3/search-aggregations-metrics-top-hits-aggregation.html

Retornamos los 5 documentos más representativos para cada agregación (size:0 porque esto nos devuelve los docs que matchean la query, sin organización por buckets):
GET blogs/_search {
  "size": 0,
  "query": {
    "match": {
      "content": "logstash filters"
    }
  },
  "aggs": {
    "blogs_by_author": {
      "terms": {
        "field": "author.keyword"
      },
      "aggs": {
        "logstash_top_hits": {
          "top_hits": {
            "size": 5
          }
        }
      }
    }
  }
}



# missing
https://www.elastic.co/guide/en/elasticsearch/reference/6.3/search-aggregations-bucket-missing-aggregation.html

Buscar documentos que no tienen definidos estos campos:
GET logs_server*/_search{
  "size": 0,
  "aggs": {
    "missing_location": {
      "missing": {
        "field": "geoip.location"
      }
    },
    "missing_support": {
      "missing": {
        "field": "support"
      }
    }
  }
}

Nos devuelve dos aggregations distintas, cada una haciendo referencia a cada campo (geoip.location y support)
Se pueden preguntar por objectos (geoip.location sería un objeto, geoip.location.latitude seria un field)



# scripted aggregations
Aplicar un script para agregar sobre ese valor calculado.

GET blogs/_search {
  "size": 0,
  "aggs": {
    "blogs_by_day_of_week": {
      "terms": {
        "script": {
          "source": "doc['publish_date'].value.dayOfWeek"
        }
      }
    }
  }
}



# significant types
https://www.elastic.co/guide/en/elasticsearch/reference/6.3/search-aggregations-bucket-significantterms-aggregation.html

Buscar terms que son significativos para un contexto determinado, pero no en otros contextos.
Por ejemplo, Google es común para programadores y para todo el mundo (poco score)
StackOverflow es común para programadores y no para el resto del mundo (mucho score)

Ejemplo, queremos buscar palabras significativas en los blogs bucketed por autor.
Si solo hacemos un term agg, los resultados serían comunes tipo "and", "the", "or", etc.

Pero si usamos significant types, todas esas palabras no tendrán puntuación porque están en todos los sitios.
Nos devolverá palabras que son representativas para cada bucket y que no están (o están menos) en otros.

GET blogs/_search{
  "size": 0,
  "aggs": {
    "author_buckets": {
      "terms": {
        "field": "author.keyword",
        "size": 10
      },
      "aggs": {
        "content_terms": {
          "terms": {
            "field": "content",
            "size": 10
          }
        }
      }
    }
  }
}

"key": "Monica Sarbu",
"doc_count": 89,
"content_significant_terms": {
  "buckets": [
    {
      "key": "metricbeat",
      "doc_count": 66,
      "score": 8.295430260419582,
      "bg_count": 97
    },
    {
      "key": "filebeat",
      "doc_count": 66,
      "score": 5.849324105618168,
      "bg_count": 133
    },
    {
      "key": "beat",
      "doc_count": 56,
      "score": 5.3810714135420605,
      "bg_count": 105
    },




# pipeline aggregations
https://www.elastic.co/guide/en/elasticsearch/reference/6.3/search-aggregations-pipeline.html

Tomar valores de otras agregaciones.
Ejemplo, queremos la suma cumulativa de los resultados de una agregación.

GET logs_server*/_search{
  "size": 0,
  "aggs": {
    "logs_by_month": {
      "date_histogram": {
        "field": "@timestamp",
        "interval": "month"
      },
      "aggs": {
        "monthly_sum_response": {
          "sum": {
            "field": "response_size"
          }
        },
        "cumulative_sum_response": {
          "cumulative_sum": {
            "buckets_path": "monthly_sum_response"
          }
        }
      }
    }
  }
}

"buckets": [
  {
    "key_as_string": "2017-03-01T00:00:00.000Z",
    "key": 1488326400000,
    "doc_count": 255,
    "monthly_sum_response": {
      "value": 15860968
    },
    "cumulative_sum_response": {
      "value": 15860968
    }
  },
  {
    "key_as_string": "2017-04-01T00:00:00.000Z",
    "key": 1491004800000,
    "doc_count": 467961,
    "monthly_sum_response": {
      "value": 25446117219
    },
    "cumulative_sum_response": {
      "value": 25461978187
    }
  },



Si queremos coger aggregations de un parent level (pondremos PARENT>AGG):
GET logs_server*/_search{
  "size": 0,
  "aggs": {
    "logs_by_month": {
      "date_histogram": {
        "field": "@timestamp",
        "interval": "month"
      },
      "aggs": {
        "monthly_sum_response": {
          "sum": {
            "field": "response_size"
          }
        }
      }
    },
    "max_monthly_sum": {
      "max_bucket": {
        "buckets_path": "logs_by_month>monthly_sum_response"
      }
    }
  }
}


Obtener el máximo de los resultados de otra agregación (el truco es el parámetro _count de la primera agregación):
GET logs_server*/_search
{
  "size": 0,
  "aggs": {
    "number_of_visitors_by_month": {
      "date_histogram": {
        "field": "@timestamp",
        "interval": "month"
      }
    },
    "max_monthly_visitors": {
      "max_bucket": {
        "buckets_path": "number_of_visitors_by_month._count"
      }
    }
  }
}

