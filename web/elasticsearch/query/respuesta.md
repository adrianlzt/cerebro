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
    ...
  }
}


took – time in milliseconds for Elasticsearch to execute the search
timed_out – tells us if the search timed out or not
_shards – tells us how many shards were searched, as well as a count of the successful/failed searched shards<Paste>

En caso de que haya problemas con los shards podríamos ver un número total de shards diferente al número de successful (aunque se mantengan a 0 los skipped y failed).
https://discuss.elastic.co/t/understanding-the--status-response--shards/3716
En ese ejemplo es porque las replicas no estan inicializadas.
