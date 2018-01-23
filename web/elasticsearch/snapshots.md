https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-snapshots.html

Si queremos hacer snapshots a un sistemas de fichero, primero este deberá estar configurado en elasticsearch.yml

path.repo: ["/mnt/elastic_snapshots"]

En un cluster, este dir debe ser un shared file system entre todos los nodos del cluster (master y data nodes)
El dir debe ser writable por el user de elastic.


Creamos el repositorio para almacenar snapshots:
curl localhost:9200/_snapshot/backup -XPUT -d '{"type": "fs","settings": {"location": "/mnt/elastic_backup"}}'


Crear snapshot
curl "localhost:9200/_snapshot/backup/snapshot1?wait_for_completion=true" -XPUT
  el comando no termina hasta que se haya hecho el snapshot
