https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-snapshots.html

Si queremos hacer snapshots a un sistemas de fichero, primero este deberá estar configurado en elasticsearch.yml

path.repo: ["/mnt/elastic_snapshots"]

En un cluster, este dir debe ser un shared file system entre todos los nodos del cluster (master y data nodes)
El dir debe ser writable por el user de elastic.


Creamos el repositorio para almacenar snapshots:
curl localhost:9200/_snapshot/backup -XPUT -H "Content-Type: application/json" -d '{"type": "fs","settings": {"location": "/mnt/elastic_backup"}}'


Crear snapshot
curl "localhost:9200/_snapshot/backup/snapshot1?wait_for_completion=true" -XPUT
  el comando no termina hasta que se haya hecho el snapshot

Info de un snapshot:
curl localhost:9200/_snapshot/backup/snapshot1 | python -m json.tool


# Restaurar
Nos llevamos el directorio /mnt/elastic_backup a otra maquina, en este caso un ES montado con docker
Paro el container de ES

Entro en iterativo en otro container de ES, modifico la conf para poner lo de path.repo y arranco.
Creo el repositorio (igual que en el primer nodo)
Consulto el snapshot: curl localhost:9200/_snapshot/backup/snapshot1
Ejecuto el restore:
curl localhost:9200/_snapshot/backup/snapshot1/_restore -XPOST

Estado:
curl localhost:9200/_snapshot/backup/snapshot1/_status | jq '.' | less


Ahora borramos el repositorio (por que el container parado no podrá llegar al directorio donde estaba)
curl localhost:9200/_snapshot/backup -XDELETE


Paramos el container temporal y arrancamos el bueno.
