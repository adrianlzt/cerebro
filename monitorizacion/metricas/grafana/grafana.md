http://grafana.org/

A beautiful, easy to use and feature rich Graphite dashboard replacement and graph editor.

# Docker
https://registry.hub.docker.com/u/tutum/grafana/
grafana para influxdb

https://registry.hub.docker.com/u/grafana/grafana/
develop 2.0

https://registry.hub.docker.com/u/choopooly/grafana-graphite/
grafana + graphite + statsd


## Instalacion ##

### RPM
sudo yum install https://grafanarel.s3.amazonaws.com/builds/grafana-2.6.0-1.x86_64.rpm

/etc/yum.repos.d/grafana.repo

[grafana]
name=grafana
baseurl=https://packagecloud.io/grafana/stable/el/6/$basearch
repo_gpgcheck=1
enabled=1
gpgcheck=1
gpgkey=https://packagecloud.io/gpg.key https://grafanarel.s3.amazonaws.com/RPM-GPG-KEY-grafana
sslverify=1
sslcacert=/etc/pki/tls/certs/ca-bundle.crt

## Configuración ##
/etc/grafana/grafana.ini

Configurar una fuente de datos (graphite, influxdb, opentsdb)
http://docs.grafana.org/installation/rpm/#adding-data-sources

service grafana-server start

por defecto: admin:admin


## Generar dashboards ##

Para editar un dashboard, pinchamos sobre su nombre y damos a editar.
Para volver al dashboard, pulsamos escape.

En la izquierda vemos unas pestañas de color azul y naranja, eso es para editar las filas.

Un dashboard de ejemplo esta en dashboard-ejemplo.json


## InfluxDB
http://docs.grafana.org/datasources/influxdb/
Al configurar el server, si ponemos Access: proxy, estaremos accediendo mediante Grafana. Direct quiere decir que nuestro navegador pregunta directamente a influxdb.

