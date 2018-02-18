http://docs.ceph.com/docs/master/rados/operations/user-management/


# Listar usuarios
ceph auth ls

# Crear user
ceph auth add client.docker mon 'allow r' osd 'allow rw pool=docker'

# Obtener key
ceph auth print-key client.docker

Con esa key generamos el fichero tipo:
/etc/ceph/ceph.client.docker.keyring
[client.docker]
	key = AQD/v4laT/HiERAA/aBxeqPx3uev2rRheOGiew==

Para usar esa key la copiamos al cliente y hacemos:
ceph -n client.docker health


# Modificar permisos
ceph auth caps client.docker mon 'allow r' osd 'allow rw pool=rbd'
