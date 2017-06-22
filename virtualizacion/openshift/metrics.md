https://github.com/openshift/origin-metrics

Heapster: coge métricas de todo el cluster (master api/, nodes /stats, system level cpu, mem, net) y las envía a Hawkular
Hawkular: metric storage, por debajo usa cassandra para el almacenamiento
Cassandra: data store para las métricas de hawkular


Hawkular openshift agent (https://github.com/hawkular/hawkular-openshift-agent), para recoger métricas que exporten los pods (nivel aplicación)


Hawkular esta expuesto mediante un route+service.
