https://docs.fluentd.org/v0.12/articles/config-file

Generalmente tendremos un fichero /etc/fluent/fluent.conf donde haremos includes a otros ficheros en /etc/fluent/configs.d/
@include configs.d/dynamic/input-docker-*.conf


Directivas de configuración:
source    directives determine the input sources.
match     directives determine the output destinations.
filter    directives determine the event processing pipelines.
system    directives set system wide configuration.
label     directives group the output and filter for internal routing
@include  directives include other files.
