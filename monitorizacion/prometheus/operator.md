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


Otro ejemplo, del ingress de nginx
```
spec:
  endpoints:
  - interval: 30s
    port: metrics
  namespaceSelector:
    matchNames:
    - ingress-nginx
  selector:
    matchLabels:
      app.kubernetes.io/component: controller
      app.kubernetes.io/instance: ingress-nginx-public
      app.kubernetes.io/name: ingress-nginx
```

Esto lo que hará es buscar el endpoint con este filtro:
kc -n ingress-nginx get endpoints -l app.kubernetes.io/instance=ingress-nginx-public,app.kubernetes.io/component=controller,app.kubernetes.io/name=ingress-nginx

Quedándose solo con los endpoints que tengan un puerto "metrics".

En la config de prometheus se autogenerará una config tipo:
```
- job_name: serviceMonitor/ingress-nginx/ingress-nginx-public-controller/0
  honor_timestamps: true
  scrape_interval: 30s
  scrape_timeout: 10s
  metrics_path: /metrics
  scheme: http
  follow_redirects: true
  enable_http2: true
  relabel_configs:
  ...
  kubernetes_sd_configs:
  - role: endpoints
    kubeconfig_file: ""
    follow_redirects: true
    enable_http2: true
    namespaces:
      own_namespace: false
      names:
      - ingress-nginx
```

kubernetes_sd_configs es "List of Kubernetes service discovery configurations".
https://prometheus.io/docs/prometheus/latest/configuration/configuration/#kubernetes_sd_config

Podemos ver como están funcionando estos service discovery en la sección "/service-discovery" de la UI.
Por cada SD veremos las labels que ha extraído.

Si las labels hacen match con lo que se busca, veremos también una columna "Target labels".
En este caso veremos un target en la sección "targets" de la UI.

Si vamos a la UI de prometheus, sección "targets", veremos que tendremos un target
serviceMonitor/ingress-nginx/ingress-nginx-public-controller/0
Del que colgarán los endpoints de métricas descubiertos.


Si vemos en el SD el endpoint pero luego no tenemos target, revisar las relabel_configs, ya que alguna no estará funcionando.
Seguramnte porque intente usar una label que no existe.

En el caso de que sea para kube-controller-manager y kube-scheduler, seguir
https://github.com/prometheus-operator/kube-prometheus/issues/1517#issuecomment-594448712
