https://docs.fluentd.org/v0.12/articles/config-file

Generalmente tendremos un fichero /etc/fluent/fluent.conf donde haremos includes a otros ficheros en /etc/fluent/configs.d/

@include configs.d/dynamic/input-docker-*.conf
