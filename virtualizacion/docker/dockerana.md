mirar stats.md performance.md

Comparación varias soluciones, algunas de pago, Nov'17: http://rancher.com/comparing-10-container-monitoring-solutions-rancher

http://dockerana.com/
https://blog.codeship.com/monitoring-docker-containers/

Docker completo para monitorizar otras instancias docker.
Usa graphite y grafana.


https://github.com/newrelic/check_docker
https://github.com/influxdata/telegraf/tree/master/plugins/inputs/docker


https://github.com/google/cadvisor
cAdvisor (Container Advisor) provides container users an understanding of the resource usage and performance characteristics of their running containers. It is a running daemon that collects, aggregates, processes, and exports information about running containers. Specifically, for each container it keeps resource isolation parameters, historical resource usage, histograms of complete historical resource usage and network statistics. This data is exported by container and machine-wide.

Permite exportar los datos para influxdb, ElasticSearc, Redis, Prometheus, kafka, etc



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
puerto, en caso de no usar socket

lvm: https://docs.docker.com/engine/userguide/storagedriver/device-mapper-driver/#manage-devicemapper
vigilar como va el LVM de lleno y si hay logs con problemas


## swarm
que llegamos a los puertos tcp de los otros nodos
puerto de swarm: 2375
numero de nodos en el swarm: /usr/lib64/nagios/plugins/check_generic.pl -e "/usr/bin/docker -H localhost:2375 info 2>/dev/null | grep Nodes | cut -d ' ' -f 2" -p "cluster_nodes" -c '<1' -w '<2'
unhealthy nodes: /usr/lib64/nagios/plugins/check_generic.pl -e "/usr/bin/docker -H localhost:2375 info 2>/dev/null | grep Status | grep -v Healthy | wc -l" -w '>0' -c '>1' -p "unhealthy_nodes"
  parece que este es para el swarm antiguo


