https://github.com/ceph/go-ceph

Es un binding a la librados:
http://docs.ceph.com/docs/hammer/rados/api/librados/

Por defecto busca uno de estos ficheros para conectarse:
$CEPH_CONF (environment variable)
/etc/ceph/ceph.conf
~/.ceph/config
ceph.conf (in the current working directory)



http://docs.ceph.com/docs/hammer/rados/api/librados/#rados_conf_set
Cuando intentamos definir un parametro que no existe nos devuelve un error: -ENOENT (-2)

conn, err := rados.NewConnWithUser("cyclops")
// aqui hay que poner solo el nombre, NO client.cyclops

conn.SetConfigOption("keyring", "/etc/ceph/client.cyclops.keyring")
// keyring es donde tenemos el fichero con la clave. NO usar key o keyfile
