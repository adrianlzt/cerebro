Chequear los certificados de etcd

Problemas de lentitud de etcd
May 24 03:40:24 localhost etcd: 2020-05-24 08:40:24.738911 W | etcdserver: read-only range request "key:\"/registry/leases/kube-node-lease/HOSTNAME\" " with result "range_response_count:1 size:297" took too long (313.785859ms) to execute


Certificados del cluster:
kubeadm certs check-expiration


Y los de los apiserver. Deberían renovarse solos, pero puede fallar la renovación. Estos deberían renovarse solos o es el del kubelet el que se renueva solo?
Vigilar también la CA de esos certs
Si se ha instalado con kubespray
messages

El del kubelet está en /var/lib/kubelet/pki/kubelet.crt


Vigilar tamién caducidad de los certs de los usuarios (apuntarlo en algún lado? se almacenan en k8s?)


https://github.com/robscott/kube-capacity
kubectl krew install resource-capacity
Por nodo, nos da los requests, limits, etc


Si un nodo se queda freeze puede bloquear servicios:
 - si el pod/servicio usaba volumenes locales de ese host
 - si el pod/servicio usaba un volumen ceph/rbd y el host no envío la orden de desmontar, por lo que k8s es incapaz de montar el volumen en un nuevo pod


https://www.weave.works/oss/scope/
https://github.com/weaveworks/scope
Despliega un prometheus, exportes y agentes de weave para recolectar métricas del cluster.
Ofrece varias vistas.
 - un dashboard de cosas desplegadas similar al dashboard oficial
 - una vista de relaciones entre pods y los datos de cada pod (procesos, consumos, etc)
 - una vista de monitorización

UI en react: https://github.com/weaveworks/scope/tree/master/client



Los deployments están creando los replication controller adecuados.
Debido a un bug los deployments tenían una imagen definida, pero los replication controller no se estaban generando con la nueva imagen


Monitorizar que el networking está funcionando.
Por ejemplo, si tenemos algún node port usado globalmente, que conteste.
Que los pods, por ejemplo de cálilo, estén healthy
