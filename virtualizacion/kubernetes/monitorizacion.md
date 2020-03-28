Chequear los certificados de etcd


https://github.com/robscott/kube-capacity
kubectl krew install resource-capacity
Por nodo, nos da los requests, limits, etc


Si un nodo se queda freeze puede bloquear servicios:
 - si el pod/servicio usaba volumenes locales de ese host
 - si el pod/servicio usaba un volumen ceph/rbd y el host no envío la orden de desmontar, por lo que k8s es incapaz de montar el volumen en un nuevo pod
