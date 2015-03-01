https://registry.hub.docker.com/u/choopooly/grafana-graphite/
https://github.com/choopooly/docker-grafana-graphite
docker run choopooly/grafana-graphite
default 10s:7d

graphite + grafana + statsd



Solo graphite
https://index.docker.io/u/nickstenning/graphite/
https://github.com/nickstenning/docker-graphite
docker run -d nickstenning/graphite

Retencio por defecto:
retentions = 10s:8d,1m:31d,10m:1y,1h:5y

Para asignar otros puertos distintos (se eligen aleatoriamente):
docker run -p 80 -p 2003 -p 2004 -p 7002 -d nickstenning/graphite


ANTIGUA
http://blog.docker.io/2013/07/effortless-monitoring-with-collectd-graphite-and-docker/
docker pull lopter/collectd-graphite

Hablan de instalar collectd en los containers.
