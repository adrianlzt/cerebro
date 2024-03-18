PENDING_STATUS
Si vemos esto seguramente es porque alguno de los elementos no está consiguiendo arrancar.
Tal vez un pod "Pending", o un svc/LoadBalancer?
Tal vez pods con PVC no resueltos?

usar "helm status <release_name>" para que nos devuelva el estado de los objetos creados

Para saber el error:
helm history <release_name>

Si da un timeout, hacer un:
kubectl get all

Mirar si hay algo pending.
