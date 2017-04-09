http://docs.ceph.com/docs/master/rados/operations/pools/

Son las entidades donde definimos: replicacion, placement groups (en cuantos cachos dividimos los datos), CRUSH rules y podemos hacerle snapshots.

Por defecto tenemos un pool "rbd".


# Listar pools
ceph osd lspools
