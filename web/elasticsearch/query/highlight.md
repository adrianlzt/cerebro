https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-highlighting.html

Marcar palabras con una etiqueta html, por defecto <em></em>
También nos devolverá un nuevo campo "highlight" con los campos que ha resaltado. Esto nos puede servir como un "grep" para ver las líneas donde estamos haciendo match

GET blogs/_search
{
  "query": {
    "match_phrase": {
      "title": "kibana"
    }
  },
  "highlight": {
    "fields": {
      "title": {}
    }
  }
}

Respuesta:

"_source": {
 "url": "/blog/kibana-5-6-1-released",
 "title": "Kibana 5.6.1 released”,
 ...
},
"highlight": {
 "title": [
   "<em>Kibana</em> 5.6.1 released"
 ]
}



Cambiando las etiquetas y forzando a que me haga highlight sobre "title" aunque no esté en la búsqueda:
pre/post_tags lo podemos especificar por field o ponerlo debajo del nivel de highlight
GET blogs/_search
{
  "highlight": {
    "require_field_match": false,
    "fields": {
      "content": {
        "pre_tags" : ["<mark>"], "post_tags" : ["</mark>"]
      },
      "title": {
        "pre_tags" : ["<mark>"], "post_tags" : ["</mark>"]
      }
    }
  },
  "query": {
    "match": {
      "content": elastic stack"
  ...
