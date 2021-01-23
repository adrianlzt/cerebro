http://en.wikipedia.org/wiki/Btrfs
man btrfs
man 5 btrfs

RedHat 8 ha quitado brtfs: https://access.redhat.com/discussions/3138231
Fedora 33 lo ha puesto por defecto

Artículo sobre la implementación de btrfs en facebook
https://lwn.net/Articles/824855/

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



# Particularidades
Si queremos copiar un fichero con CoW tendremos que especificarlo al cp:
cp --reflink=auto file1 file2
  auto intenta hacer CoW, si no, lo hace normal



# crear fs
mkfs.btrfs -L nombre /dev/sda1

## convertir ext2/3/4 a btrfs
El FS tiene que estar desmontado
btrfs-convert /dev/sdaXN

## raid
mkfs.btrfs -m raid0 -d raid1 /dev/loop0 /dev/loop1 /dev/loop2

By default the behavior is:
metadata is replicated on all of the devices. If a single device is used the metadata is duplicated inside this single device (useful in case of corruption or bad sector, there is a higher chance that one of the two copies is clean). To tell btrfs to maintain a single copy of the metadata, just use single. Remember: dead metadata = dead volume with no chance of recovery.
data is spread amongst all of the devices (this means no redundancy; any data block left on a defective device will be inaccessible)

        -m, --metadata profile
        -d, --data type
        Valid values are raid0, raid1, raid10 or single.



# estado
btrfs filesystem show


# subvolumenes
En /etc/fstab veremos que el UUID para los distintos puntos de montaje es el mismo, pero cambia el "subvol".
Desde el punto del usuario, los subvolumenes son directorios dentro del punto de montaje de btrfs, que luego se montan de nuevo (con mount-bind) en otra ubicación.
Aunque los subvol nos lo muestre como directorios en un path, en realidad son entidades separadas con sus propiedades.

## listar
btrfs sub list /mnt/discoBTRFS

## crear
btrfs sub create /mnt/discoBTRFS/app

"app" es el nombre que le hemos dado al subvolumen
Veremos que se ha creado un nuevo directorio en /mnt/discoBTRFS/app


## mount
Una vez hemos creado un subvolumen, podemos usar mount para montarlo en el path que queramos.
Usaremos el mismo dev pero especificaremos un option "subvol".
sudo mount -o subvol=app /dev/sdc1 /mnt/usb64gb_app

Podemos montar subvol sin tener que montar el vol principal.

Los ficheros/directorios que creemos en /mnt/usb64gb_app tambien los veremos en /mnt/discoBTRFS/app

Una opción recomendable es montar los subvolumenes con compresión. Mirar "man 5 btrfs"
Esto comprimirá automáticamente los ficheros.
-o compress=lzo

Las opciones de montaje aplican sobre todo el volumen y subvolumen por igual.
Parece que esto cambiará en el futuro (Note en sección "MOUNT OPTIONS" en "man 5 btrfs")


## analizar espacio usado
sudo btrfs filesystem du PATH
  podemos poner el path de donde está montado el vol principal (nos hará un du de todos los subvol)
  también podeos especificar un subvol para solo obtener info suya
  los ficheros que estan con CoW (copiados con --reflink), veremos que parte de espacio es compartida y cual exclusiva de su copia

sudo btrfs filesystem df PATH
  path apuntará al vol o cualquier subvol, la info devuelta siempre será la misma

# snapshots
## crear (tenemos que tener creado el subvolumen /home/.snapshots)
btrfs sub snapshot -r /home /home/.snapshots/myfirstsnapshot

## copiar snapshot entre pcs
btrfs send /home/.snapshots/myfirstsnapshot | ssh second-machine sudo btrfs receive /backup/home/.snapshots

btrfs send -p /home/.snapshots/myfirstsnapshot /home/.snapshots/mysecondsnapshot | ssh second-machine btrfs receive /backup/home/.snapshots
  en este caso le estamos diciendo que envie la secondsnapshot, pero solo la parte incremental respecto a la primera que ya enviamos.

Meter snapshot en un fichero:
sudo btrfs send -f $(date +%Y%m%d).snap some/subvol

Crear subvol a partir de un fichero:
sudo btrfs receive -f fichero.snap subvol/


# deduplicacion
https://btrfs.wiki.kernel.org/index.php/Deduplication
Buscar ficheros iguales y borrar uno de ellos, manteniendo una CoW
Hace falta lanzarlo a mano. En el futuro parece que será automático.

# quotas
https://btrfs.wiki.kernel.org/index.php/Quota_support
Limitar espacio que puede usar cada subvolumen


# RAID
RAID 5 o 6 no está aún disponible para usarse. Mirar https://btrfs.wiki.kernel.org/index.php/RAID56



# Dudas / preguntas
Que sistema de compresión usar?

Meter a cp un alias para siempre usar "--reflink=always"?

Como se lanza la deduplicación de ficheros?

btrfs filesystem du muestra el espacio ahorrado por comprimir?
python -c "print('a'*1024*1024*50)" > unos50MB.compress
esto no veo que me ahorre datos



# Backup
https://github.com/digint/btrbk
Utilidad para gestionar un sistema de backup
