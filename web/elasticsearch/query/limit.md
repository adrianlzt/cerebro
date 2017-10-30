https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-from-size.html

GET /_search
{
    "from" : 0, "size" : 10, ...
}

from+size no puede superar index.max_result_window (por defecto 10000)

Otras opciones:
https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-scroll.html
https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-search-after.html
