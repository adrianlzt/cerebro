http://en.wikipedia.org/wiki/Btrfs

Aun inestable.
snapshots
Copy On Write
Raid
Crecimiento y decrecimiento
rollback
deduplicación (si tienes los mismos ficheros repetidos te los pone por debajo como con un enlace duro)
se pueden crear volumenes, quotas, etc (lo que hace lvm)
raid
...


https://wiki.archlinux.org/index.php/Btrfs#Partitioning
No se puede hacer swap area



## Administración ##

# crear fs
mkfs.btrfs -L nombre /dev/sda1
