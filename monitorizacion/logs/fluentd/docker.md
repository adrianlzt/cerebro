https://hub.docker.com/r/fluent/fluentd/

Si queremos poner plugins tendremos que consutir nuestra propia imagen a partir de la imagen onbuild.
Instrucciones en la web de hub.docker.com


Ejemplo arrancando un agente con una config almacenada localmente y con el puerto 9880 abierto para enviarle trazas mediante HTTP:
docker run --rm -it -v "$PWD/config_simple.conf:/fluentd/etc/fluent.conf" -p 9880:9880 fluent/fluentd:v0.12
