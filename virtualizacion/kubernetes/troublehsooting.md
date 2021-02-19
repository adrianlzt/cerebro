https://kubernetes.io/docs/tasks/debug-application-cluster/debug-service/

https://learnk8s.io/troubleshooting-deployments

Kubernetes Failure Stories (k8s.af)
https://news.ycombinator.com/item?id=26106080


# Pod que no despliega por insuficientes recursos
https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/

Mirar que requisitos quiere el pod (todos los containers pueden tener requisitos):
kubectl get pod -o json kube-dns-5bff646c-4q5bj | jq .spec.containers[].resources.requests

Parece que no podemos obtener los datos de "Allocated resources" en formato json: https://github.com/kubernetes/kubernetes/issues/25355
Comando para ver los recursos que ofrece cada nodo y como están de ocupados.
kubectl get -o json nodes | jq '.items[] | .metadata.name,.status.allocatable'; kubectl describe nodes | grep -A 4 -e "Name:" -e "Allocated resources:" | grep -e "Name:" -e "Allocated" -e "Requests" -e "%"

Mirando esos valores tendremos que ver que lo que nos está pidiendo el pod no tiene hueco en los servers.
Tambien chequear las reglas de (anti)afinidad. A lo mejor cabe en un server pero tiene una regla de que no puede estar junto con ese pod (por ejemplo, dos del mismo tipo)



# Services
mirar en services.md



# pod en pending
mirar si está esperando por algún PVC


had taints that the pod didn't tolerate
Mirar si los nodos estan bajo presión (no tienen suficiente disco/mem/cpu)



# pod en terminating indefinidamente
Un nodo del cluster sale abruptamente o deja de contestar.
Los pods se quedan en terminating y no se crean nuevos que los sustituyan.
Esto puede deberse a que esos pods estén usando volúmenes locales de ese nodo.
También puede deberse a que el pod en el nodo que ha salido abruptamente no ha avisado al storage de que desmonte el volumen, por lo que el nuevo pod no puede montarlo.
