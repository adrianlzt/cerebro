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
