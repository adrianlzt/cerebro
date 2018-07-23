https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting.html

Solo se puede programar en "painless". (en la version 6.x se eliminó la posibilidad de otros lenguajes)

También existen otros lenguajes para tareas más específicas:
expression, fast custom ranking and sorting.
mustache, templates.
java, para crear tus propios plugins.


Cuidado con el uso. Puede consumir muchos recursos
Mantener bajo el número de compilaciones (mirar sección Cache)
Si modificamos algún field, estaremos borrando el documento y reindexándolo.

# Casos de uso
Accessing document fields for various reasons:
  - update/delete a field in a document
  - perform computations on fields before returning them
  - customize the score of a document
  - working with aggregations

Ingest Node
  - execute a script within an ingest pipeline

Reindex API
  - manipulate data as it is getting reindexed

# Uso
Podemos usarlos definendolos en la query o almacenandolos primero.

## inline
Ejemplo sencillo de como actualizar un documento usando un script painless (no es un buen ejemplo para producción):
POST my_index/_doc/1/_update
{
 "script": {
   "source": "ctx._source.num_of_views += params.new_views",
   "params": {
     "new_views": 2
   }
 }
}


## stored scripts
En este caso almacenamos los scripts en ES para luego usarlos:

POST _scripts/add_new_views
{
 "script": {
   "lang": "painless",
   "source": "ctx._source.num_of_views += params.new_views"
 }
}

POST my_index/_doc/1/_update
{
 "script": {
   "id": "add_new_views",
   "params": {
     "new_views": 2
   }
 }
}


# Sintaxis

## Acceder fields
Si estamos haciendo "ingestion":
ctx.field_name

Si estamos actualizando (_update):
ctx._source.field_name

Si estamos en una búsqueda o agregación:
doc['field_name']


# Caching
Los scripts son cacheados. Tenemos que intentar usar siempre scripts cacheados.
Intentar siempre usar parametros para hacer los scripts lo más generales posible.
Compilar los scripts es costoso. ES no dejará compilar muchos scripts.
By default, up to 75 compilations per 5-minute window ("75/5m") can be compiled
  configured by script.max_compilations_rate

El cache por defecto son 100 elementos y tiene un tiempo de expiración:
 the default size of the cache is 100 scripts
 configurable using script.cache.max_size
 or set a timeout using script.cache.expire
