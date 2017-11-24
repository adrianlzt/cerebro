https://docs.docker.com/engine/userguide/storagedriver/device-mapper-driver/
volumenes.md

RedHat ofrece un paquete que hace toda la gestión del storage automáticamente:
https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux_atomic_host/7/html/managing_containers/managing_storage_with_docker_formatted_containers

A partir de la 17.06 parece que se puede pasar un block device a docker y el hace toda la conf.



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
volume group = centos_app8
Creamos un volumen con el 95% del espacio restante y dejamos 2GB para los metadatos (cuanto espacio de metadatos hay que dejar?).
Dejamos libre unos 4GB para que se puedan extender.
lvcreate --wipesignatures y -n docker centos_app8 -l 95%FREE
lvcreate --wipesignatures y -n dockermeta centos_app8 -L 2G
lvconvert -y --zero n -c 512K --thinpool centos_app8/docker --poolmetadata centos_app8/dockermeta
echo -e "activation {\nthin_pool_autoextend_threshold=80\nthin_pool_autoextend_percent=20\n}" > /etc/lvm/profile/docker-thinpool.profile
lvchange --metadataprofile docker-thinpool centos_app8/docker
lvs -o+seg_monitor

Los ultimos tres comandos, si lo entiendo bien, es para que automaticamente los volumenes crezcan en caso de quedarse sin espacio.

Configurar docker para que use este almacenamiento:
mkdir /etc/docker
echo -e '{\n  "storage-driver": "devicemapper",\n  "storage-opts": [\n    "dm.thinpooldev=/dev/mapper/centos_app8-docker",\n    "dm.use_deferred_removal=true",\n    "dm.use_deferred_deletion=true"\n  ]\n}' > /etc/docker/daemon.json



# Incrementar almacenamiento
https://docs.docker.com/engine/userguide/storagedriver/device-mapper-driver/#/increase-capacity-on-a-running-device
https://github.com/docker/docker/issues/21701

En RedHat, con meter un nuevo disco al volumegroup y extender el lvs el resto se hará automáticamente.

Si tenemos un disco vacío, crearemos una partición tipo linux para poder meterla en el volumegroup.
fdisk /dev/vdc -> tipo linux (todo por defecto, enter, enter...)
vgextend vg_docker /dev/vdc1

He agregado otro disco a un vg y sin llegar a hacer la parte de dmsetup reload parece que se ha extendido solo :?
Tenía configurado las reglas para autoextenderse. Tal vez las ha aplicado al encontrar más espacio.
