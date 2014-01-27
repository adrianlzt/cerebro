http://tldp.org/HOWTO/LVM-HOWTO/
https://wiki.archlinux.org/index.php/LVM


# Creando un LVM
Instalar el software
 Debian: # apt-get install lvm2
 CentOS: # yum install lvm2

Crear volúmenes físicos para usar con LVM (particiones donde se va a utilizar el lvm)
 # pvcreate /dev/sdb

También se pueden crear sobre particiones lógicas (código 0x8e - Linux LVM)
 # pvcreate /dev/sdc1

Crear un grupo de volumen, unir volúmenes físicos
 # vgcreate Nombrevolumen /dev/sdb /dev/sdc1

Crear un volumen lógico, que se formateará para ser una “partición”
 # lvcreate -n opt -l 12799 Nombrevolumen
 # lvcreate -n opt -l 50%FREE Nombrevolumen (50% del espacio libre)
 # lvcreate -n opt -l 50%ORIGIN  Nombrevolumen (50% del espacio total del volumen)
		-n|--name LogicalVolumeName
		-l|--extents LogicalExtentsNumber[%{VG|FREE|ORIGIN}]
		-L|--size LogicalVolumeSize[bBsSkKmMgGtTpPeE]}

Formateo del volumen lógico para poder utilizarla
	# mkfs.xfs /dev/VolGroup00/opt1
	# mkfs.ext4 /dev/mapper/VolGroup00-opt1

## Escaneo de volúmenes
pvscan
pvs
pvdisplay   (más verboso)
vgscan
vgs
vgdisplay   (más verboso)
lvscan
lvs
lvdisplay   (más verboso)

## Eliminar volumen lógico
lvremove /dev/pruebasLVM/snapOPT1

## Extender/reducir volúmenes
http://tldp.org/HOWTO/LVM-HOWTO/extendlv.html
La opción -r modifica también el sistema de ficheros, si no, utilizaremos resize2fs (ext2,3,4fs), xfs_growfs, etc

# Aumentar
lvextend -L +1G /dev/pruebasLVM/opt1

# Reducir
lvreduce -r -L -1G /dev/pruebasLVM/opt1

# Modificar (aumentar o reducir)
lvresize -L 300m /dev/pruebasLVM/peque (con este puede crecer o aumentar)


## Snapshots
http://raldaz.wordpress.com/2008/01/10/haciendo-un-backup-usando-snapshot-de-lvm-instantaneas-lvm/

# Crear snapshot
La snapshot ocupa espacio en el grupo de volumen donde esté el volumen lógico que estemos snapshoteando.
lvcreate -s -L 100M -n testsnap /dev/testvg/testvol
	-s|--snapshot
	-l|--extents LogicalExtentsNumber[%{VG|FREE|ORIGIN}]
	-L|--size LogicalVolumeSize[bBsSkKmMgGtTpPeE]
	-n|--name LogicalVolumeName
