ES usa inverted index (ver bbdd/indices.md) para almacenar los datos.
Básicamente es una tabla donde para cada entrada nos dice donde está el fichero que contiene esa palabra

Listar todos los índices:
curl http://localhost:9200/_aliases?pretty=1

Tambien
curl http://localhost:9200/_status

Podemos modificar los parámetros de un índice:

Cambiar el número de réplicas de un índice a 0
curl -XPUT localhost:9200/vehicles/_settings -d'
{
    "number_of_replicas": 0
}'


Si el cluster tenía varios nodos, los shards están repartidos entre los nodos, y al quitar las réplicas, si un nodo de cae, dejará de encontrar la información que se encuentra en esos shards ahora desconectados.


Borrar índices
curl -XDELETE 'http://localhost:9200/logstash-2014.03.02/'
