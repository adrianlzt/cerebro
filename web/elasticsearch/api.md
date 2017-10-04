# CAT api
https://www.elastic.co/guide/en/elasticsearch/reference/current/cat.html

Api con formato para humanos (en vez de JSON)

Formato general:
/_cat/xxx

Consultar que apis tenemos disponibles:
GET /cat/

Verbose (muestra la cabecera):
/_cat/xxx?v

Mostrar columnas:
/_cat/xxx?help

Solo mostrar ciertas columnas:
/_cat/xxx?h=ip,port,name

Cambiar formato de los datos de salida (https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#_number_values):
/_cat/xxx?bytes=b  (b, kb, mb, gb, tb, pb)
/_cat/xxx?time=b   (d, h, m, s, ms, micros, nanos)
/_cat/xxx?size=b   (`` single, k, m, g, t, p)

Cambiar formato de salida:
/_cat/xxx?format=json  (json, yaml, smile, cbor)

Ordenar (parece que no tira, al menos con la version 2.4.4, lucene 5.5.2):
/_cat/xxx?s=order:desc,template
