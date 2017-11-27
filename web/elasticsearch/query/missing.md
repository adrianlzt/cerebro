https://www.elastic.co/guide/en/elasticsearch/reference/6.0/search-aggregations-metrics-sum-aggregation.html#_missing_value_9

Que hacer cuando hacemos una agregación y para un determinado periodo no tenemos valores.
Con el campo missin podemos dar un valor para cuando no tenemos datos.

Esto no funciona si no tenemos ningún documento recibido.
En estos casos usaremos "min_doc_count", que no mostrará las agregaciones que no tengan al menos un número de documentos.

Poniendo este valor a 1, en la respuesta no veremos agregaciones de periodos con 0 documentos.
