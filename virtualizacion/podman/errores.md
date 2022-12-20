# Errores
chown: changing ownership of ‘/var/lib/zabbix/.local/share/containers/storage/overlay/l’: Operation not permitted
Parece que me daba si intentaba ejecutar "podman info" (o cualquier cosa) en un dir donde no tenía permisos.


error configuring CNI network plugin: failed to add watch on "/etc/cni/net.d/": no space left on device
https://github.com/containers/libpod/issues/1566
Arreglado con:
sysctl -w fs.inotify.max_user_instances=4096
sysctl -w fs.inotify.max_user_watches=65536
