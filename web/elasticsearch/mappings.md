ES no es schemaless, pero hace que trabajar con esquemas sea mucho más sencillo, a esto se le llama mappings.

ES genera automáticamente el 'mapping' de un índice a partir de los elementos que le pasemos.
Nos lo avisará en el log:
[vehicles] update_mapping [tv] (dynamic)


Podemos obtener el mapping con:
curl localhost:9200/vehicles/_mapping

Si ES no genera correctamente el mapping, podemos suministrarlo al crear el índice.
