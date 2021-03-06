http://tldp.org/HOWTO/LVM-HOWTO/
https://wiki.archlinux.org/index.php/LVM
https://github.com/lvmteam/lvm2
  codigo

# Conceptos
Los discos, o particiones, deben agregarse para ser controlados por LVM (con pvcreate), se llamarán 'physical volumes'.
Creamos un 'volume group' con varios 'physical volumes'.
Encima de este 'volume group' podemos crear 'logical volumes' (que sería como una partición de un disco).
Estos 'logical volumes' deben ser formateados para poder usarse (con ext4, xfs o lo que sea)

Extent: LVM breaks up each physical volume into extents. A logical volume consists of a set of extents. Each extent is either wholly unused, or wholly in used by a particular logical volume: extents cannot be subdivided. Extents are the elementary blocks of LVM allocation.
Por lo que he visto: 4MB/extent
Consultar cuando tenemos libres:
vgs -o +vg_free_count,vg_extent_count
lvs -o +vg_free_count,vg_extent_count

Abajo tengo una sección sobre device-mapper/dmeventd/dmsetup


Opciones para mostrar datos:
lvs -o help


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
 # lvcreate -n NombreLV -L 2G NombreVG
   si no pasamos el -n les dara nombres tipo lvolN
   si queremos que borre las "signatures" detectadas: -Wy --yes
 # lvcreate -n NombreLV -l 12799 NombreVG
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
lvs -a
  mostrar tambien particiones thinpool y otras "raras"
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
Depende del sistema de ficheros será necesario realizar unmount (ext2/3) o no (ext4,reiserFS,XFS)

# Aumentar
lvextend -r -L +1G /dev/pruebasLVM/opt1
lvextend -r -l +100%FREE VG/LV
  aumentar el volumen LV del volume group VG hasta el 100% de espacio disponible en el VG

# Renombrar
lvs vgrename nombreVG nuevoNombre

Tambien podemos usar el UUID, por ejemplo, en el caso de tener dos con el mismo nombre (obtener uuid con vgdisplay)
vgrename UUID nuevoNombre


# Reducir
lvreduce -r -L -1G /dev/pruebasLVM/opt1

# Modificar (aumentar o reducir). Para ver el logical volume path usar "lvdisplay"
lvresize -r -L 300m /dev/pruebasLVM/peque (con este puede crecer o aumentar)

# Cambiar de nombre
lvrename nombreVG oldLV newLV

Modificar un vg se hace modificando los elementos enganchados a él, pero posiblemente no tengamos que hacerlo:
http://unix.stackexchange.com/questions/67702/how-to-reduce-volume-group-size-in-lvm


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



# Monitorizar
Pasa sacar los datos en formato monitorización:
lvs --noheadings --options data_percent


# Cambiar nombre volume group o logical volume
MALA idea! No hacer en producción
http://askubuntu.com/questions/765058/how-do-you-rename-the-volume-group-that-contains-the-root-volume-in-lvm

vgrename vg02 my_volume_group

Tendremos que cambiar el fstab y puede que el grub

Hacer un grep -r sobre /etc u /boot para ver donde queda el nombre viejo.



# Agregar un disco a un LV
pvcreate /dev/sdc
  inicializamos el disco para usarlo con LVM
vgextend VOL /dev/sdc
  extendemos el volume group VOL con el disco que hemos añadido
lvextend -r -l +100%FREE VOL/LV
  extendemos el volumen LV del volume group VOL hasta todo el espacio disponible
  se extiende también automáticamente el sistema de ficheros





# Autoextension / Thinpool
Ejemplo de conf para que un pool se pueda extender automáticamente sobre un group
https://docs.docker.com/engine/userguide/storagedriver/device-mapper-driver/#/for-a-direct-lvm-mode-configuration

lvcreate --wipesignatures y -n thinpool docker -l 95%VG
lvcreate --wipesignatures y -n thinpoolmeta docker -l 1%VG
lvconvert -y --zero n -c 512K --thinpool docker/thinpool --poolmetadata docker/thinpoolmeta

echo -e "activation {\nthin_pool_autoextend_threshold=80\nthin_pool_autoextend_percent=20\n}" > /etc/lvm/profile/docker-thinpool.profile
lvchange --metadataprofile docker-thinpool docker/thinpool
lvs -o+seg_monitor,lv_profile

Para calcular el tamaño del volumen de metadatos podemos usar la utilidad:
thin_metadata_size -b64k -s1t -m1000 --unit=G
  para bloques de 64k (creo que el por defecto), una unidad de 1TB y 1000 snaphots (o devices?), el tamaño es de 0.55GB
  para 2TB/1000snap -> ~1GB
  para 1TB/100000snap -> ~1GB


Si queremos ver el profile configurado de un lv
lvs -o+seg_monitor,lv_profile

O para un VG:
vgs -o+seg_monitor,vg_profile

El profile lo tendremos en:
/etc/lvm/profile/NOMBRE.profile




# Usar loopback devices
http://www.anthonyldechiaro.com/blog/2010/12/19/lvm-loopback-how-to/
dd if=/dev/zero of=lvm.img bs=1M count=5120
  5GB
losetup /dev/loop0 lvm.img

Esto no parece que sea necesario
Particionar el loop (cuando he probado se ha quedado pillado y no muere ni con kill -9):
sfdisk /dev/loop0 << EOF
,,8e,,
EOF

pvcreate /dev/loop0

Crear un vg con ese loop
vgcreate tempdocker /dev/loop0

O agregar el loop a un VG:
vgextend vg_docker /dev/loop0

Y tal vez queramos extender un LV del VG
lvextend -l +80%FREE vg_docker/docker-pool




# Config
Mostrar config actual
lvmconfig --type current

Mostrar config por defecto con comentarios de cada seccion
lvmconfig --type default --withcomments | less



# Backup metadata
https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/logical_volume_manager_administration/backup

Cuando hablamos de backup estamos hablando de como está montado el LVM con sus PV, VG, LV, etc, NO DEL CONTENIDO!
Estos backups permiten hacer backup y restaurar esa metadata

Existen dos carpetas donde se realizan backups:
  /etc/lvm/backup esta carpeta guarda un backup del último estado conocido del LVM (estado actual del LVM)
  /etc/lvm/archive guarda los estados anteriores del LVM

Cuando realizamos alguna modificación en algún VG o LV, automáticamente se genera un fichero en archive/ con la configuración de LVM **ANTES** del cambio.
En backup/ el estado final del LVM **DESPUES** del cambio.
Aunque el comando falle se genera el backup (visto con lvextend cuando intentamos darle más espacio del que tiene)

LVM controla el número de ficheros máximo que deben existir en /etc/lvm/archive con los parámetros retain_min y retain_days. Estos parámetros son por cada VG.
Función que borra archivos antiguos:
https://github.com/lvmteam/lvm2/blob/master/lib/format_text/archive.c#L187
  cuando hay al menos "retain_min" ficheros, itera empezando por los ficheros más nuevos.
  cuando encuentra uno más viejo (mirando mtime) de retain_days lo borra
  termina de iterar si el número de ficheros es <= a retain_min
  si tenemos muchos ficheros, pero ninguno más viejo de retain_days, no borra nada
Parece que varias herramientas pueden llamar a esta función: vgextend, vgconvert, etc

Cuando se genera un archive tenemos una traza verbose (notice, level=5):
Archiving volume group "temp0" metadata (seqno 2).

Cuando limpia viejos una traza very verbose (info, level=6) tipo:
Expiring archive %s", bf->path



## Crear backup
vgcfgbackup
Crear un backup del estado actual de los LVM en /etc/lvm/backup

## Restaurar
https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/logical_volume_manager_administration/mdatarecover
http://unixadminschool.com/blog/2015/08/rhel-lvm-how-to-remove-a-logical-volume-in-rhel-56/
https://www.thegeekdiary.com/corruption-or-accidental-deletion-in-lvm-how-to-rebuild-lvm-from-archive-metadata-backups-in-rhel-centos/

Listar los estados anteriores a los que podemos volver (nos explica que comando se produjo después de hacer el backup y la fecha)
vgcfgrestore --list VG

Podemos leer los ficheros de /etc/lvm/backup /etc/lvm/archive, son ficheros de texto donde está especificado el estado del LVM para poder restaurarlo.

La idea de esta restauración es recuperar la metadata de LVM de un disco.
Para ello tendremos que conocer el uuid que tenía y usar el último backup que tengamos (en /etc/lvm/archive seguramente).
Para conocer el uuid podemos usar los comandos:
lvs -a -o +devices
vgchange -an --partial.

Para agregar de nuevo el disco como un PV (pero con la metadata antigua):
pvcreate --uuid "FmGRh3-zhok-iVI8-7qTD-S5BI-MAEN-NYM5Sk" --restorefile /etc/lvm/archive/VG_00050.vg /dev/sdh1

Restaurar el VG:
vgcfgrestore VG

Activar el volumen y mostrar el estado:
lvchange -ay /dev/VG/stripe
lvs -a -o +devices



# Device mapper
Device-mapper is a component of the linux kernel (since version 2.6) that supports logical volume management. It is required by LVM2
dmsetup — low level logical volume management

Listar dispositivos vistos por device-mapper
dmsetup info -c


/dev/dm-2 se corresponde al que aparezca en el listado con Minor=2


## Bug consumo cpu 100%
Hay un bug con dmeventd que cuando intenta extender un thin pool y no puede empieza a consumir el 100% de una cpu.
Tenemos que desactivar el monitor para que no intente crecer automaticamente

Para poder desactivar el monitor, tendremos que liberar espacio en el thin pool. Tendremos que borrar imágenes de docker o containers.

$ lvs -o+seg_monitor | grep docker
  docker-pool vg_docker twi-aot---  9.29g             85.43  10.61                            monitored
$ lvchange --monitor n vg_docker/docker-pool
$ lvs -o+seg_monitor | grep docker
  docker-pool vg_docker twi-aot---  9.29g             85.43  10.61                            not monitored



# Debug
Config:
log -> level = 7
Por defecto lo saca al journal (el siguiente comando que se ejecute ya sacará ese nivel de debug)


# Troubleshooting
https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/4/html/Cluster_Logical_Volume_Manager/troubleshooting.html

Usar -v, ..., -vvvv en los comandos para ver más info

Usar lvmdump para hacer un dump con información de diagnóstico.

lvs -v
pvs -a
dmsetup info -c

Mirar los backups /etc/lvm/backup /etc/lvm/archive

lvm dumpconfig
volcado de la config

/etc/lvm/.cache para ver que dispositivos tienen volumenes lógicos sobre ellos



# Errores
Read-only locking type set. Write locks are prohibited.
Pasarle a los comandos lo siguiente:
lvs comando --config 'global {locking_type=1}' xxx



Logical volume stack-volumes-lvmdriver-1/volume-1911fd7a-faf8-4ea7-aad6-9dd25c70435f is used by another device
Mirar con "pvs" si ese volumen está siendo usado en un volume group (cosas de openstack, mirar cinder.md)


Volume group "postgres" not found, is inconsistent or has PVs missing
Si alguno de los PVs que lo formaban ya no está, tendremos que forzar al VG para que lo olvide:
vgreduce --removemissing postgres



Intentando borrar un pv
Can't open /dev/stack-volumes-lvmdriver-1/volume-1911fd7a-faf8-4ea7-aad6-9dd25c70435f exclusively.  Mounted filesystem?
https://www.thegeekdiary.com/lvm-error-cant-open-devsdx-exclusively-mounted-filesystem/
https://access.redhat.com/solutions/2124101
Varias causas, un puede ser que tenga entradas aún en el device mapper
dmsetup ls | grep id-del-disco
Mirar si está montado, usando el major y minor que nos devuelve al final entre paréntesis
cat /proc/partitions | grep 253 | grep 31

dmsetup remove stack--volumes--lvmdriver--1-volume--1911fd7a--faf8--4ea7--aad6--9dd25c70435f

Mirar en lsblk si vemos el disco montado
