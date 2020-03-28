http://docs.ceph.com/docs/hammer/man/8/ceph/
http://docs.ceph.com/docs/master/rados/operations/

Mirar monitorizacion.md


# Desactivar un nodo temporalmente
Si es un nodo master, cuidado de no perder el quorum.
https://access.redhat.com/documentation/en-us/red_hat_openstack_platform/8/html/director_installation_and_usage/sect-rebooting-ceph

ceph osd set noout
  desactivar el que se puedan marcar OSDs como fuera del cluster
ceph osd set norebalance
  desactivar el rebalanceo

Al activar alguna de estas flags el health pasará a WARN

reiniciar máquina
ceph -s
  chequear que está de vuelta correctamente. Todos los pgs en estado normal (active+clean)

ceph osd unset noout
ceph osd unset norebalance



# Reiniciar un osd
Seguir el mismo esquema como si fuesemos a parar un nodo temporalmente:
ceph osd set noout; ceph osd set norebalance
systemctl restart ceph-osd@NUM
ceph status
  hasta que no enganche de nuevo el osd veremos: 1 osds down
ceph -s
  esperar hasta que estemos GREEN
ceph osd unset noout; ceph osd unset norebalance



# Quitar un OSD del cluster
https://docs.ceph.com/docs/master/rados/operations/add-or-rm-osds/

Lista de los osds por host
ceph osd status

ceph osd out osd.NUM

After executing the command you should see the placement group states change from active+clean to active, some degraded objects, and finally active+clean when migration completes.
Si el OSD estaba ejecutándose, ahora estaremos en estado up+out

Despues pararemos el servicio osd que corresponda a ese osd.NUM (stop & disable):
ceph-osd@NUM.service

This step removes the OSD from the CRUSH map, removes its authentication key. And it is removed from the OSD map as well (para versiones >= Luminous)
ceph osd purge {id} --yes-i-really-mean-it

Esto va a provocar otro "Degraded data redundancy". Se recupera solo?


En el nodo que tenga la copia master de /etc/ceph/ceph.conf borrar la entrada (si existe) y distribuir el nuevo fichero al resto de nodos:
Deberia tener una entrada tipo:
[osd.NUM]
    host = {hostname}

