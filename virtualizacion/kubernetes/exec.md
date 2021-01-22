Entrar en un pod:
kubectl exec pod -- bash

Si el pod no está corriendo como root y necesitamos acceder como root, podemos usar este plugin:
https://github.com/jordanwilson230/kubectl-plugins/

kubectl exec-as -u 0 postgres-postgresql-0 -- bash
Lo que hace es levantar otro container con acceso a /var/lib/docker.sock y conectar por ahí.
