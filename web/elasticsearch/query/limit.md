https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-from-size.html

GET /_search
{
    "from" : 0,
    "size" : 10, ...
}

from+size no puede superar index.max_result_window (por defecto 10000)
La razón es porque para lograr un documento muy al final de la cola, cada shard tiene que pasarnos todos los documentos y el coordinating node tiene que ordenarlos y devolver la página que queremos.
El sorting se hace en el heap del coordinating node.
Mirar search after

Otras opciones:
https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-scroll.html
https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-search-after.html


# Search after
Podemos tomar el field "sort" devuelto por la última respuesta (cuando usamos sort) y pasarselo a search_after para buscar los siguientes N documentos a partir de ese.
Esto aligera al nodo coordinating, porque los shards solo van a enviar unos pocos documentos.

GET blogs/_search
{
  "size": 10,
  "query": {
    "match": {
      "content": "elasticsearch"
    }
  },
  "sort": [
    {
      "_score": {
        "order": "desc"
      }
    },
    {
      "_id": {
        "order": "asc"
      }
    }
  ],
  "search_after": [
    0.55449957,
    "1346"
  ]
}



# Scrolling
Duda: podemos lanzar una query y obtener todos los resultados de forma consistente (suponiendo que el indice se está moviendo mucho y lanzar siguientes queries responderían cosas distintas)
