https://www.elastic.co/guide/en/elasticsearch/reference/current/search-profile.html

GET /twitter/_search
{
  "profile": true,￼
    "query" : {
    "match" : { "message" : "some number" }
  }
}

Nos devolverá una respuesta muy verbosa especificando donde gasta el tiempo.

En kibana hay una herramienta para poder ver los profile de forma más gráfica.
https://www.elastic.co/blog/a-profile-a-day-keeps-the-doctor-away-the-elasticsearch-search-profiler


Logear queries lentas? Mirar slowlog y api _tasks (../monitorizar.md)
