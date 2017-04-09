http://docs.ceph.com/docs/hammer/man/8/ceph/
http://docs.ceph.com/docs/master/rados/operations/




# Quitar un OSD del cluster
http://docs.ceph.com/docs/hammer/rados/operations/add-or-rm-osds/

ceph osd out osd.NUM

After executing the command you should see the placement group states change from active+clean to active, some degraded objects, and finally active+clean when migration completes.
Si el OSD estaba ejecutándose, ahora estaremos en estado up+out

Despues pararemos el servicio osd que corresponda a ese osd.NUM:
ceph-osd@NUM.service

Ahora lo eliminaremos delo CRUSH map:
ceph osd crush remove osd.NUM

Quitaremos la clave de auth:
ceph auth del osd.NUM

Borraremos el OSD:
ceph osd rm osd.NUM

En el nodo que tenga la copia master de /etc/ceph/ceph.conf borrar la entrada (si existe) y distribuir el nuevo fichero al resto de nodos:
Deberia tener una entrada tipo:
[osd.1]
    host = {hostname}

