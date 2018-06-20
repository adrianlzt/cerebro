Marcar palabras con una etiqueta html, por defecto <em></em>
También nos devolverá un nuevo campo "highlight" con los campos que ha resaltado.

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
