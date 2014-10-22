# mkfs.ext4 /dev/drbd1
mkfs.ext4: Wrong medium type while trying to determine filesystem size
mkfs.ext4: Tipo de medio erróneo mientras se intentaba determinar el tamaño del sistema de ficheros


https://coderwall.com/p/mm_wia
drbdadm role all

Nos dirá que estamos como secundarios.
Ponerlo como primario en alguno de los nodos
drbdadm -- --overwrite-data-of-peer primary disk1
