http://docs.ceph.com/docs/master/rados/operations/pools/
mirar conceptos.md

Particiones lógicas para almacenar objetos.

Son las entidades donde definimos: replicacion, placement groups (en cuantos cachos dividimos los datos), CRUSH rules y podemos hacerle snapshots.

Por defecto tenemos un pool "rbd" (.rgw.root en versiones nuevas, visto en 12.x)
Si usamos rgw, se crearán automáticamente los pools:
 .rgw.root
 default.rgw.control
 default.rgw.meta
 default.rgw.log
 default.rgw.buckets.index

Por defecto CEPH creará 3 réplicas de cada objeto.
  Definido por la configuración: osd pool default size = 3

También se define el mínimo número de réplicas para casos de degradación (si no tenemos min sizes, no se aceptan IOs https://access.redhat.com/documentation/en-us/red_hat_ceph_storage/2/html/storage_strategies_guide/pools-1#:~:text=By%20default%2C%20Ceph%20creates%20two,or%20a%20size%20of%203%20.):
  osd pool default min size = 2


# Listar pools
ceph osd lspools


# Pool statistics
rados df

# Modificar pool
ceph osd pool set .rgw.root min_size 1
ceph osd pool set .rgw.root size 1

# Mirar pg y pgp
ceph osd pool get NOMBREPOOL pg_num
ceph osd pool get NOMBREPOOL pgp_num

# Crear un pool
ceph osd pool create {pool-name} pg_num
  para saber que poner en pg_num consultar placement_groups.md


# Borrar un pool
Primero tenemos que activar el "mon allow pools delete".
Para ello he añadido, en la sección [global] de /etc/ceph/ceph.conf
mon allow pool delete = true

En todos los nodos mon. Luego he reiniciando el servicio:
systemctl restart ceph-mon@HOSTNAME.service

Por último borramos el pool (especificando el nombre dos veces y con el flag es confirmación):
ceph osd pool rm adrian adrian --yes-i-really-really-mean-it



