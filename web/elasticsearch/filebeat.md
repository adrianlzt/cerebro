<https://www.elastic.co/guide/en/beats/filebeat/current/configuring-howto-filebeat.html>

Generalmente lo que haremos es configurar algunos prospectors (donde configuramos que ficheros se deben leer), unos processors (como tratar la información) y unos outputs (donde enviar la info).

Ejemplo leyedo ficheros de log en formato md-json, extrayendo los campos del json como fields, borrando fields que no queremos y almacenando la info en elastic:

```yaml
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

# Output a logstash (protocolo beats)
output.logstash:
  hosts: ["10.233.107.172:5044"]

# Pruebas, sacar a la consola:
output.console:
  pretty: true
```

Testear config:
filebeat -c filebeat.yml test config

Testear ejecución
filebeat run -c filebeat.yml -v -e

Con docker:
docker run --rm -it -v $PWD/filebeat.yaml:/usr/share/filebeat/filebeat.yml docker.elastic.co/beats/filebeat:7.3.2

# Internals

## Output de redis

Cuando se hace el primer envio a un output redis, filebeat resuelve todas las IPs de los servidores que tengamos listados en el output.
Luego conecta al primero, lanza un "PING" para chequear que contesta. Luego un "INFO" para obtener la versión del servidor y por último un RPUSH para enviar los datos.
Luego lanza PING e INFO contra el resto de servidores de la lista.

Para próximos envios solo hará el RPUSH

### TLS

Si tenemos configurado TLS con certificate y key parece que ignora la opción de verification_mode.

# Autodiscover (docker/kubernetes)

<https://www.elastic.co/guide/en/beats/filebeat/current/configuration-autodiscover.html>

Si la imagen es XXX, arranca el modulo A leyendo los logs de ese container.

# Inputs / Prospectors

## Docker

```yaml
- type: container
  format: docker
  containers.ids: "*"
  paths:
    - '/var/lib/docker/containers/*/*.log'
  json.message_key: log
  json.keys_under_root: true
  json.ignore_decoding_error: true
  fields_under_root: true
  ignore_older: 24h
  tail_files: true
  fields:
    fileset.module: container
  processors:
    - add_docker_metadata: ~
```

# Processors

## dissect

Procesador para extraer campos de un mensaje. Se le pasa un patrón y los campos a extraer.
Aquí podemos probar configuraciones: <https://dissect-tester.jorgelbg.me/>

Key modifiers para el pattern:
<https://www.elastic.co/guide/en/elasticsearch/reference/current/dissect-processor.html>

# Keystore

Para almacenar, por ejemplo, contraseñas y luego poner una variable en el fichero de config.

El fichero con las keystores está en /var/lib/filebeat/filebeat.keystore

Para ver el contenido:
<https://github.com/adrianlzt/extract-filebeat-keystore/>

# Autodiscover

<https://www.elastic.co/guide/en/beats/filebeat/8.11/configuration-autodiscover-hints.html>

Generar una configuración por cada contenedor que se detecte.
También se pueden pasar configuraciones específicas usando labels del contenedor.

Ejemplo de contenedor con configuraciones específicas:

```bash
docker run \
  --rm \
  -it \
  -l "co.elastic.logs/multiline.pattern=^\d{4}-\d{2}-\d{2}" \
  -l "co.elastic.logs/multiline.negate=true" \
  -l "co.elastic.logs/multiline.match=after" \
  -l "co.elastic.logs/processors.dissect.tokenizer=%{timestamp}|%{log_level}|%{field1}|%{field2}|%{field3}|%{message}[[%{module}|%{process_name}][%{file_path}:%{line_number}]]" \
  -l "co.elastic.logs/processors.dissect.field=message" \
  -l "co.elastic.logs/processors.dissect.target_prefix=dissect" \
  alpine
```

Ejemplo de configuración de filebeat:

```yaml
output.console:
  pretty: true

filebeat.autodiscover:
  providers:
    - type: docker
      hints.enabled: true
      hints.default_config:
        type: container
        scan_frequency: "1s"
        paths:
          - /var/lib/docker/containers/${data.container.id}/*.log
```
