Tags are optional. You don’t need to have tags in your data structure, but it’s generally a good idea to make use of them because, unlike fields, tags are indexed. This means that queries on tags are faster and that tags are ideal for storing commonly-queried metadata.

Estan indexadas.


Tags asociados con cada serie.

Si queremos ver todos los tags por cada measurement:
SHOW TAG KEYS

SHOW TAG VALUES WITH KEY = "environment"
  obtiene todos los posibles valores de la columna environment

SHOW TAG VALUES FROM "cpu" WITH KEY = "alias"
  obtiene los posibles valores de los tags con key "alias" de la measurement "cpu"


SHOW TAG KEYS FROM "cpu"
