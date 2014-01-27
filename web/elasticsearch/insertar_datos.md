Los datos se insertan con peticiones HTTP PUT:

curl -XPUT localhost:9200/vehicles/tv/one -d'
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

Nos confirma la operación con:
{
"ok":true,
"_index":"vehicles",
"_type":"tv",
"_id":"one",
"_version":1
}

_version es un campo interno de ES para la replicación
