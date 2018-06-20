https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-from-size.html

GET /_search
{
    "from" : 0,
    "size" : 10, ...
}

from+size no puede superar index.max_result_window (por defecto 10000)
La razón es porque para lograr un documento muy al final de la cola, cada shard tiene que pasarnos todos los documentos y el coordinating node tiene que ordenarlos y devolver la página que queremos.
El sorting se hace en el heap del coordinating node.

Otras opciones:
https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-scroll.html
https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-search-after.html


# Search after

