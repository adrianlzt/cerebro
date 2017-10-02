http://fluentd.org/

"Fluentd" is an open-source tool to collect events and logs. 150+ plugins instantly enables you to store the massive data for Log Search, Big Data Analytics, and Archiving (MongoDB, S3, Hadoop).
Escrito en ruby.

Si queremos flushear el buffer podemos mandarle una señal (https://docs.fluentd.org/v0.12/articles/signals):
kill -s SIGUSR1 PIDFLUENT


http://es.slideshare.net/treasure-data/fluentd-loves-mongodb-at-mongosv-july172012
Comparación contra Scribe y Flume
Otra opción es logplex (de heroku, escrito en erlang)


http://docs.fluentd.org/articles/free-alternative-to-splunk-by-fluentd
fluentd + elasticsearch + kibana

http://tech.riywo.com/blog/2013/12/20/fluentd-on-mesos-plus-docker-plus-marathon/


OpenShift usa fluentd para recoger los logs de la plataforma y los pods y enviarlos a un Elasticsearch para posterior consulta.


Puede leer logs de journald: https://github.com/reevoo/fluent-plugin-systemd
Para instalar esta gema en alpine, necesitaremos el apk libffi-dev
La imagen de fluentd no vale para el plugin de systemd, porque falta la lib libsystemd.so.0 y alpine no soporta systemd asi que no se espera esa lib.

La otra opción es usar una imagen basada en debian:

Crear imagen de docker custom: https://github.com/fluent/fluentd-docker-image

El usuario con el que corra fluentd debe tener permisos para leer los ficheros. Los ficheros tiene grupo systemd-journal y ACL para qe los grupos adm y wheel puedan leer.


# Buffer
https://docs.fluentd.org/v0.14/articles/buffer-plugin-overview

<match *>
 ...
 flush_interval 60s
</match>



# Gestion de fallos
https://docs.fluentd.org/v0.12/articles/failure-scenarios

Se explica que hace fluentd en caso de problemas escribiendo al agente.
Cuando cae el propio agente (podemos configurar para almacenar el buffer en disco para no perder nada)
Cuando cae el storage de destino (se hará buffering y reintentos)
mirar buffer.md
