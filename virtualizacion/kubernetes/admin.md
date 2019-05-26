# nodo en mantenimiento
https://kubernetes.io/docs/tasks/administer-cluster/cluster-management/#maintenance-on-a-node

Sacar los pods de un nodo
kubectl drain $NODENAME

Si tenemos daemon-sets, tendremos que pasar la opcion: --ignore-daemonsets
Esto hará que esos pods no se saquen. Pero entiendo que podemos continuar con el mantenimiento.


Volver a aceptar pods:
kubectl uncordon $NODENAME

