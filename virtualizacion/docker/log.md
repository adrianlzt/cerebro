https://docs.docker.com/engine/admin/logging/view_container_logs/

Truco redirect syslog:
Una buena idea es coger el /dev/log de la máquina (donde se escriben los logs para syslog) y apuntarlo a nuestra máquina.
Así conseguiremos tener en nuestro /var/log local los logs generados por la app

docker run ... -v /dev/log:/dev/log ...


Existen distintos drivers para los logs. De esta manera los podremos enviar a: syslog, journald, splunk, fluentd, etc


# Logging drivers
Por defecto esta configurado el driver json-file.
Ejemplo de path:
/var/lib/docker/containers/e0e92c39f045c038c221e0162b771e2aa63e124b329399453ae37f2e9e4d4404/e0e92c39f045c038c221e0162b771e2aa63e124b329399453ae37f2e9e4d4404-json.log


Cada container puede correr un driver distinto.
Para conocer cual está usando:
docker inspect -f '{{.HostConfig.LogConfig.Type}}' CONTAINER


Si queremos cambiar el driver a nivel global:
/etc/docker/daemon.json
{
  "log-driver": "syslog"
}

Lista de drivers disponibles:
https://docs.docker.com/engine/admin/logging/overview/#supported-logging-drivers


Fluentd: https://docs.docker.com/engine/admin/logging/fluentd/
Enviar los logs a un container donde este escuchando fluentd.
Cachea. Y cuando se llena la ram del container, que hace? Flush a disco y luego lo recupera?
Llena la memoria de cada container? del host? el flush a disco en donde lo hace?


A partir de 17.05 tambien se puede acoplar logging plugins, que extienden el set de logging outputs diponibles:
https://docs.docker.com/engine/admin/logging/plugins/

Con --log-opts podremos pasarle parametros al plugin

Logging plugin para enviar a redis: https://github.com/pressrelations/docker-redis-log-driver
En caso de no poder conectar con redis hace drop del log:
https://github.com/pressrelations/docker-redis-log-driver/blob/master/driver/driver.go#L148
