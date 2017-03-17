http://tldp.org/HOWTO/LVM-HOWTO/
https://wiki.archlinux.org/index.php/LVM

# Conceptos
Los discos, o particiones, deben agregarse para ser controlados por LVM (con pvcreate), se llamarán 'physical volumes'.
Creamos un 'volume group' con varios 'physical volumes'.
Encima de este 'volume group' podemos crear 'logical volumes' (que sería como una partición de un disco).
Estos 'logical volumes' deben ser formateados para poder usarse (con ext4, xfs o lo que sea)

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

# Mostrar los puntos /dev de los LVM que tengamos
lvdisplay  | grep Path

# Tamaño de los bloques del sistema
lvdisplay
  busar por "Block"


## Eliminar volumen lógico
lvremove /dev/pruebasLVM/snapOPT1

## Extender/reducir volúmenes
http://tldp.org/HOWTO/LVM-HOWTO/extendlv.html
La opción -r modifica también el sistema de ficheros, si no, utilizaremos resize2fs (ext2,3,4fs), xfs_growfs, etc. Hace uso de la utilidad fsadm.
Depende del sistema de ficheros será necesario realizar unmount (ext2/3/4) o no (reiserFS,XFS)

# Aumentar
lvextend -r -L +1G /dev/pruebasLVM/opt1

# Reducir
lvreduce -r -L -1G /dev/pruebasLVM/opt1

# Modificar (aumentar o reducir)
lvresize -r -L 300m /dev/pruebasLVM/peque (con este puede crecer o aumentar)


## Snapshots
http://tldp.org/HOWTO/LVM-HOWTO/snapshotintro.html
http://tldp.org/HOWTO/LVM-HOWTO/snapshots_backup.html
http://raldaz.wordpress.com/2008/01/10/haciendo-un-backup-usando-snapshot-de-lvm-instantaneas-lvm/

# Snapshot
lvm-snapshots.md


# Montaje/Automontaje
Por defecto los volumegroups se montan automáticamente y a su vez se montan los lv's que estén en estos grupos.

Estado de los LVs
lvdisplay -a | grep -e Status -e Name

Si queremos que no se monten los vg/lv en el arranque tendremos que editar el parametro auto_activation_volume_list en /etc/lvm/lvm.conf


Activar un vg:
vgchange -ay vg_XXX
  -a: activate
  -y: yes

Desactivar:
vgchange -an vg_XXX



# Autoextension
ejemplo de conf para que un pool se pueda extender automáticamente sobre un group
https://docs.docker.com/engine/userguide/storagedriver/device-mapper-driver/#/for-a-direct-lvm-mode-configuration


# Monitorizar
Pasa sacar los datos en formato monitorización:
lvs --noheadings --options data_percent


# Cambiar nombre volume group o logical volume
MALA idea! No hacer en producción
http://askubuntu.com/questions/765058/how-do-you-rename-the-volume-group-that-contains-the-root-volume-in-lvm

vgrename vg02 my_volume_group

Tendremos que cambiar el fstab y puede que el grub

Hacer un grep -r sobre /etc u /boot para ver donde queda el nombre viejo.
