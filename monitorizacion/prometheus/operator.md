Despliegue del prometheus-operator con configuración y alarmas
https://github.com/prometheus-operator/kube-prometheus


Se crean los siguientes CRDs:

Prometheus: defines the desired Prometheus deployments as a StatefulSet
Alertmanager: defines a desired Alertmanager deployment
ServiceMonitor: declaratively specifies how groups of Kubernetes services should be monitored
PodMonitor: declaratively specifies how groups of pods should be monitored
Probe: declaratively specifies how groups of ingresses or static targets should be monitored
PrometheusRule: defines a desired set of Prometheus alerting and/or recording rules
AlertmanagerConfig: declaratively specifies subsections of the Alertmanager configuration



# ServiceMonitor
Ejemplo sencillo:
https://observability.thomasriley.co.uk/prometheus/configuring-prometheus/using-service-monitors/
```
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  labels:
    serviceMonitorSelector: prometheus
  name: prometheus
  namespace: prometheus
spec:
  endpoints:
  - interval: 30s
    targetPort: 9090
    path: /metrics
  namespaceSelector:
    matchNames:
    - prometheus
  selector:
    matchLabels:
      operated-prometheus: "true"
```

En este ejemplo se dice que se scrapeen todos los pods que cumplan estar en el namespace prometheus y que tengan la label operated-prometheus="true"

Ejemplo más complejo para scrapear kube-controller-manager:
https://github.com/prometheus-operator/kube-prometheus/blob/main/manifests/kubernetesControlPlane-serviceMonitorKubeControllerManager.yaml
