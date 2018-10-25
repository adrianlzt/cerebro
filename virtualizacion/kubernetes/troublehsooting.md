# Pod que no despliega por insuficientes recursos
https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/

Mirar que requisitos quiere el pod (todos los containers pueden tener requisitos):
kubectl get pod -o json kube-dns-5bff646c-4q5bj | jq .spec.containers[].resources.requests

Parece que no podemos obtener los datos de "Allocated resources" en formato json: https://github.com/kubernetes/kubernetes/issues/25355
Comando para ver los recursos que ofrece cada nodo y como están de ocupados.
kubectl get -o json nodes | jq '.items[] | .metadata.name,.status.allocatable'; kubectl describe nodes | grep -A 4 -e "Name:" -e "Allocated resources:" | grep -e "Name:" -e "Allocated" -e "Requests" -e "%"

Mirando esos valores tendremos que ver que lo que nos está pidiendo el pod no tiene hueco en los servers.
Tambien chequear las reglas de (anti)afinidad. A lo mejor cabe en un server pero tiene una regla de que no puede estar junto con ese pod (por ejemplo, dos del mismo tipo)
