http://docs.ceph.com/docs/master/rbd/

Crear block devices sobre CEPH

Crear el pool donde se almacenará el rbd (por defecto espera un pool llamado "rbd")
ceph osd pool create rbd 16
ceph osd pool application enable rbd rbd


# Crear un rbd
rbd create NOMBRE --size 500
  creamos un rbd de 500MB

# Consultar RBDs
rbd ls

# Info
rbd info --image NOMBRE


