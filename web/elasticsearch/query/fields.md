https://www.elastic.co/guide/en/elasticsearch/reference/6.x/search-field-caps.html
Version >= 5.4

Mostrar todos los fields disponibles del indice INDEX diciendo de que tipo son, si se pueden usar para búsquedas y/o agregaciones.
curl 'localhost:9200/INDEX/_field_caps?fields=*&pretty'

Lo mismo pero para todos los índices:
curl 'localhost:9200/_field_caps?fields=*&pretty'



Si queremos sacar los campos tambien podemos preguntar a _mappings para obtener la estructura de datos.
Nos dirá el tipo de dato y si es "analyzed"
