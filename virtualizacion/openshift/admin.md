https://docs.openshift.com/container-platform/3.5/admin_guide/index.html#admin-guide-index

Si estamos como administrador, en alguno de los proyectos (oc projects) deberán estar los containers de infraestructura.
oc status


Al menos tendremos:
 docker-registry
 kubernetes
 router




# Gestion de nodos

Reiniciar docker
Si reiniciamos el servicio docker de un nodo los pods no se moverán.
Simplemente pasarán a estado Error y luego volverán a arrancar, poniendo +1 al número de restarts.


Lista de nodos
oc get nodes

Detalle de un nodo:
oc describe node XXX

No permitir que se monten mas pods (SchedulingDisabled)
oadm cordon NODE


List all pods on given nodes
oadm manage-node NODE1 NODE2 ... --list-pods
  podemos poner varios nodos

Evacuar nodo (sacar todos los pods)
oadm drain NODE
  antes de empezar hace un cordon del nodo

Migrate selected pods
oadm manage-node NODE --evacuate --pod-selector="<service=myapp>"
oadm manage-node <node1> <node2> --evacuate [--pod-selector=<pod_selector>]


Permitir que se ejecuten pods:
oadm uncordon NODE



# ETCD
Contenido
etcdctl2 ls

En /etc/profile.d/etcdctl.sh estan definidos los bash alias (etcdctl2 y etcdctl3)

dos keys distintas:
/kubernetes.io
/openshift.io


## PODs
listar todos los pods:
oc get pods --all-namespaces
etcdctl2 --endpoint https://esjc-osh1-ma01p.om.dsn.inet:2379 ls --recursive /kubernetes.io/pods

estado de un pod:
get /kubernetes.io/pods/PROYECTO/NOMBRE_POD | python -m json.tool

Buscar algo en todos los pods
for i in $(etcdctl2 ls --recursive /kubernetes.io/pods); do etcdctl2 get $i 2> /dev/null | grep docker-registry > /dev/null && echo $i; done

## Projects (en kubernetes le llama namespaces)
ls /kubernetes.io/namespaces/

## BuildConfigs
ls /openshift.io/buildconfigs/

## ImageStreams
ls /openshift.io/imagestreams/

## Builds
ls /openshift.io/builds/

## DeploymentConfig
ls /openshift.io/deploymentconfigs

## Images
ls /openshift.io/images

## Routes
ls /openshift.io/routes

## Templates
ls /openshift.io/templates


