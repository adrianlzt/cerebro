# Para Corosync:

Crear el fichero /etc/corosync/service.d/pcmk
600 root:root
service {
        # Load the Pacemaker Cluster Resource Manager
        name: pacemaker
        ver: 0
}

Si ponemos:
ver: 1 <- tendremo que arrancar el demonio pacemaker a mano


# Para CMAN:
yum install pacemaker
chkconfig pacemaker on
service pacemaker start


# CLI y conf del cluster

Instalar cli para gestionar pacemaker:
yum install pcs

Para cluster de dos nodos desactivar el quorum policy:
Desactivar quorum (Pacemaker’s default behavior is to stop all resources if the cluster does not have quorum):
pcs property set no-quorum-policy=ignore

Desactivar stonith si no lo usamos:
pcs property set stonith-enabled=false

Chequear estado cluster:
pcs status
