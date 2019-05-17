https://docs.docker.com/engine/userguide/storagedriver/device-mapper-driver/
volumenes.md

# ANTIGUO, usar overlay
RedHat ofrece un paquete que hace toda la gestión del storage automáticamente:
https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux_atomic_host/7/html/managing_containers/managing_storage_with_docker_formatted_containers

A partir de la 17.06 parece que se puede pasar un block device a docker y el hace toda la conf.
/etc/docker/daemon.json
{
  "storage-driver": "devicemapper",
  "storage-opts": [
    "dm.directlvm_device=/dev/sdb",
    "dm.thinp_percent=95",
    "dm.thinp_metapercent=1",
    "dm.thinp_autoextend_threshold=80",
    "dm.thinp_autoextend_percent=20",
    "dm.directlvm_device_force=false"
  ]
}

systemctl start docker
journalctl -n 100 -u docker

En centos7 veo este error, pero parece que funciona bien:
Nov 28 12:48:16 cluster-controller dockerd[22882]: time="2017-11-28T12:48:16.600777828-06:00" level=error msg="File descriptor 8 (/dev/mapper/control) leaked on pvdisplay invocation. Parent PID 22882: /usr/bin/dockerd




Por defecto, con el driver de devicemapper, docker crea unos ficheros (generalmente en /var/lib/docker/devicemapper/devicemapper/) que monta como /dev/loop0 y /dev/loop1
Esto está desaconsejado para producción, baja performance.

Para producción se debe usar direct-lvm.
https://docs.docker.com/engine/userguide/storagedriver/device-mapper-driver/#/for-a-direct-lvm-mode-configuration
Debemos crear dos volúmenes LVM (data y metadata) con algunas configuraciones particulares (meten unas configuraciones para que el pool pueda extenderse por el espacio sobrante del group en caso de que fuera necesario).

Para rhel/centos usar el docker-storage-setup (pero parece que no esta para docker-ce)
vi /etc/sysconfig/docker-storage-setup
VG=vg_docker
DATA_SIZE=90%FREE

Crear ese volumegroup.
Ejecutar:
docker-storage-setup




Ejemplo, configuración de storage de una CentOS7 con un lvm:
# cat /etc/sysconfig/docker-storage
DOCKER_STORAGE_OPTIONS="--storage-driver devicemapper --storage-opt dm.fs=xfs --storage-opt dm.thinpooldev=/dev/mapper/vg_docker-docker--pool --storage-opt dm.use_deferred_removal=true --storage-opt dm.use_deferred_deletion=true "



# LVM a mano
fdisk /dev/sdb
  crear la particion 1 tipo Linux LVM
pvcreate /dev/sdb1
vgcreate docker /dev/sdb1

Elegir:
  lvcreate --wipesignatures y -n thinpoolmeta docker -l 1%VG

  para tamaños de volumen menores a 1TB podemos poner tranquilamente 1GB de metadata (mirar linux/filesystems/lvm.md)
  lvcreate --wipesignatures y -n thinpoolmeta docker -L 1G

Elegir una opción:
lvcreate --wipesignatures y -n thinpool docker -l 95%VG
  95% del espacio del VG
lvcreate --wipesignatures y -n thinpool docker -l 95%FREE
  95% del espacio libre en el VG


lvconvert -y --zero n -c 512K --thinpool docker/thinpool --poolmetadata docker/thinpoolmeta

echo -e "activation {\nthin_pool_autoextend_threshold=80\nthin_pool_autoextend_percent=20\n}" > /etc/lvm/profile/docker-thinpool.profile
lvchange --metadataprofile docker-thinpool docker/thinpool
lvs -o+seg_monitor

Los ultimos tres comandos, si lo entiendo bien, es para que automaticamente los volumenes crezcan en caso de quedarse sin espacio.

Configurar docker para que use este almacenamiento:
mkdir /etc/docker
RECORDAR CAMBIAR EL VG del siguiente comando:
echo -e '{\n  "storage-driver": "devicemapper",\n  "storage-opts": [\n    "dm.thinpooldev=/dev/mapper/docker-thinpool",\n    "dm.use_deferred_removal=true",\n    "dm.use_deferred_deletion=true"\n  ]\n}' > /etc/docker/daemon.json



# Incrementar almacenamiento
https://docs.docker.com/engine/userguide/storagedriver/device-mapper-driver/#/increase-capacity-on-a-running-device
https://github.com/docker/docker/issues/21701

En RedHat, con meter un nuevo disco al volumegroup y extender el lvs el resto se hará automáticamente.

Si tenemos un disco vacío, crearemos una partición tipo linux para poder meterla en el volumegroup.
fdisk /dev/vdc -> tipo linux (todo por defecto, enter, enter...)
vgextend vg_docker /dev/vdc1

He agregado otro disco a un vg y sin llegar a hacer la parte de dmsetup reload parece que se ha extendido solo :?
Tenía configurado las reglas para autoextenderse. Tal vez las ha aplicado al encontrar más espacio.
