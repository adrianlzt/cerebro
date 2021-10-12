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
Lanzamos una petición, nos devuelve un id.
Luego usamos ese id para recuperar los resultados de ese momento preciso.

Para usarlo con python mirar:
https://elasticsearch-py.readthedocs.io/en/v7.15.0/helpers.html?highlight=scroll#elasticsearch.helpers.scan
https://elasticsearch-dsl.readthedocs.io/en/latest/search_dsl.html?highlight=scroll#pagination

GET logs-2018-03/_search?scroll=30s
{
  "size": 1000,
  "query": {
    "match_all": {}
  },
  "sort": [
    {
      "_doc": {
        "order": "asc"
      }
    }
  ]
}

scroll=30s, esto dice que tenemos que lanzar un scroll y que se autoborrará si no se usa durante 30"

Respuesta (con el número de resultados que hayamos pasado con "size"):
{
 "_scroll_id": "DnF1ZXJ5VGhlbkZldGNoBQAAAAAAAAWOFnlWQVR3N3pxUjdLMnJLcUZpSDVkWWcAAAAAAAAFjAAAAWPFnlWQVR3N3pxUjdLMnJLcUZpSDVkWWcAAAAAAAAFkRZ5V
kFUdzd6cVI3SzJyS3FGaUg1ZFln",
 "took": 0,
 ...


Para recuperar los resultados (en cada GET obtendremos el número de resultados de "size" hasta quedarnos sin):
GET _search/scroll
{
 "scroll": "30s",
 "scroll_id":
"DnF1ZXJ5VGhlbkZldGNoBQAAAAAAAAWOFnlWQVR3N3pxUjdLMnJLcUZpSDVkWWcAAAAAAAAFjAAAAWPFnlWQVR3N3pxUjdLMnJLcUZpSDVkWWcAAAAAA
AAFkRZ5VkFUdzd6cVI3SzJyS3FGaUg1ZFln"
}

Esto nos devolverá otro _scroll_id que usaremos para recuperar los siguientes resultados.

Cuando hayamos terminado podemos borrar el scrolls sin esperar a su timeout:
DELETE _search/scroll/DnF1ZX...
