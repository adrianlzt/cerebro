https://geekpeek.net/resize-filesystem-fdisk-resize2fs/

desmontar la particion: umount /dev/sdb1
ejecutar fsck: e2fsck -f /dev/sdb1
reducimos el sistema de ficheros a 10GB: resize2fs /dev/sdb1 +10G
Borramos la particion: fdisk /dev/sdb  d  x
Creamos una nueva particion del tamaño del filesystem: n 1 p ... +10G
Montar la partición redimensionada: mount /dev/sdb1 ...

