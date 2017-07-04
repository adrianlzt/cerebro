https://docs.openshift.com/enterprise/3.2/install_config/aggregate_logging.html#aggregate-logging-performing-elasticsearch-maintenance-operations

Conectar al elastic:

oc rsh <elastic_pod>
curl --key /etc/elasticsearch/secret/admin-key --cert /etc/elasticsearch/secret/admin-cert --cacert /etc/elasticsearch/secret/admin-ca "https://localhost:9200/"


Las claves las podemos sacar de etcd (en base64)
etcdctl2 get /kubernetes.io/secrets/logging/logging-elasticsearch
