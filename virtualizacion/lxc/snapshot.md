https://www.stgraber.org/2013/12/27/lxc-1-0-container-storage/
http://s3hh.wordpress.com/2013/09/13/announcing-lxc-snapshot/

Para ver el backend que estamos usando:
cat /var/lib/lxc/NOMBRE/config | grep rootfs

## Clone ##
sudo lxc-clone -o maquina1 -n clon-maquina1

sudo lxc-clone -o maquina1 -n clon-maquina1 -B overlayfs -s
  Esto hace un clone rápido, sin copiar los datos. Lo que hace es ir guardando únicamente las modificaciones.
  -B overlayfs: guarda los cambios sobre este clon en forma de deltas
  -s: hacer un snapshot en vez de un clone


## Snapshots ##
echo "check_mk 1.2.2p3" > /tmp/comentario
lxc-snapshot -n NOMBRE -c /tmp/comentario

Mostrar snapshots
lxc-snapshot -LC -n NOMBRE

Restaura a un snapshot (no borra ninguno, aunque haya más recientes):
lxc-snapshot -r snap2 -n NOMBRE

Borrar un snapshot:
lxc-snapshot -d snap1 -n NOMBRE
