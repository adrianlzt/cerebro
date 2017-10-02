https://github.com/openshift/origin-metrics
https://github.com/openshift/origin-metrics/blob/master/docs/hawkular_metrics.adoc#calcuating-percentage-cpu-usage

Heapster: coge métricas de todo el cluster (master api/, nodes /stats, system level cpu, mem, net) y las envía a Hawkular https://github.com/kubernetes/heapster
Hawkular: metric storage, por debajo usa cassandra para el almacenamiento
Cassandra: data store para las métricas de hawkular


Hawkular openshift agent (https://github.com/hawkular/hawkular-openshift-agent), para recoger métricas que exporten los pods (nivel aplicación)
Este va a ser el que sustituya a Heapster en próximas versiones.


Hawkular esta expuesto mediante un route+service.

Para ver como usarlo, API, etc mirar monitorizacion/metricas/hawkular.md


# Heapster
Los nombres con los que almacena los datos en hawkular los saca del "NAME" del container en docker (del que se ve con docker ps)
Este nombre es el uid que aparece si hacemos un: oc get po xx -o yaml


# Cassandra
Una vez dentro del container podemos conectar con cassandra usando cqlsh.
El fichero de conf esta en:
/home/cassandra/.cassandra/cqlshrc

Logs: /opt/apache-cassandra-3.0.12.redhat-1/logs/

Conectar a la CLI:
cqlsh --ssl
