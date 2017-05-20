https://docs.openshift.com/container-platform/3.5/architecture/additional_concepts/storage.html

Se utiliza la solución de Kubernetes: persistent volume (PV) framework.

Cuando se necesita un storage persistente se hace un persistent volume claims (PVCs), que es agnóstico a la tecnología que haya por debajo.


Parece que los PV pueden ser provisionados manualmente con tamaños específicos. Esto podría ser un problema si alguien solicita un PV de un tamaño más grande de los provisionado.
Generalmente habrá unos provisionadores dinámicos que se encargarán de crear los PVs según los PVCs que le lleguen.


# Listar PVs
oc get pv


# Modos
Tabla con que modos soporta cada plugin: https://docs.openshift.com/container-platform/3.5/architecture/additional_concepts/storage.html#pv-access-modes
Los únicos que soportan todos: NFS o GlusterFS
RWO, read-write por un único nodo
ROX: read-only por varios nodos
RWX: read-write por varios nodos


# Plugins soportados
https://docs.openshift.com/container-platform/3.5/architecture/additional_concepts/storage.html#types-of-persistent-volumes

NFS, HostPath, GlusterFS, Ceph RBD, OpenStack Cinder, EBS, GCE persistent disk, iSCSI, Fibre Channel


## NFS
https://docs.openshift.com/container-platform/3.5/install_config/persistent_storage/persistent_storage_nfs.html#install-config-persistent-storage-persistent-storage-nfs



# Añadir storage
Si una vez tenemos corriendo nuestra app, en el dc añadimos un storage, los containers se pararán y volverán a arrancar con el container attachado.

Los volumenes no aparecen en "docker volume", supongo que se gestionan de otra manera.
