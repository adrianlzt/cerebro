https://docs.openshift.com/container-platform/3.5/admin_guide/index.html#admin-guide-index

Si estamos como administrador, en alguno de los proyectos (oc projects) deberán estar los containers de infraestructura.
oc status


Al menos tendremos:
 docker-registry
 kubernetes
 router




# Gestion de nodos

Lista de nodos
oc get nodes

No permitir que se monten mas pods
oadm cordon NODE

List all pods on given nodes
oadm manage-node NODE1 NODE2 ... --list-pods
  podemos poner varios nodos

Evacuar nodo (sacar todos los pods)
oadm drain NODE

Migrate selected pods
oadm manage-node NODE --evacuate --pod-selector="<service=myapp>"
