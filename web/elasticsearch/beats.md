https://www.elastic.co/products/beats
https://github.com/elastic/beats
https://www.elastic.co/guide/en/beats/libbeat/master/community-beats.html
  comunidad

If you’re not ready to upgrade Elasticsearch and Kibana to 6.0, that’s alright. Beats version 6.0 works with Elasticsearch and Kibana version 5.6, so you can upgrade Beats now and the rest of the stack later.

filebeats probablemente reemplace a logstash-forwarder


Metricbeat -> extrae métricas de sistema (oficial)
Packetbeat -> Captura trafico y lo analiza, sacando métricas.  (oficial)
heartbeat -> Comprueba disponibilidad de servicios realizando conexiones activas (oficial)
Auditbeat -> extrae información de auditorio (oficial) (version >= 6)
connbeat -> extrae conexiones de red (community)
packagebeat -> Extrae información de paquetes (community) (no compila, pero binario en github)
iobeat -> Extrae información de ios (community) (falla compilación)
lmsensorsbeat -> Extrae información de sensores de la maquina (community) (no compila)

Auditbeat is a lightweight shipper that you can install on your servers to audit the activities of users and processes on your systems. For example, you can use Auditbeat to collect and centralize audit events from the Linux Audit Framework. You can also use Auditbeat to detect changes to critical files, like binaries and configuration files, and identify potential security policy violations.

https://github.com/hartfordfive/protologbeat
Application accepting log data via TCP or UDP to then index the data in Elasticsearch

Generalmente cuando hagamos un go get ..., cuando termine ya habrá compilado el beat.
Si queremos recompilarlo: go build


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
