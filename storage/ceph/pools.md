http://docs.ceph.com/docs/master/rados/operations/pools/

Son las entidades donde definimos: replicacion, placement groups (en cuantos cachos dividimos los datos), CRUSH rules y podemos hacerle snapshots.

Por defecto tenemos un pool "rbd" (.rgw.root en versiones nuevas, visto en 12.x)


# Listar pools
ceph osd lspools


# Pool statistics
rados df

# Modificar pool
ceph osd pool set .rgw.root min_size 1
ceph osd pool set .rgw.root size 1
