Generalmente lo que haremos es configurar algunos prospectors (donde configuramos que ficheros se deben leer), unos processors (como tratar la información) y unos outputs (donde enviar la info).

Ejemplo leyedo ficheros de log en formato md-json, extrayendo los campos del json como fields, borrando fields que no queremos y almacenando la info en elastic:
filebeat.prospectors:
- type: log
  enabled: true
  paths:
    - /home/elastic/datasets/elastic_blog_curated_access_logs_server*/*.log

processors:
 - decode_json_fields:
     fields: ['message']
     target: ''
     overwrite_keys: true

 - drop_fields:
     fields: ["message", "prospector", "beat", "source", "offset"]

setup.template.enabled: false

output.elasticsearch:
  hosts: ["localhost:9200"]
  index: "logs_%{[host]}"
  document_type: "_doc"
  bulk_max_size: 1000
