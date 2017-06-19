Las particiones también tienen un identificador único llamado PARTUUID (diferente del UUID, que es el identificado del sistema de ficheros):
$ sudo blkid /dev/sda4
/dev/sda4: UUID="5bf3e456-095f-42e9-9693-64638d195a04" TYPE="ext4" PARTLABEL="Linux filesystem" PARTUUID="ed822ce9-d6fe-488a-83f9-4b0ebcbdc8fe"


También
/dev/disk/by-partuuid
/dev/disk/by-uuid
