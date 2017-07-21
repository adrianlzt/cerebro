ES usa inverted index (ver bbdd/indices.md) para almacenar los datos.
Básicamente es una tabla donde para cada entrada nos dice donde está el fichero que contiene esa palabra

# Estado del cluster
curl http://localhost:9200/_status

# Listar todos los índices:
curl http://localhost:9200/_aliases?pretty=1

# Crear indice
curl -XPUT 'http://localhost:9200/twitter/' -d '{}'
curl -XPUT 'http://localhost:9200/twitter/' -d '{ "settings" : { "index" : { "number_of_shards" : 3, "number_of_replicas" : 2 } } }'
mirar insertar_datos.md

# Contenido de un indice:
curl http://localhost:9200/logstash-iris-adrian-2015.06.19/_search/?pretty

# Stats de un índice:
curl http://localhost:9200/logstash-2015.06.09/_stats/?pretty
En _all, primaries, docs, count tenemos el número total de documentos indexados.
En _all, primaries, store, size_in_bytes tenemos el tamaño total de los documentos indexados.
Nos saca las estadísticas tres veces, una para primaries, otra para total y otra para el nombre del índice.

Se puede preguntar por varios índices separados por comas.


# Borrar índices
curl -XDELETE 'http://localhost:9200/logstash-2014.03.02/'

curl -XDELETE 'http://localhost:9200/logstash-*'

# Parámetros
Podemos modificar los parámetros de un índice:

Cambiar el número de réplicas de un índice a 0
curl -XPUT localhost:9200/vehicles/_settings -d'
{
    "number_of_replicas": 0
}'


Si el cluster tenía varios nodos, los shards están repartidos entre los nodos, y al quitar las réplicas, si un nodo de cae, dejará de encontrar la información que se encuentra en esos shards ahora desconectados.

