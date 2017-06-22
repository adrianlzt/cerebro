https://docs.openshift.com/container-platform/3.5/rest_api/index.html
https://docs.openshift.com/container-platform/3.5/rest_api/kubernetes_v1.html#rest-api-kubernetes-v1
https://docs.openshift.com/container-platform/3.5/rest_api/openshift_v1.html#rest-api-openshift-v1

Segun la doc, una vez logueados, podemos obtener un token (24h de duración) con:
oc whoami -t


Otra opción es coger un token de alguna serviceaccount que tenga permisos:
oc get serviceaccounts
oc describe serviceaccount AAAA
oc describe secret AAAA-token-xxxx


Consultar OpenShift
curl -X GET -H "Authorization: Bearer XXXX" https://openshift.com/oapi/v1
Consultar Kubernetes
curl -X GET -H "Authorization: Bearer XXXX" https://openshift.com/api/v1


La API es HATEOAS por lo que podemos preguntar a oapi/v1 y nos devolverá los paths a los que podemos preguntar.


Metricas de un kubelet (openshift-node), sobre discos, red, cpu, filesystems. 8 últimas medidas (cada 15")
curl -H "Authorization: Bearer xxx" -k https://127.0.0.1:10250/stats/

curl -H "Authorization: Bearer xxx" -k https://127.0.0.1:10250/stats/summary
aqui solo saca la info para un momento determinado, pero nos añade info de los pods
La info de los pods viene de los cgroups.
Por ejemplo, la api nos da: containers[0].cpu.usageCoreNanoSeconds que en el cgroup es:
/sys/fs/cgroup/cpu/system.slice/docker-80adc498ae0a130fb63486b6bc7f9d2341dfd40550d4d7473cb0d79a50ddf83a.scope/cpuacct.usage


Health OpenShift:
curl https://openshift.inet/healthz
  devuelve "ok" si el cluster esta ok

Metrics
curl https://openshift.inet/metrics
  nos devuelve un montón de métricas de tiempos de respuesta para distintas queries a la API
  openshift.com monitoriza:
  apiserver_request_latencies_summary{resource="pods",verb="LIST",quantile=*
  apiserver_request_latencies_summary{resource="clusterresourcequotas",verb="WATCHLIST",quantile=*
  scheduler_e2e_scheduling_latency_microseconds <- este no lo veo en nuestro despliegue

