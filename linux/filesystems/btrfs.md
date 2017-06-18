http://en.wikipedia.org/wiki/Btrfs

Atomic Copy On Write Snapshots: solo ocupan la diferencia entre el snapshot y los cambios
bitrot protection (protección ante un bit que cambia de valor por error del hardware, gracias a per-block checksumming y siempre que tengamos un raid configurado)
Raid
rollback (con Snapshots)
deduplicación (si tienes los mismos ficheros repetidos te los pone por debajo como con un enlace duro)
se pueden crear volumenes, crecer, disminuir, quotas, etc (lo que hace lvm)
online balancing: opción de añadir más discos dinámicamente a un raid creado por btrfs o cambiar el tipo de raid
Máximo tamaño de partición: 16EiB (1024 petabytes = 1024*1024 terabytes)
Async incremental replication: copiar snapshots entre pcs solo enviando las modificaciones (estilo rsync)
File-level cloning, crear copias de ficheros CoW (la nueva copia solo va ocupando las diferencias con la original)a. Nos permite extraer ficheros particulares de una snapshot
File/directory compression: podemos seleccionar que directorios y/o ficheros comprimir (o excluir algunos por su extensión, para no comprimir ficheros ya comprimidos)


https://wiki.archlinux.org/index.php/Btrfs#Partitioning
No se puede hacer swap area

Status de las distintas funcionalidades:
https://btrfs.wiki.kernel.org/index.php/Status

Nodatacow, podemos desactivar el CoW en ciertas particiones si consideramos que esta afectando a la performance.


# crear fs
mkfs.btrfs -L nombre /dev/sda1


# estado
btrfs filesystem show


# subvolumenes
En /etc/fstab veremos que el UUID para los distintos puntos de montaje es el mismo, pero cambia el "subvol".

## listar
btrfs sub list /

## crear
btrfs sub create /home/.snapshots


# snapshots
## crear (tenemos que tener creado el subvolumen /home/.snapshots)
btrfs sub snapshot -r /home /home/.snapshots/myfirstsnapshot

## copiar snapshot entre pcs
btrfs send /home/.snapshots/myfirstsnapshot | ssh second-machine sudo btrfs receive /backup/home/.snapshots

btrfs send -p /home/.snapshots/myfirstsnapshot /home/.snapshots/mysecondsnapshot | ssh second-machine btrfs receive /backup/home/.snapshots
  en este caso le estamos diciendo que envie la secondsnapshot, pero solo la parte incremental respecto a la primera que ya enviamos.


# deduplicacion
https://btrfs.wiki.kernel.org/index.php/Deduplication
Buscar ficheros iguales y borrar uno de ellos, manteniendo una CoW
Hace falta lanzarlo a mano. En el futuro parece que será automático.

# quotas
https://btrfs.wiki.kernel.org/index.php/Quota_support
Limitar espacio que puede usar cada subvolumen


# RAID
RAID 5 o 6 no está aún disponible para usarse. Mirar https://btrfs.wiki.kernel.org/index.php/RAID56
