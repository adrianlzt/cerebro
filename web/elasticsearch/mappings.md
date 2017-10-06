https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping.html

Field types: https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-types.html



ES no es schemaless, pero hace que trabajar con esquemas sea mucho más sencillo, a esto se le llama mappings.

ES genera automáticamente el 'mapping' de un índice a partir de los elementos que le pasemos.
Nos lo avisará en el log:
[vehicles] update_mapping [tv] (dynamic)

Otra opción es generarlo a priori.


Podemos obtener el mapping con:
curl localhost:9200/vehicles/_mapping

Mapping de un type determinado
curl http://localhost:9200/iris-telematics-2015.06.10/_mapping/access_combined/?pretty

Si ES no genera correctamente el mapping, podemos suministrarlo al crear el índice.


# Analyzed fields
https://www.elastic.co/guide/en/elasticsearch/reference/2.4/mapping-types.html#_multi_fields

Si queremos poder buscar full-text en una string esta debe ser "analyzed". La contrapartida es que no podremos usar este campo para hacer sorting o agregaciones.


Por defecto cuando se detecta el tipo de cada field se marca como "analyzed field", de modo que si el campo es "valor-otra-cosa" lo partirá en tres trozos.
Si no queremos que haga esto tendremos que modificar ese field para que no lo analice. Esto se hace con la mapping API:

No se puede cambiar el "datatype" de un field si ya tiene datos indexados.

Podemos usar elasticdump para reindexar la información.
