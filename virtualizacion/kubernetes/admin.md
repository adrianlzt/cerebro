https://kubernetes.io/docs/reference/kubectl/cheatsheet/#interacting-with-nodes-and-cluster


# nodo en mantenimiento
https://kubernetes.io/docs/tasks/administer-cluster/cluster-management/#maintenance-on-a-node

Sacar los pods de un nodo
kubectl drain $NODENAME

Si tenemos daemon-sets, tendremos que pasar la opcion: --ignore-daemonsets
Esto hará que esos pods no se saquen. Pero entiendo que podemos continuar con el mantenimiento.
Si tenemos pods con local storage (por ejemplo, el dashboard) se quejará y pedirá que borremos ese local storage. Si lo vamos a reiniciar podemos ignorarlo.

Entrar al nodo y parar todos los containers (primero parar estos para que no los vuelvan a arrancar):
systemctl stop kubelet
systemctl stop etcd
docker stop $(docker ps --format "{{.ID}}")

Terminar de parar todo:
systemctl stop docker
  o dockerd, creo que depende de versión
systemctl stop containerd
  tal vez este solo en rhel/centos?



Volver a aceptar pods:
kubectl uncordon $NODENAME


# Añadir un nodo
Desde un nodo master
kubeadm token create --print-join-command

Nos dará un comando "kubeadm join ..." para ejecutar en el nodo que queramos añadir.


# Quitar un nodo
Apagarlo y sacarlo de kubernetes
kubectl delete node <ip-of-node>

Podemos usar el playbook remove-node.yml de kubespray para limpiarlo.
  drain node
  para servicios
  borra ficheros/directorios
  kubectl delete


### Quitar un nodo de etcd
https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/#replacing-a-failed-etcd-member

Lo eliminamos del cluster:
etcdctl --cert-file /etc/ssl/etcd/ssl/admin-$(hostname).pem --key-file /etc/ssl/etcd/ssl/admin-$(hostname)-key.pem --ca-file /etc/ssl/etcd/ssl/ca.pem --endpoints https://10.0.2.26:2379 member list
etcdctl --cert-file /etc/ssl/etcd/ssl/admin-$(hostname).pem --key-file /etc/ssl/etcd/ssl/admin-$(hostname)-key.pem --ca-file /etc/ssl/etcd/ssl/ca.pem --endpoints https://10.0.2.26:2379 member remove b92668d10d79664b
etcdctl --cert-file /etc/ssl/etcd/ssl/admin-$(hostname).pem --key-file /etc/ssl/etcd/ssl/admin-$(hostname)-key.pem --ca-file /etc/ssl/etcd/ssl/ca.pem --endpoints https://10.0.2.26:2379 cluster-health

Parar y deshabilitar etcd en el nodo que sacamos:
systemctl stop etcd
systemctl disable etcd

Podemos borrar ficheros de conf:
rm -rf \
/etc/etcd.env \
/etc/systemd/system/etcd.service \
/usr/local/bin/etcdctl \
/usr/local/bin/etcd \
/var/lib/etcd/member/ \
/etc/ssl/etcd/ssl/admin* \
/etc/ssl/etcd/ssl/member*

Podemos borrar tambien los /etc/ssl/etcd/ssl/member*, MENOS el del propio host




# Cambiar ip internal de un nodo worker
Modificarla en /etc/kubernetes/kubelet.env
kubeadm reset
systemctl restart kubelet
Obtener el comando de join en un master y ejecutarlo:
kubeadm join...

En los logs se quejaba de un error con cálico, una conf que no estaba.
Tuve que copiar de un worker que funcionaba el fichero /etc/cni/net.d/10-calico.conflist, modificando el hostname.
