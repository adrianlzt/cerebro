Estado del cluster:
curl localhost:9200/_cluster/health

RED: algún primary shard no allocated
YELLOW: todos los primary shards allocated, pero al menos un replica no lo está
GREEN: todos los shards allocated

curl http://localhost:9200/_status

"active_primary_shards":5,
"active_shards":10
5 shards creados para el único índice que tenemos
10 shards en total por la replicación por defecto


En el caso de que apagásemos un nodo, nos quedaríamos:
"status":"yellow",
"active_primary_shards":5,
"active_shards":5,
"unassigned_shards":5

Tenemos 5 shards activos del nodo que queda. Y el problema es que no hay donde poner las réplicas de esos 5 shards, por lo que se quedan sin asignar (unassigned_shards).
Esto provoca el estado 'yellow' (algo va mal, pero el cluster puede seguir funcionando)
