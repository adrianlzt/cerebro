https://www.elastic.co/guide/en/elasticsearch/reference/5.6/search-request-sort.html

Por defecto el orden es decreciente por scoring.
Si forzamos un sort, sin pasar _score, _score volverá como null

En la respuesta nos vendrá un campo sort con los campos que ha usado para el sorting.

GET blogs/_search
{
  "query": {
    "match": {
      "content": "security"
    }
  },
  "sort": {
    "publish_date": {
      "order": "desc"
    }
  }
}


Sort por dos valores, primero hace uno, y si son iguales, usa el otro:
GET blogs/_search
{
  "query": {
    "bool": {
      "must": {
        "match": {
          "content": "security"
        }
      },
      "must_not": {
        "match": {
          "author.keyword": ""
        }
      }
    }
  },
  "sort": [
    {
      "author.keyword": {
        "order": "asc"
      }
    },
    {
      "publish_date": {
        "order": "desc"
      }
    }
  ]
}


Si ordenamos solo por sorting podemos tener el caso de documentos que tengan el mismo score y la misma búsqueda devuelva los resultados de maneras distintas.
Esto lo podemos solventar poniendo el segundo sort por _id
