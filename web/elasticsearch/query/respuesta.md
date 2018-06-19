https://www.elastic.co/guide/en/elasticsearch/reference/current/_the_search_api.html

{
  "took" : 63,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total":,
    "max_score":
    "hits": [
      {}
    ]
  }
}


took – time in milliseconds for Elasticsearch to execute the search (no cuenta el tiempo entre que llega la petición al server y vuelve al cliente)
timed_out – tells us if the search timed out or not
_shards – tells us how many shards were searched, as well as a count of the successful/failed searched shards
hits.total - numero total de documentos matched. Por defecto solo nos devolverá 10
hits.max_score: el valor del documento con el mayor _score
hits - ordenados por su _score

En caso de que haya problemas con los shards podríamos ver un número total de shards diferente al número de successful (aunque se mantengan a 0 los skipped y failed).
https://discuss.elastic.co/t/understanding-the--status-response--shards/3716
En ese ejemplo es porque las replicas no estan inicializadas.


# Scoring
https://www.elastic.co/blog/practical-bm25-part-1-how-shards-affect-relevance-scoring-in-elasticsearch
_score: como de relevante es el doc respecto a la query
Se usa el algoritmo BM25, viene de Lucene

TF (term freq): cuanto más aparece un term en el field, más importante es. Aporta de forma logarítmica. Ej.: aparecer 100 veces aporta poco más que aparecer 10 veces
IDF (inverse doc freq): cuantos más documentos tengan un term, menos importante es ese term. Quita score de forma logaritmica. Si aparece unos cuantos docs, no quita mucho más que esté en muuchos mas docs.
Field lenght: fields más cortos son más importantes

Buscar una palabra (term) en el campo (field) título.
Si un documento solo tiene esa palabra dos veces en su título y ningún otro documento la tiene, esto dará un _score muy alto.

Si queremos una explicación del _score podemos poner (en el top level):
"explain": true
