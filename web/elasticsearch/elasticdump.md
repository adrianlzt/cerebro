https://github.com/taskrabbit/elasticsearch-dump
https://www.npmjs.com/package/elasticdump
mirar reindexar.md

Para reindexar datos o hacer dump a un fichero

No usar nombres de indices en mayusuclas, no permitido por ES.


Con elasticdump se pueden sacar mappings, analizers y data.

Intentando hacer un movimiento de un elastic 5.6.5 a un 6.1.2, parecia que lo había hecho pero el indice estaba vacío tras la ejecucción.


# Hacer un dump a fichero
docker run --net=host --rm -ti -v "$PWD/:/tmp" taskrabbit/elasticsearch-dump --input=http://localhost:9200/NOMBRE_INDICE--output=/tmp/nombre_indice.json --type=data

Filtrar por query:
  --searchBody '{"query":{"term":{"username": "admin"}}}'
  --searchBody '{"query": {"range" : { "timestamp" : { "gt" : "now-1h" } }}}'

Batchs más grandes:
--limit 500


Varios indices con sus mappings:

for i in indexA indexB indexC; do
for j in settings mapping analyzer alias data; do
docker run --net=host --rm -ti -v "$PWD/:/tmp" taskrabbit/elasticsearch-dump --input=http://localhost:9200/$i --output=/tmp/${i}_${j}.json --type=${j}
done
done

Si queremos ignorar certificados TLS
-e NODE_TLS_REJECT_UNAUTHORIZED=0


# Restore
Restaurar datos a un elastic que tenemos en local
docker run --net=host --rm -ti -v "$PWD/:/tmp" taskrabbit/elasticsearch-dump --input=/tmp/FICHERO_DUMP_DATA.json --output=http://127.0.0.1:9200/NOMBRE_INDICE --type=data

Crear un mapping a partir de un fichero
docker run --rm -ti -v "$PWD/:/tmp" taskrabbit/elasticsearch-dump --input=/tmp/communities_mapping.json --output=http://10.0.2.32:30000/communities --type=mapping 


Restaurar una serie de mappings, settings e indices
for i in user_index communities primary_index invite_index invites community_index; do
for j in settings mapping analyzer alias data; do
docker run --net=host --rm -ti -v "$PWD/:/tmp" taskrabbit/elasticsearch-dump --output=http://127.0.0.1:9200/$i --input=/tmp/${i}_${j}.json --type=$j
done
done

Parece que no funciona bien el restore de los settings, porque antes de enviar el PUT con las settings, envia un PUT para crear el indice.
El segundo PUT, el que tiene las settings, da error porque el indice ya existe
