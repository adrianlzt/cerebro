https://docs.docker.com/engine/userguide/storagedriver/device-mapper-driver/

RedHat ofrece un paquete que hace toda la gestión del storage automáticamente:
https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux_atomic_host/7/html/managing_containers/managing_storage_with_docker_formatted_containers



Por defecto, con el driver de devicemapper, docker crea unos ficheros (generalmente en /var/lib/docker/devicemapper/devicemapper/) que monta como /dev/loop0 y /dev/loop1
Esto está desaconsejado para producción, baja performance.

Para producción se debe usar direct-lvm.
https://docs.docker.com/engine/userguide/storagedriver/device-mapper-driver/#/for-a-direct-lvm-mode-configuration
Debemos crear dos volúmenes LVM (data y metadata) con algunas configuraciones particulares (meten unas configuraciones para que el pool pueda extenderse por el espacio sobrante del group en caso de que fuera necesario).


Ejemplo, configuración de storage de una CentOS7 con un lvm:
# cat /etc/sysconfig/docker-storage
DOCKER_STORAGE_OPTIONS="--storage-driver devicemapper --storage-opt dm.fs=xfs --storage-opt dm.thinpooldev=/dev/mapper/vg_docker-docker--pool --storage-opt dm.use_deferred_removal=true --storage-opt dm.use_deferred_deletion=true "



# Incrementar almacenamiento
https://docs.docker.com/engine/userguide/storagedriver/device-mapper-driver/#/increase-capacity-on-a-running-device
https://github.com/docker/docker/issues/21701

En RedHat, con meter un nuevo disco al volumegroup y extender el lvs el resto se hará automáticamente.

Si tenemos un disco vacío, crearemos una partición tipo linux para poder meterla en el volumegroup.

He agregado otro disco a un vg y sin llegar a hacer la parte de dmsetup reload parece que se ha extendido solo :?
Tenía configurado las reglas para autoextenderse. Tal vez las ha aplicado al encontrar más espacio.
