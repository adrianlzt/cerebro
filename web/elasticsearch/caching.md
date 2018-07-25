# Node query cache
Una cache por nodo.
Usar LRU (least recent used) para borrar elementos de la cache.
Solo para queries que tengan "filter" (no vale para must, should, etc)

Cada nodo tendrá un valor estático (por defecto 10%):
indices.queries.cache.size: "5%"

Cada index puede tener el cache activado o no:
index.queries.cache.enabled: true


Esta cache funciona con "bitsets" y solo se usará para segmentos suficientemente grandes.
Lo que se genera es un array de bits (0/1) donde se apunta cada doc de un segmento ha pasado el filtro o no.
Si hacemos muchos updates, se invalidará la cache y no lo podremos aprovechar.


# Shard request cache
Un único cache por nodo
LRU
Podemos esperar tiempos ~10ms una vez cacheado.
Modificar los datos invalida la cache (bueno para indices en los que no se escribe más)
index.request.cache.size: "5%" (defalt 1%)
Solo cachea si tenemos size:0 (a no ser que lo forcemos)

Desactivarlo para un índice:
PUT /my_index/_settings {
  "index.requests.cache.enable": false
}


Forzar el cacheo de una query:
GET /blogs/_search?request_cache=true
{
 "query": {
  "query_string": {
   "query": "*_source*"
  }
 }
}
