https://github.com/openshift/origin-metrics

Heapster: coge métricas de todo el cluster (master api/, nodes /stats, system level cpu, mem, net) y las envía a Hawkular https://github.com/kubernetes/heapster
Hawkular: metric storage, por debajo usa cassandra para el almacenamiento
Cassandra: data store para las métricas de hawkular


Hawkular openshift agent (https://github.com/hawkular/hawkular-openshift-agent), para recoger métricas que exporten los pods (nivel aplicación)
Este va a ser el que sustituya a Heapster en próximas versiones.


Hawkular esta expuesto mediante un route+service.

Para ver como usarlo, API, etc mirar monitorizacion/metricas/hawkular.md
