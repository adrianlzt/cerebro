https://www.elastic.co/guide/en/elasticsearch/reference/5.6/search-request-body.html

Query (mirar query.md)
  "query": { "match": { "title": "something" } }

From/Size (mirar paginación.md)
  "size": 100  # numero de documentos que seran devueltos en hits.hits[]
  "size": 0    # si no queremos que devuelva docs (tipicamente cuando usamos aggregations)

Sort (mirar sort.md)
  "sort": ["field1", "field2"]

Source filtering (determinar los fields que queremos que retorne)
  "_source": ["title", "author"]
  Si queremos filtrar para quedarnos solo con ciertos campos (quitando metadata):
  my_blogs/_search?filter_path=hits.hits._source.title,hits.hits._source.author
  Se pueden usar asteriscos y dobles asteriscos (mirar doc): hits.hits._source.*.foo.bar
  https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#common-options-response-filtering

Aggregations
 "aggs": { "un_nombre": { "avg": { "field": "size" } } }

Fields

Script FieldsDoc value Fields

Post filter
...

