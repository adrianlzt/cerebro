# Stackgres
https://stackgres.io/
StackGres 1.0.0 is an Open Source Postgres-as-a-Service that runs on any Kubernetes environment. StackGres is the Postgres platform with more Postgres extensions available: 120 as of today. Many more to come in the future.




# Helm
https://github.com/helm/charts/tree/master/stable/postgresql

Si borramos el helm, recordar borrar el pvc. Si no, se reusará y las configs que apliquemos en el helm no se estarán usando (por ejemplo, si cambiamos la pass)



# Postgres operator
Dos diferentes
https://github.com/zalando/postgres-operator
https://www.kubegres.io/


El chart de helm parece que está desactualizado.

kubectl create -f manifests/configmap.yaml
  tunear para adaptarlo a nuestras necesidades
  al menos cambiar el nombre del cluster. BUG, aun no released, no permite cambiar el nombre del cluster: https://github.com/zalando/postgres-operator/commit/ebda39368ec6336c930f7fb93d7b428568c5a27d
  en este fichero parece que va forzado que los clusters se llamen {TEAM}-{NAME}
kubectl create -f manifests/operator-service-account-rbac.yaml
  cambiar el namespace donde se crea
kubectl create -f manifests/postgres-operator.yaml

Esperar a que se cree el operator:
kubectl get pod -l name=postgres-operator -w

Mirar los logs para comprobar que todo va bien.


Crear un postgres, o cluster de postgres:
manifests/minimal-postgres-manifest.yaml
En el manifest especificaremos los usuarios a crear, las databases y quien tendrá acceso a que.
El nombre, si no lo hemos cambiado en el configmap, deberá ser {TEAM}-{NAME}
El team está definido en el spec al crear el cluster.

Ejemplo tambien mostrando que podemos pasar un storageClass al volume:
kind: postgresql
metadata:
  name: pepe-nombre
spec:
  teamId: "PEPE"
  volume:
    size: 5Gi
    storageClass: rook-ceph-block-replica3


