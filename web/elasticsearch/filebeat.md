https://www.elastic.co/guide/en/beats/filebeat/current/configuring-howto-filebeat.html

Generalmente lo que haremos es configurar algunos prospectors (donde configuramos que ficheros se deben leer), unos processors (como tratar la información) y unos outputs (donde enviar la info).

Ejemplo leyedo ficheros de log en formato md-json, extrayendo los campos del json como fields, borrando fields que no queremos y almacenando la info en elastic:
filebeat.inputs:
- type: log
  paths:
    - /var/log/messages
    - /var/log/*.log
  # scan_frequency: 10s  # por defecto
  # tail_files: true  # empezar a leer solo nuevas lineas. CUIDADO, la doc dice que podemos perder lineas con esta config si tenemos rotado de logs

processors:
 - decode_json_fields:
     fields: ['message']
     target: ''
     overwrite_keys: true

 - drop_fields:
     fields: ["message", "prospector", "beat", "source", "offset"]

setup.template.enabled: false

# Solo se puede poner un output
output.elasticsearch:
  hosts: ["localhost:9200"]
  index: "logs_%{[host]}"
  document_type: "_doc"
  bulk_max_size: 1000

#logging.metrics.enabled: true  # por defecto cada 30s se envian metricas de como esta funcionando filebeat



Testear config:
filebeat -c filebeat.yml test config



# Internals
Output de redis.
Cuando se hace el primer envio a un output redis, filebeat resuelve todas las IPs de los servidores que tengamos listados en el output.
Luego conecta al primero, lanza un "PING" para chequear que contesta. Luego un "INFO" para obtener la versión del servidor y por último un RPUSH para enviar los datos.
Luego lanza PING e INFO contra el resto de servidores de la lista.

Para próximos envios solo hará el RPUSH




# Autodiscover (docker/kubernetes)
https://www.elastic.co/guide/en/beats/filebeat/current/configuration-autodiscover.html

Si la imagen es XXX, arranca el modulo A leyendo los logs de ese container.
