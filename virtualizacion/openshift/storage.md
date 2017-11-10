https://docs.openshift.com/container-platform/3.5/architecture/additional_concepts/storage.html
https://docs.openshift.com/dedicated/architecture/additional_concepts/storage.html
https://docs.openshift.com/dedicated/dev_guide/persistent_volumes.html
mirar volumes_docker.md para ver como gestiona el montaje de directorios y configMaps

Se utiliza la solución de Kubernetes: persistent volume (PV) framework.

Cuando se necesita un storage persistente se hace un persistent volume claims (PVCs), que es agnóstico a la tecnología que haya por debajo.


Parece que los PV pueden ser provisionados manualmente con tamaños específicos. Esto podría ser un problema si alguien solicita un PV de un tamaño más grande de los provisionado.
Generalmente habrá unos provisionadores dinámicos que se encargarán de crear los PVs según los PVCs que le lleguen.


# Listar PVs/PVCs (volumes/claims)
oc get pv
oc get pvc
oc get pv (solo para admin?)

No aparecen con: oc get all

# Solicitar un PVC
oc create -f volumen.yaml
volumen.yaml:
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: nombre-recurso
spec:
  accessModes:
  - ReadWriteMany
  resources:
    requests:
      storage: 25Gi
  volumeName: nombre-volumen


# Modos
Tabla con que modos soporta cada plugin: https://docs.openshift.com/container-platform/3.5/architecture/additional_concepts/storage.html#pv-access-modes
Los únicos que soportan todos: NFS o GlusterFS
ReadWriteOnce   RWO   The volume can be mounted as read-write by a single node.
ReadOnlyMany    ROX   The volume can be mounted read-only by many nodes.
ReadWriteMany   RWX   The volume can be mounted as read-write by many nodes.


# Plugins soportados
https://docs.openshift.com/container-platform/3.5/architecture/additional_concepts/storage.html#types-of-persistent-volumes

NFS, HostPath, GlusterFS, Ceph RBD, OpenStack Cinder, EBS, GCE persistent disk, iSCSI, Fibre Channel


## NFS
https://docs.openshift.com/container-platform/3.5/install_config/persistent_storage/persistent_storage_nfs.html#install-config-persistent-storage-persistent-storage-nfs



# Añadir storage
Si una vez tenemos corriendo nuestra app, en el dc añadimos un storage, los containers se pararán y volverán a arrancar con el container attachado.

Los volumenes no aparecen en "docker volume", supongo que se gestionan de otra manera.


# Claims
Al usuario se le da un volumen igual o superior a lo solicitado, tanto en espacio como en permisos.

Therefore, the user may be granted more, but never less. For example, if a claim requests RWO, but the only volume available was an NFS PV (RWO+ROX+RWX), the claim would match NFS because it supports RWO.



# NFS (como backend de volumes)
Cada pvc es un mount de un export de NFS y se monta para el pod cuando este arranque.


# Tipos de volumenes que se puedan montar
Cuando creamos un pod podemos especificar volumenes que montarle.
Generalmente esto requiere un privilegio mayor que el que provee la SCC restricted.
Tipos de volumenes: NFS, rbd, etc (mirar en oc explain pod.spec.volumes)



# EmptyDir
Se crea un volumen en el thinpool de docker.
Se usa para crear un volumen compartido entre containers de un pod.
Solo se puede limitar la quota si usamos XFS


# Recycler
Cuando se libera un volumen se arranca un pod "recycler-for-pvXX" que montará él volumen y borrará el contenido.
En NFS hará simplemente un "rm -fr /"
