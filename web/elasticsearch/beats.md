https://www.elastic.co/products/beats
https://github.com/elastic/beats
https://www.elastic.co/guide/en/beats/libbeat/master/community-beats.html
  comunidad

If you’re not ready to upgrade Elasticsearch and Kibana to 6.0, that’s alright. Beats version 6.0 works with Elasticsearch and Kibana version 5.6, so you can upgrade Beats now and the rest of the stack later.

filebeat probablemente reemplace a logstash-forwarder


Metricbeat -> extrae métricas de sistema (oficial)
Packetbeat -> Captura trafico y lo analiza, sacando métricas.  (oficial)
heartbeat -> Comprueba disponibilidad de servicios realizando conexiones activas (oficial)
Auditbeat -> extrae información de auditorio (oficial) (version >= 6)
connbeat -> extrae conexiones de red (community) DEPRECATED, lo hace el metricbeat
packagebeat -> Extrae información de paquetes (community) (binario en github, pero con bug, deja procesos defunc)
iobeat -> Extrae información de ios (community) (falla compilación)
lmsensorsbeat -> Extrae información de sensores de la maquina (community) (no compila)

Auditbeat is a lightweight shipper that you can install on your servers to audit the activities of users and processes on your systems. For example, you can use Auditbeat to collect and centralize audit events from the Linux Audit Framework. You can also use Auditbeat to detect changes to critical files, like binaries and configuration files, and identify potential security policy violations.

https://github.com/hartfordfive/protologbeat
Application accepting log data via TCP or UDP to then index the data in Elasticsearch

Generalmente cuando hagamos un go get ..., cuando termine ya habrá compilado el beat.
Si queremos recompilarlo: go build





# Filebeat
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







# Develop
http://www.elastic.co/guide/en/beats/devguide/current/new-beat.html
https://www.elastic.co/blog/build-your-own-beat
  cosas antiguas

At the high level, a simple Beat has two main components:
  a component that collects the actual data, and
  a publisher that sends the data to the specified output, such as Elasticsearch or Logstash.
The publisher is already implemented in libbeat, so you typically only have to worry about the logic specific to your Beat (the code that creates the event and sends it to the publisher). Libbeat also offers common services like configuration management, logging, daemonzing, and Windows service handling, and data processing modules.

Como crear to propio beat:
https://www.elastic.co/guide/en/beats/devguide/current/newbeat-generate.html
go get github.com/elastic/beats
Script en python para generar la estructura inicial (python2)
python2 $GOPATH/src/github.com/elastic/beats/script/generate.py
  nos preguntará como queremos llamarlo, user de github, nombre repo, etc
cd ${GOPATH}/src/github.com/{user}/examplebeat
make setup

make
  hacer build

./examplebeat -e -d "*"


La parte principal es la implementación de la interfaz Beater.
https://www.elastic.co/guide/en/beats/devguide/current/beater-interface.html

type Countbeat struct {
        done   chan struct{}
        config config.Config
        client publisher.Client

        ...
}

func (bt *Countbeat) Run(b *beat.Beat) error {
        ...
}


func (bt *Countbeat) Stop() {
        ...
}


El esquema de datos que saquemos debemos especificarlo en _meta/fields.yml
Tras agregarlo ahí deberemos hacer un "make update"



Con libbeat 5.2.3 hace falta tener el fichero XXX.template.json con el que se generará el template de los datos que se enviarán (https://www.elastic.co/guide/en/beats/filebeat/5.4/filebeat-template.html)
Para libbeat >= 6 se usará el fields.yml (https://www.elastic.co/guide/en/beats/filebeat/6.0/filebeat-template.html)
