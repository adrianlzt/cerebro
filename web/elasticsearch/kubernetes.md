https://www.elastic.co/guide/en/cloud-on-k8s/current/index.html#k8s-deploy-eck

# ECK
Kubernetes operator
Crea un operador de kubernetes que nos permite hacer despliegues de ES de forma más sencilla.
Crea los sigueintes CRDs:
apmservers.apm.k8s.elastic.co
clusterlicenses.elasticsearch.k8s.elastic.co
elasticsearches.elasticsearch.k8s.elastic.co
enterpriselicenses.elasticsearch.k8s.elastic.co
kibanas.kibana.k8s.elastic.co
remoteclusters.elasticsearch.k8s.elastic.co
trustrelationships.elasticsearch.k8s.elastic.co
users.elasticsearch.k8s.elastic.co

Crea un service/kubernetes en el NS default. Parece que por detrás lo que contesta es la api de kubernetes

También crea un NS "elastic-system" con el pod del operador, un service (elastic-webhook-service) y un statefulset (elastic-operator)


# Crear ES
Levantar un servidor de ES

cat <<EOF | kubectl apply -f -
apiVersion: elasticsearch.k8s.elastic.co/v1alpha1
kind: Elasticsearch
metadata:
  name: quickstart
spec:
  version: 7.1.0
  nodes:
  - nodeCount: 1
    config:
      node.master: true
      node.data: true
      node.ingest: true
EOF

Crea dos services (elastic + elastic-discovery) y un pod (más el CRD de elasticsearch)
Tambien una serie de secrets

# Ver ESs
kubectl get elasticsearch

Pods asociados:
kubectl get pods --selector='elasticsearch.k8s.elastic.co/cluster-name=quickstart'

Acceso desde nuestro pc:
kubectl port-forward service/quickstart-es 9200

Obtener password:
PASSWORD=$(kubectl get secret quickstart-elastic-user -o=jsonpath='{.data.elastic}' | base64 --decode)

curl -u "elastic:$PASSWORD" -k "https://localhost:9200"


