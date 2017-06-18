http://en.wikipedia.org/wiki/Btrfs

Atomic Copy On Write Snapshots: solo ocupan la diferencia entre el snapshot y los cambios
bitrot protection (protección ante un bit que cambia de valor por error del hardware, gracias a per-block checksumming y siempre que tengamos un raid configurado)
Raid
rollback (con Snapshots)
deduplicación (si tienes los mismos ficheros repetidos te los pone por debajo como con un enlace duro)
se pueden crear volumenes, crecer, disminuir, quotas, etc (lo que hace lvm)
opción de añadir más discos dinámicamente a un raid creado por btrfs
Máximo tamaño de partición: 16EiB (1024 petabytes = 1024*1024 terabytes)
Async incremental replication: copiar snapshots entre pcs solo enviando las modificaciones (estilo rsync)
File-level cloning, crear copias de ficheros CoW (la nueva copia solo va ocupando las diferencias con la original)a. Nos permite extraer ficheros particulares de una snapshots


https://wiki.archlinux.org/index.php/Btrfs#Partitioning
No se puede hacer swap area

Status de las distintas funcionalidades:
https://btrfs.wiki.kernel.org/index.php/Status


## Administración ##

# crear fs
mkfs.btrfs -L nombre /dev/sda1
