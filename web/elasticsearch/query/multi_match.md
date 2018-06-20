https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html

Buscar un términto en varios campos:
GET blogs/_search
{
  "query": {
    "multi_match": {
      "query": "shay banon",
      "fields": [
        "title",
        "content",
        "author"
      ],
      "type": "best_fields"
    }
  }
}

Tambien podemos poner fields como "*_name"

# Score
Dependerá del "type" que configuremos.

best_fields (default): se usará el score del mejor field.
most_fields: suma de los scores de cada field
cross_fields: se usa el "df" (doc freq) máximo de los fields para calcular el "tf" (term freq) y se ordena por el máximo
phrase: si tenemos un term con varias palabras y su proximidad es importante

Si queremos dar más importancia a algún field lo pondremos como:
"author^3" (tres veces más importante que el resto, podemos poner 0.4 para reducir el boosting)
