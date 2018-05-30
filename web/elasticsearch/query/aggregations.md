# Metrics
https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics.html

Realizar cálculos matemáticos con los valores



# Bucket aggregations
Crear "buckets" a partir de documentos

Si no queremos obtener "hits" podemos poner: "size": 0

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
