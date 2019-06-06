# Postgres operator
https://github.com/zalando/postgres-operator

El chart de helm parece que está desactualizado.

kubectl create -f manifests/configmap.yaml
  tunear para adaptarlo a nuestras necesidades
  al menos cambiar el nombre del cluster
kubectl create -f manifests/operator-service-account-rbac.yaml
  cambiar el namespace donde se crea
kubectl create -f manifests/postgres-operator.yaml
