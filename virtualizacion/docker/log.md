https://docs.docker.com/engine/admin/logging/view_container_logs/


Una buena idea es coger el /dev/log de la máquina (donde se escriben los logs para syslog) y apuntarlo a nuestra máquina.
Así conseguiremos tener en nuestro /var/log local los logs generados por la app

docker run ... -v /dev/log:/dev/log ...


Existen distintos drivers para los logs. De esta manera los podremos enviar a: syslog, journald, splunk, fluentd, etc
