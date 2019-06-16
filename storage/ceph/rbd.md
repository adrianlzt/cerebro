http://docs.ceph.com/docs/master/rbd/
http://docs.ceph.com/docs/master/rbd/rados-rbd-cmds/

Crear block devices sobre CEPH

Crear el pool donde se almacenará el rbd (por defecto espera un pool llamado "rbd")
ceph osd pool create NOMBREPOOL 16
ceph osd pool application enable NOMBREPOOL rbd

Para ver el número de PGs consultar https://ceph.com/pgcalc/

Ver pools con rbd enabled:
ceph osd pool application get


# Auth
http://docs.ceph.com/docs/master/rbd/rados-rbd-cmds/
http://docs.ceph.com/docs/mimic/rados/operations/user-management/
Crear un usuario para que pueda usar la cli rbd

ceph auth get-or-create client.NOMBREUSER mon 'profile rbd' osd 'profile rbd pool=NOMBREPOOL'
  nos devuelve el contenido del fichero /etc/ceph/ceph.client.NOMBREUSER.keyring
Luego usaremos "rbd --user NOMBREUSER -p NOMBREPOOL ..."

ceph auth get-or-create client.qemu mon 'profile rbd' osd 'profile rbd pool=vms, profile rbd-read-only pool=images'
  varios profiles


# CLI
rbd carga el modulo "rbd" en el kernel, si no lo está (pero no lo deja activo).
Si queremos que rbd se cargue en el boot del sistema:
echo "rbd" > /etc/modules-load.d/ceph-rbd.conf


Por defecto la cli "rbd" atacará al pool "rbd"
Si queremos usar otro pool: rbd -p NOMBREPOOL ...

## Crear un rbd
rbd create NOMBRE --size 500
  creamos un rbd de 500MB cuyo nombre (image) sea NOMBRE

## Consultar RBDs
rbd ls

## Info
rbd info --image NOMBRE

## Uso storage
rbd du

## Resize
rbd resize --size 2048 foo (to increase)
rbd resize --size 2048 foo --allow-shrink (to decrease)


## Mapear un rbd como un device en el kernel
https://access.redhat.com/documentation/en-us/red_hat_ceph_storage/1.2.3/html/ceph_block_device/map-a-block-device

rbd map pool/image
  sacará por stdout el nombre del device (en centos por ejemplo, /dev/rbd0)

Si falla por "RBD image feature set mismatch" es porque el módulo del kernel no implementa todas las features que tiene esa imagen de rbd.
Podemos ejecutar el comando "rbd feature ..." que nos sugiere para solucionarlo.
  Esta modificación de features se quedará de forma permanente en la imagen.

Para usarlo como un FS:
mkfs.ext4 /dev/rbd0
mount /dev/rbd0 /mnt

Podemos montarlo en varios sitios al mismo tiempo, pero entiendo que tendremos que usar un FS que soporte este tipo de caso.
Con ext4 no funciona bien (no se ven los cambios de uno a otro y al final guarda los últimos)

Para desmontarlo:
umount /mnt
rbd unmap /dev/rbd0
