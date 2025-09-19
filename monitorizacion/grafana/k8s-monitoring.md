Tiene un helm para desplegar sus agentes de monitorización (alloy).

Se despliega un helm (grafana-k8s-monitoring) que a su vez despliega un operador (grafana-k8s-monitoring-alloy-operator).
Este operador despliega a su vez 4 helms, uno por agente.
