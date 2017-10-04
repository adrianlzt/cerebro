# Contar cuentos elementos hay para cada valor distinto de un field:
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

