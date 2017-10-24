mirar stats.md performance.md

http://dockerana.com/
https://blog.codeship.com/monitoring-docker-containers/

Docker completo para monitorizar otras instancias docker.
Usa graphite y grafana.


https://github.com/newrelic/check_docker
https://github.com/influxdata/telegraf/tree/master/plugins/inputs/docker


https://github.com/google/cadvisor
cAdvisor (Container Advisor) provides container users an understanding of the resource usage and performance characteristics of their running containers. It is a running daemon that collects, aggregates, processes, and exports information about running containers. Specifically, for each container it keeps resource isolation parameters, historical resource usage, histograms of complete historical resource usage and network statistics. This data is exported by container and machine-wide.

Permite exportar los datos para influxdb



cockpit


# Que checkear con checks de icinga/nagios
proceso corriendo
tiempo en retornar "info": curl -s -w "%{time_total}" --unix-socket /var/run/docker.sock http:/v1.22/info -o /dev/null
tiempo en retornar "images"
  tiempos de respuesta altos podrian deberse a un gran número de imagenes almacenadas
  3.7k images, response time to "docker info" about 10"
  470 images, about 0.5s
número de imágenes almacenadas
número de containers corriendo
uso de memoria rss
disco disponible para data, metadata, thin pool (consultar en API 1.24/info)

