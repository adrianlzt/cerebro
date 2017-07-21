https://www.elastic.co/guide/en/elasticsearch/reference/2.3/docs-index_.html

Los datos se insertan con peticiones HTTP PUT:

curl -XPUT localhost:9200/vehicles/tv/one?pretty -d'
{
    "color": "green",
    "driver": {
        "born": "1959-09-07",
        "name": "Walter White"
    },
    "make": "Pontiac",
    "model": "Aztek",
    "value_usd": 5000.0,
    "year": 2003
}'

índice: 'vehicles'
document-type: 'tv'
id: 'one'

En el payload (el parámetro -d nos permite cargar este tipo de información) meteremos un documento JSON

Nos confirma la operación con (resulado de otro insert distinto):
{
  "_index" : "pruebaalt390",
  "_type" : "tweet",
  "_id" : "2",
  "_version" : 1,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "failed" : 0
  },
  "created" : true
}

_version es un campo interno de ES para la replicación
