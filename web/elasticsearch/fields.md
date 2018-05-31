Por defecto solo se permiten tener 1000 fields en cada índice.

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
