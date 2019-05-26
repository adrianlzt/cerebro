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

