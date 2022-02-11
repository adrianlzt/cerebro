mirar velero.md

Usar kubectl get -o yaml para obtener backups de los recursos
https://github.com/kubernetes/kubernetes/issues/24873

Solía existir un --export para solo dejar campos sin referencia al recurso creado, pero está deprecated
https://stackoverflow.com/questions/61392206/kubectl-export-is-deprecated-any-alternative


Mirar todos los recursos:
kubectl api-resources --verbs=list --namespaced -o name | xargs -n 1 kubectl get --show-kind --ignore-not-found
