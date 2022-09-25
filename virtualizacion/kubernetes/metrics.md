# metrics-server
https://www.metricfire.com/blog/how-to-monitor-your-kubernetes-metrics-server/#strongKubernetes-metrics-server-requirementsstrong

kubectl get --raw /apis/metrics.k8s.io/v1beta1/pods

curl -s -k -H "Authorization: Bearer XXX" https://kubernetes.default.svc/apis/metrics.k8s.io/v1beta1/namespaces/SOMENAMESPACE/pods



# Kube-metrics
https://github.com/kubernetes/kube-state-metrics
Expone métricas del funcionamiento del cluster en formato prometheus en /metrics

Beginning in Kube 1.7, each node exposes a /metrics/cadvisor endpoint that reports container metrics for each running pod


# Heapster
https://github.com/kubernetes/heapster
Agente escrito en go que recolecta métricas de los pods y las envia al "sink" configurado: hawkular, influxdb, etc


# Prometheus
https://github.com/openshift/origin/blob/ea587f72039b793768e59936c4299f868e792204/examples/prometheus/prometheus.yaml
Meten un servidor de prometheus dentro de openshift que recolecta las métricas
