Para ejecutar logstash en modo debug.

Si lo hemos instalado con el .deb
Editar /etc/defaults/logstash
LS_OPTS="--log ${LOG_FILE} --debug"


Si arrancamos a mano:
java -jar logstash.xxx.jar agent -f fichero.conf --debug
