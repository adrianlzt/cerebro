https://github.com/openshift/origin-aggregated-logging

Fluentd coge los logs de los pods, les añade cierta metadata y lo almacena en ElasticSearch.
Kibana muestra los datos almacenados en ElasticSearch (dentro del pod de kibaba hay otro container para gestionar el login).
Curator: automáticamente borra índices antiguos según proyecto. Mirar config con el "oc dc logging-curator"

Docker usa el logging backend journald (o json).
Fluentd lee el journald (junto con otros datos para enriquecer las trazas con metadata) y lo manda a ElasticSearch

Tendremos un index ".operations.YYYY.MM.DD" donde se almacenarán las trazas de los services de openshift.

Otro de .kibana (interno entiendo).

.searchguard, logging para kibana??

.project.XXX.UUID... logs de cada proyecto (aunque no veo los de openshift-infra ni default)


# Splunk
Montar un fluentd nuestro que escuche las peticiones de las llamadas de los agentes fluentd y reenvie los logs a splunk.
Hace falta modificar el DaemonSet de fluentd para añadirle un redireccionador (buscar como hacer secure-forward).
https://github.com/parolkar/fluent-plugin-splunk
https://docs.openshift.com/container-platform/3.4/install_config/aggregate_logging.html


# Troubleshooting
https://github.com/openshift/origin-aggregated-logging/blob/master/docs/checking-efk-health.md
