Una buena idea es coger el /dev/log de la máquina (donde se escriben los logs para syslog) y apuntarlo a nuestra máquina.
Así conseguiremos tener en nuestro /var/log local los logs generados por la app

docker run ... -v /dev/log:/dev/log ...
