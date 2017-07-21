https://github.com/openshift/origin-aggregated-logging

Fluentd coge los logs de los pods, les añade cierta metadata y lo almacena en ElasticSearch.
Kibana muestra los datos almacenados en ElasticSearch (dentro del pod de kibaba hay otro container para gestionar el login).
Curator: automáticamente borra índices antiguos según proyecto. Mirar config con el "oc dc logging-curator"

Docker usa el logging backend journald (o json).
Fluentd lee el journald (junto con otros datos para enriquecer las trazas con metadata) y lo manda a ElasticSearch


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
