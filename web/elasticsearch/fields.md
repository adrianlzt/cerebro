Por defecto solo se permiten tener 1000 fields en cada índice.

Cuidado con tener muchos fields. Cada nuevo field tiene que almacenarse en el estado del cluster y esto es costoso.


Contar número de fields de un índice y type determinado:
curl -fsS localhost:9200/ansible_facts/_mapping/_inv?pretty | grep type | wc -l


Calculo aproximado de número de fields que se van a generar a partir de un doc json:
cat FACTS.json| gron | grep -v -e "\[\];" -e "\{\};" | sed "s/\[[0-9]*\]//" | cut -d ' ' -f 1 | sort | uniq | wc -l



Si queremos modificar ese límite podemos hacerlo en la creación:
PUT test
{
  "settings": {
    "index.mapping.total_fields.limit": 2000,
    "number_of_shards": 1,
    "number_of_replicas": 0
  },
  "mappings": {
    ...
  }
}

curl -XPUT -H "Content-Type: application/json" localhost:9200/indx1 -d '{"settings": {"index.mapping.total_fields.limit": 10000}}'


O una vez creado:
PUT my_index/_settings
{
  "index.mapping.total_fields.limit": 2000
}
