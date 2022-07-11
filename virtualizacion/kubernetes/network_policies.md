https://kubernetes.io/docs/concepts/services-networking/network-policies/

Nos permite definir filtrados a niveles IP o TCP.
Podemos, por ejemplo, limitar el tráfico a dentro del namespace.

Ejemplo limitando el tráfico que puede llegar a un pod de grafana:
https://github.com/prometheus-operator/kube-prometheus/blob/main/manifests/grafana-networkPolicy.yaml
