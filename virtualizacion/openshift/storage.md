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
  Que me parezcan interesantes: cephfs, rbd (ceph blocks), local

Reclaim policy
https://kubernetes.io/docs/concepts/storage/persistent-volumes/#reclaiming
Retain
  una vez usado un PV, se quedará en estado "Released". Tendremos que borrarlos a mano y limpiar los discos
Delete
  se borran solo los datos y están listos para volver a usar



# PVC
Un PVC es una aplicación que quiere un volumen con unas características.
Por ejemplo, mi aplicación que va a almacenar algo temporal mientras trabaja, necesita un volumen de 1GB tipo RWO.
Kubernetes se encargará de mapear ese PVC a un PV de los que haya disponibles.



# Local PV
https://github.com/kubernetes-sigs/sig-storage-local-static-provisioner
Podemos usar ese provisionardor para generar automáticamente los PVs a partir de una lista de discos.
Luego podremos usar PVC para utilizar esos discos. La información de afinidad de los PVs hará que los pods se schedulen en el nodo adecuado.

Podemos usar mount bind para simular varios discos, pero no tendremos limite de capacidad

Usando un disco con LVM, permite tener limite de capacidad y poder modificar el tamaño:
pvcreate /dev/sdb
vgcreate k8s /dev/sdb

Crear 3 discos de 200G:
for i in $(seq 0 2); do
  lvcreate -Wy --yes -L 200G -n vol$i k8s
  mkfs.xfs /dev/k8s/vol$i
  mkdir /mnt/vol$i
  echo "/dev/k8s/vol$i /mnt/vol$i xfs defaults 0 2" >> /etc/fstab
  mount /mnt/vol$i
done



Configurar los valores del helm chart:
https://github.com/kubernetes-sigs/sig-storage-local-static-provisioner/tree/master/helm/provisioner

kc create namespace local-storage
nkc local-storage
helm3 install provisioner provisioner/

Mirar los PVs creados
kc get pv

CUIDADO! si instalamos varios helm de estos, comparten configuraciones de rolebinding y clusterrolebinding. Borrar un helm afecta a otros. Pods en crash loop por falta de permisos
El problema es que el nombre de los CluterRoleBinding no se modifican, por lo que al despelgar varios se modifican.

Tendremos que especificar el storage class que hemos creado, o hacerlo por defecto.

Si tenemos los PVs en modo Retain, una vez se hayan liberado, tendremos que borrarlos e ir al nodo a borrar los datos.
Se crearán con el mismo nombre.

Si borramos el privisioner, borrar los PVs a mano.



# StorageClass
https://kubernetes.io/docs/concepts/storage/storage-classes/
Automatización de la creación de PVs.
Podemos tener varios StorageClass con distintas "calidades" por ejemplo. El usuario podrá seleccionar uno y el StorageClass creará un PV del tipo que tenga definido para el usuario
En la tabla de la web podemos ver que "volume plugins" tienen un provisionador ya en kubernetes, de manera que podrá crear los PVs dinámicamente.

Ver cuales tenemos:
kc get storageclass

Debemos marcar un storage class como "default" para que los PVC que no lo especifiquen usen ese.
Esto se hace con un annotation:
  storageclass.kubernetes.io/is-default-class=true
Para modificar un storageClass ya creado:
  kubectl patch storageclass <your-class-name> -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'

Si queremos especificar un storage-class determinado para un volume, lo haremos con el siguiente "annotations":
volume.beta.kubernetes.io/storage-class: "nombre"


## Ceph
1. instalar provisioner externo
2. crear storage class
3. crear pvc solicitando usar esa storage class (o haberla puesto como default)

CUIDADO! Si un nodo se sale abruptamente del cluster, parece que no manda la orden de desmontar a ceph. K8s intenta levantar un nuevo pod que no puede montar el volumen, por lo que nos quedamos sin servicio.

No hace falta crear el secret de user en los namespaces donde se creen los pvc o monten los pods. Se coge del namespace donde se haya definido en el storageclass

Pareece que kubespray lo puede dejar instalado: https://github.com/kubernetes-sigs/kubespray/tree/d83181a2beb4ca2b759ae287f76000568480ecea/roles/kubernetes-apps/external_provisioner/rbd_provisioner

Hace falta usar un external provider para gestionar rbd:
https://github.com/kubernetes-incubator/external-storage/tree/master/ceph/rbd
https://github.com/kubernetes-incubator/external-storage/tree/master/ceph/rbd/deploy/rbac
Bajar ese dir, cambiar el namespace, despelgar.
kc create -f rbac/

Los storage class que creemos deberán tener:
provisioner: ceph.com/rbd

Parece que los pool "erasure" dan problemas: https://github.com/rook/rook/issues/1733


Tendremos que crear en ceph los pools necesarios con el application "rbd" enabled.
Crear los usuarios en algun mon con:
ceph auth get-or-create client.NOMBREUSER mon 'profile rbd' osd 'profile rbd pool=NOMBREPOOL'

Parece que también hace falta tener ceph-common instalado.
ceph.repo
[ceph]
baseurl = http://download.ceph.com/rpm-nautilus/el7/$basearch
gpgcheck = 1
gpgkey = https://download.ceph.com/keys/release.asc
name = Ceph packages for $basearch

yum install -y ceph-common



NO USAR ESTE METODO: Ceph RBD storageclass (metodo que necesita tener el binario rbd en la imagen del cluster controller)
https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd
https://docs.openshift.com/container-platform/3.5/install_config/storage_examples/ceph_rbd_dynamic_example.html#ceph-rbd-dynamic-example-create-pool-for-dynamic-volumes
  aqui más explicado, con los comandos para crear el cliente en ceph y obtener la key del client.admin
Parece que el cluster-controller necesita tener "rbd": https://github.com/kubernetes/kubernetes/issues/38923#issuecomment-313054666


En caso de error hacer un describe al pvc

Probar desde el nodo de k9s si funciona rbd
rbd ls -m 10.0.0.2:6789,10.0.0.21:6789 -p kube-pool-1 --id kube --key ACQdZzMIA/8RS5Spf6Axg=


Podemos ignorar estas lineas de error:
did not load config file, using default settings.
2019-06-16 14:43:37.538 7f042b0a0b00 -1 Errors while parsing config file!
2019-06-16 14:43:37.538 7f042b0a0b00 -1 parse_file: cannot open /etc/ceph/ceph.conf: (2) No such file or directory
2019-06-16 14:43:37.538 7f042b0a0b00 -1 parse_file: cannot open /root/.ceph/ceph.conf: (2) No such file or directory
2019-06-16 14:43:37.538 7f042b0a0b00 -1 parse_file: cannot open ceph.conf: (2) No such file or directory
2019-06-16 14:43:37.539 7f042b0a0b00 -1 Errors while parsing config file!
2019-06-16 14:43:37.539 7f042b0a0b00 -1 parse_file: cannot open /etc/ceph/ceph.conf: (2) No such file or directory
2019-06-16 14:43:37.539 7f042b0a0b00 -1 parse_file: cannot open /root/.ceph/ceph.conf: (2) No such file or directory
2019-06-16 14:43:37.539 7f042b0a0b00 -1 parse_file: cannot open ceph.conf: (2) No such file or directory
2019-06-16 14:43:37.591 7f042b0a0b00 -1 auth: unable to find a keyring on /etc/ceph/ceph.client.kube.keyring,/etc/ceph/ceph.keyring,/etc/ceph/keyring,/etc/ceph/keyring.bin,: (2) No such file
 or directory



# Listar PVs/PVCs (volumes/claims)
oc get pv
oc get pvc
oc get pv (solo para admin?)

No aparecen con: oc get all

En caso de error hacer un describe al pvc


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


Permisos para que un user pueda crear un PV
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: nombreUser-provisioner-pv-binding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: system:persistent-volume-provisioner
subjects:
- kind: User
  name: nombreUser
  apiGroup: rbac.authorization.k8s.io



# Solicitar un volumen (PVC)
kubectl create -f volumen.yaml
volumen.yaml:
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: nombre-recurso
spec:
  storageClassName: manual  # opcional, si no cogerá la default
  accessModes:
  - ReadWriteOnce|ReadWriteMany|ReadOnlyMany  # Elegir uno
  resources:
    requests:
      storage: 25Gi
  # Los sigiuentes campos son opcionales y fuerzan la selección de un volumen concreto
  storageClassName: percona-lvm-spinning
  volumeMode: Filesystem
  volumeName: local-pv-500e15c3



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
