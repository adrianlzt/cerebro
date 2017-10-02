https://github.com/openshift/origin-aggregated-logging

Los containers corren en docker con el log-driver journald (configurable? si usa el driver json fluentd tambien lo captura)
Fluentd (version 0.12.32 para openshift 3.5) coge los logs de los pods de journald, les añade cierta metadata y lo almacena en ElasticSearch.
Los pods de fluentd se despliegan con un DaemonSet en el project logging.
Kibana muestra los datos almacenados en ElasticSearch (dentro del pod de kibaba hay otro container para gestionar el login).
Curator: automáticamente borra índices antiguos según proyecto. Mirar config con el "oc dc logging-curator"

Al arrancar al pod se ejecutará el script run.sh que a su vez llamará a generate_throttle_configs.rb para generar la configuración dinámica necesaria.

Fluentd, input.
 - leer de /run/log/journal, configs.d/dynamic/input-syslog-default-syslog.conf
 - fichero de posicion en /var/log/journal.pos
Fluentd, filtros.
 - se excluyen los logs de debug (configs.d/openshift/filter-exclude-journal-debug.conf)
 - se reescribe CONTAINER_NAME para organizarlos si son de infraestructura, logging, fluentd, generales o fuera de openshift
 - se usa el plugin kubernetes_metadata para agregar más datos a los logs
 - se limpian ciertos campos de los logs de kibana? configs.d/openshift/filter-kibana-transform.conf
 - ciertas adaptaciones de los logs de los containers, configs.d/openshift/filter-k8s-record-transform.conf configs.d/openshift/filter-syslog-record-transform.conf


Se puede activar la monitorización de los agentes (http://docs.fluentd.org/v0.12/articles/monitoring) con la variable ENABLE_MONITOR_AGENT
Se puede activar el debug de los agentes (http://docs.fluentd.org/v0.12/articles/monitoring#debug-port) con la variable ENABLE_DEBUG_AGENT


Tendremos un index ".operations.YYYY.MM.DD" donde se almacenarán las trazas de los services de openshift (proyectos "default", "openshift", "openshift-infra").

Otro de .kibana (interno entiendo).

.searchguard, uso?

.project.XXX.UUID... logs de cada proyecto (aunque no veo los de openshift-infra ni default)


# Splunk
Montar un fluentd nuestro que escuche las peticiones de las llamadas de los agentes fluentd y reenvie los logs a splunk.
Hace falta modificar el DaemonSet de fluentd para añadirle un redireccionador (buscar como hacer secure-forward).
https://github.com/parolkar/fluent-plugin-splunk
https://docs.openshift.com/container-platform/3.4/install_config/aggregate_logging.html


# Troubleshooting
https://github.com/openshift/origin-aggregated-logging/blob/master/docs/checking-efk-health.md
https://docs.openshift.com/enterprise/3.2/install_config/aggregate_logging.html#aggregate-logging-performing-elasticsearch-maintenance-operations


# Elasticsearch
Conectar al elastic:

oc project logging
oc rsh <elastic_pod>
curl --key /etc/elasticsearch/secret/admin-key --cert /etc/elasticsearch/secret/admin-cert --cacert /etc/elasticsearch/secret/admin-ca "https://localhost:9200/"

Estado cluster:
curl -s --key /etc/elasticsearch/secret/admin-key --cert /etc/elasticsearch/secret/admin-cert --cacert /etc/elasticsearch/secret/admin-ca "https://localhost:9200/_cluster/health?pretty"

Indices de kibana (cortando parte de las fechas):
curl -s --key /etc/elasticsearch/secret/admin-key --cert /etc/elasticsearch/secret/admin-cert --cacert /etc/elasticsearch/secret/admin-ca "https://localhost:9200/_aliases/?pretty" | grep -v -e aliases -e "\s*}" | cut -d '.' -f 1,2,3 | sort | uniq | tr -d '"{:'

Settings de todos los indices:
curl -s --key /etc/elasticsearch/secret/admin-key --cert /etc/elasticsearch/secret/admin-cert --cacert /etc/elasticsearch/secret/admin-ca "https://localhost:9200/_all/_settings?pretty" |more


Las claves las podemos sacar de etcd (en base64)
etcdctl2 get /kubernetes.io/secrets/logging/logging-elasticsearch


Config de ES:
/usr/share/java/elasticsearch/config/


Por defecto un shard y 0 replication para los indices.
Los indices .searchguard.logging-es-XXX tienen un shard y 2 replicas.
