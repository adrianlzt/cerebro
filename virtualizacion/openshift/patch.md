# patch
https://kubernetes.io/docs/user-guide/kubectl/v1.8/#patch
https://kubernetes.io/docs/tasks/run-application/update-api-object-kubectl-patch/
https://kubernetes-v1-4.github.io/docs/user-guide/kubectl/kubectl_patch/

Sobre un objeto queremos realizar un cambio.
Le pasamos un json con el cambio que queremos hacer.
oc patch TIPO OBJECTO -p '{PARCHE}'

Agregar un elemento a un ConfigMap
oc patch cm cyclops-agent-config-map -p '{"data":{"otro":"cmd=/usr/lib64/nagios/plugins/check_dummy 1 WARNING"}}'

Borrar un elemento:
oc patch cm cyclops-agent-config-map -p '{"data":{"otro":None}}'
