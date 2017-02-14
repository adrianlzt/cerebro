Tags are optional. You don’t need to have tags in your data structure, but it’s generally a good idea to make use of them because, unlike fields, tags are indexed. This means that queries on tags are faster and that tags are ideal for storing commonly-queried metadata.


Store data in tags if they’re commonly-queried meta data
Store data in tags if you plan to use them with GROUP BY()
Store data in fields if you plan to use them with an InfluxQL function
Store data in fields if you need them to be something other than a string - tag values are always interpreted as strings


Estan indexadas.


Tags asociados con cada serie.

Si queremos ver todos los tags por cada measurement:
SHOW TAG KEYS [ON database]

SHOW TAG VALUES WITH KEY = "host"
SHOW TAG VALUES WITH KEY = "environment"
  obtiene todos los posibles valores de la columna environment

SHOW TAG VALUES FROM "cpu" WITH KEY = "alias"
  obtiene los posibles valores de los tags con key "alias" de la measurement "cpu"


SHOW TAG KEYS FROM "cpu"

SHOW TAG KEYS ON db0 FROM /c.*/
