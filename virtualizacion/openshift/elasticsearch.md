https://docs.openshift.com/enterprise/3.2/install_config/aggregate_logging.html#aggregate-logging-performing-elasticsearch-maintenance-operations

Conectar al elastic:

oc project logging
oc rsh <elastic_pod>
curl --key /etc/elasticsearch/secret/admin-key --cert /etc/elasticsearch/secret/admin-cert --cacert /etc/elasticsearch/secret/admin-ca "https://localhost:9200/"

Estado cluster:
curl -s --key /etc/elasticsearch/secret/admin-key --cert /etc/elasticsearch/secret/admin-cert --cacert /etc/elasticsearch/secret/admin-ca "https://localhost:9200/_cluster/health?pretty"

Indices de kibana (cortando parte de las fechas):
curl -s --key /etc/elasticsearch/secret/admin-key --cert /etc/elasticsearch/secret/admin-cert --cacert /etc/elasticsearch/secret/admin-ca "https://localhost:9200/_aliases/?pretty" | grep -v -e aliases -e "\s*}" | cut -d '.' -f 1,2,3 | sort | uniq | tr -d '"{:'


Las claves las podemos sacar de etcd (en base64)
etcdctl2 get /kubernetes.io/secrets/logging/logging-elasticsearch


Config de ES:
/usr/share/java/elasticsearch/config/
