https://docs.openshift.com/container-platform/3.5/architecture/additional_concepts/storage.html
https://docs.openshift.com/dedicated/architecture/additional_concepts/storage.html
https://docs.openshift.com/dedicated/dev_guide/persistent_volumes.html
mirar volumes_docker.md para ver como gestiona el montaje de directorios y configMaps
https://portworx.com/basic-guide-kubernetes-storage/
  explicación de los pvc, pv, storageclass y que hace el controller y los kubeletes en todo esto

Se utiliza la solución de Kubernetes: persistent volume (PV) framework.

Cuando se necesita un storage persistente se hace un persistent volume claims (PVCs), que es agnóstico a la tecnología que haya por debajo.

Los drivers son los que existen en el código https://kubernetes.io/docs/concepts/storage/volumes
Se puede extender con "flex", que es una interfaz que debe cumplir un binario: https://github.com/kubernetes/community/blob/master/contributors/devel/sig-storage/flexvolume.md

Lo más moderno (GA en v1.13) es CSI: https://kubernetes.io/blog/2019/01/15/container-storage-interface-ga/
Es una interfaz que deben cumplir quien quiera exponer un almacenamiento de ficheros o bloques.
https://kubernetes-csi.github.io/
Los proyectos parecen aún un poco verdes:
  ceph (alpha, may'19): https://github.com/ceph/ceph-csi
  lvm: https://github.com/wavezhang/k8s-csi-lvm/


Parece que los PV pueden ser provisionados manualmente con tamaños específicos. Esto podría ser un problema si alguien solicita un PV de un tamaño más grande de los provisionado.
Generalmente habrá unos provisionadores dinámicos que se encargarán de crear los PVs según los PVCs que le lleguen.

# PV
Un PV es un volumen de kubernetes asociado a un disco, path, volumen ESB de amazon, bucket de ceph o lo que sea.
Estos PVs tendrán un tamaño y unas características (como se puede acceder a ellos).
Tipos de volumenes: https://kubernetes.io/docs/concepts/storage/volumes/#types-of-volumes

# PVC
Un PVC es una aplicación que quiere un volumen con unas características.
Por ejemplo, mi aplicación que va a almacenar algo temporal mientras trabaja, necesita un volumen de 1GB tipo RWO.
Kubernetes se encargará de mapear ese PVC a un PV de los que haya disponibles.



# StorageClass
https://kubernetes.io/docs/concepts/storage/storage-classes/
Automatización de la creación de PVs.
Podemos tener varios StorageClass con distintas "calidades" por ejemplo. El usuario podrá seleccionar uno y el StorageClass creará un PV del tipo que tenga definido para el usuario
En la tabla de la web podemos ver que "volume plugins" tienen un provisionador ya en kubernetes, de manera que podrá crear los PVs dinámicamente.

Debemos marcar un storage class como "default" para que los PVC que no lo especifiquen usen ese.
Esto se hace con un annotation:
  storageclass.kubernetes.io/is-default-class=true
Para modificar un storageClass ya creado:
  kubectl patch storageclass <your-class-name> -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'



# Listar PVs/PVCs (volumes/claims)
oc get pv
oc get pvc
oc get pv (solo para admin?)

No aparecen con: oc get all



# Crear un storageclass
La opción "WaitForFirstConsumer" hará que el PVC no se resuelva en un PV hasta que se cree el pod que lo necesite.
Ejemplo GCE: https://github.com/kubernetes/kubernetes/blob/master/cluster/addons/storage-class/gce/default.yaml

Si vamos a usar un "local-storage" mirar en la sección "# Local Persistent volumes"

Ejemplo local-storage (sin provision automática), default y esperando al pod para provisionar el PVC
cat <<EOF | kubectl create -f
kind: StorageClass
apiVersion: storage.k8s.io/v1
metadata:
  name: local-storage
  annotations:
    storageclass.kubernetes.io/is-default-class: "true"  # si queremos hacerla default
provisioner: kubernetes.io/no-provisioner
volumeBindingMode: WaitForFirstConsumer
EOF


# Crear un volumen
kind: PersistentVolume
apiVersion: v1
metadata:
  name: task-pv
spec:
  capacity:
    storage: 100Gi
  accessModes:
    - ReadWriteOnce
  awsElasticBlockStore:
    volumeID: vol-867g5kii
    fsType: ext4



# Solicitar un volumen (PVC)
kubectl create -f volumen.yaml
volumen.yaml:
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: nombre-recurso
spec:
  accessModes:
  - ReadWriteOnce|ReadWriteMany|ReadOnlyMany  # Elegir uno
  resources:
    requests:
      storage: 25Gi
  volumeName: nombre-volumen  # campo opcional



Crear un PVC asociado a un nodo (para local-storage):
cat <<EOF | kubectl create -f
apiVersion: v1
kind: PersistentVolume
metadata:
  name: example-local-pv
spec:
  capacity:
    storage: 500Gi
  accessModes:
  - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: local-storage
  local:
    path: /some/local/path
  nodeAffinity:
    required:
      nodeSelectorTerms:
      - matchExpressions:
        - key: kubernetes.io/hostname
          operator: In
          values:
          - NOMBRENODO
EOF


# Crear un pod que usa un volumen
kind: Pod
apiVersion: v1
metadata:
  name: task-pod
spec:
  volumes:
    - name: task-volume
      persistentVolumeClaim:
       claimName: task-pvc
  containers:
    - name: task-container
      image: mysql:5.6
      ports:
        - containerPort: 3306
          name: "http-server"
      volumeMounts:
        - mountPath: "/var/lib/mysql"
          name: task-volume



# Modos
Tabla con que modos soporta cada plugin: https://docs.openshift.com/container-platform/3.5/architecture/additional_concepts/storage.html#pv-access-modes
Los únicos que soportan todos: NFS o GlusterFS
ReadWriteOnce   RWO   The volume can be mounted as read-write by a single node.
ReadOnlyMany    ROX   The volume can be mounted read-only by many nodes.
ReadWriteMany   RWX   The volume can be mounted as read-write by many nodes.

CephFS tambien soporta multiwrite


# Añadir storage
Si una vez tenemos corriendo nuestra app, en el dc añadimos un storage, los containers se pararán y volverán a arrancar con el container attachado.

Los volumenes no aparecen en "docker volume", supongo que se gestionan de otra manera.


# Claims
Al usuario se le da un volumen igual o superior a lo solicitado, tanto en espacio como en permisos.

Therefore, the user may be granted more, but never less. For example, if a claim requests RWO, but the only volume available was an NFS PV (RWO+ROX+RWX), the claim would match NFS because it supports RWO.



# Plugins soportados
https://docs.openshift.com/container-platform/3.5/architecture/additional_concepts/storage.html#types-of-persistent-volumes

NFS, HostPath, GlusterFS, Ceph RBD, OpenStack Cinder, EBS, GCE persistent disk, iSCSI, Fibre Channel

https://github.com/kubernetes-incubator/external-storage/tree/master/local-volume
Se puede usar un volumen local. El scheduler, cuando vaya a colocar los pods sabrá donde está el volumen y pondrá el pod en el nodo adecuado.


## NFS
https://docs.openshift.com/container-platform/3.5/install_config/persistent_storage/persistent_storage_nfs.html#install-config-persistent-storage-persistent-storage-nfs
Cada pvc es un mount de un export de NFS y se monta para el pod cuando este arranque.


# Tipos de volumenes que se puedan montar
Cuando creamos un pod podemos especificar volumenes que montarle.
Generalmente esto requiere un privilegio mayor que el que provee la SCC restricted.
Tipos de volumenes: NFS, rbd, etc (mirar en oc explain pod.spec.volumes)



# EmptyDir
Se crea un volumen en el thinpool de docker.
Se usa para crear un volumen compartido entre containers de un pod.
Solo se puede limitar la quota si usamos XFS

Some uses for an emptyDir are:
scratch space, such as for a disk-based merge sort
checkpointing a long computation for recovery from crashes
holding files that a content-manager container fetches while a webserver container serves the data



# Recycler
Cuando se libera un volumen se arranca un pod "recycler-for-pvXX" que montará él volumen y borrará el contenido.
En NFS hará simplemente un "rm -fr /"




# Local Persistent volumes
https://kubernetes.io/blog/2018/04/13/local-persistent-volumes-beta/
Usar discos, o directorios, locales para crear los voluemens. Estos volumenes estarán fijados a un nodo (nodeAffinity).
La asignación de PVC a PV solo se hará cuando se levante el POD.
Si queremos automatizar la creación de los PVs hay un script en: https://github.com/kubernetes-incubator/external-storage/tree/master/local-volume

Asegurarnos de marcar el storageclass como default si solo tenemos ese.

Podemos usar discos como PV, raw blocks o mount binds.
La idea es tener un directorio (por ejemplo /mnt/kubernetes) donde estén los mountpoints de los discos o enlaces simbólicos a los block devices.

Suponiendo que tenemos un disco extra en /mnt/sdb, que usamos /mnt/kubernetes como el discover directory y queremos crear 10 vols:
for i in $(seq 1 10); do
  mkdir -p /mnt/{sdb,kubernetes}/pv${i}
  mount -t none -o bind /mnt/sdb/pv${i} /mnt/kubernetes/pv${i}
done

Editar helm/provisioner/values.yaml
  classes[0].name = local-storage
  classes[0].hostDir = /mnt/kubernetes
  classes[0].storageClass    Descomentar

helm install --name local-provisioner helm/provisioner

Marcar uno de los storage class como default:
kubectl patch storageclass local-storage -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'

Todos los PV creados, si hemos usado mount-bind, tendrán el tamaño de la partición /dev/sdb1

Podemos ver los PVs que se habrán creado automáticamente:
kubectl describe pv local-pv-d62bb91f


https://github.com/kubernetes-incubator/external-storage/tree/master/local-volume#best-practices
