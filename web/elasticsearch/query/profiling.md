https://www.elastic.co/guide/en/elasticsearch/reference/current/search-profile.html

GET /twitter/_search
{
  "profile": true,￼
    "query" : {
    "match" : { "message" : "some number" }
  }
}

Nos devolverá una respuesta muy verbosa especificando donde gasta el tiempo.


Logear queries lentas? Mirar ../slowlog.md
