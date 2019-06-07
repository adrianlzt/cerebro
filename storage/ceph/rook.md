https://rook.io/docs/rook/v1.0/ceph-storage.html

# Requisitos
modprobe rbd
  debe funcionar

Paquete "lvm2" instalado.


Discos limpios (tenemos que pasar discos enteros, no vale particiones).
Limpiar los discos:
sgdisk -Z /dev/sdX
  sgdisk se instala con "yum install gdisk"

Chequear el path donde se deben cargar los plugins de flexvolumes
https://rook.io/docs/rook/v1.0/flexvolume.html

Para kubespray: /var/lib/kubelet/volume-plugins
Lo tendremos que configurar al desplegar el rook-operator
env:
[...]
- name: FLEXVOLUME_DIR_PATH
  value: "/var/lib/kubelet/volume-plugins"


# Desplegar
Se puede usar helm: https://rook.io/docs/rook/v1.0/helm-operator.html
helm3 repo add rook-release https://charts.rook.io/release
helm3 pull rook-release/rook-ceph
tar zxvf rook-ceph-v1.0.1.tgz
cd rook-ceph
vi values.yaml
  descomentar agent.flexVolumeDirPath y definirlo con el valor que toque
  definir algún filtro en "nodeSelector" para desplegar solo ahí rook? Parece que esto solo aplica a donde se despliega el operator
  enableSelinuxRelabeling a false si no estamos usando selinux

kc create namespace rook-ceph
helm3 install rook-ceph .

Esperar a que todos los pods esten running:
kubectl -n rook-ceph get po


## Cluster
Los discos que añadamos al cluster no pueden tener particiones

Cada cluster debe desplegarse sobre su propio namespace

Bajarnos un cluster de ejemplo y modificar según lo que queramos.
Seguramente, al menos, definir sobre que nodos desplegar y que discos usar.
wget https://raw.githubusercontent.com/rook/rook/release-1.0/cluster/examples/kubernetes/ceph/cluster.yaml

Luego crearlo:
kc create -f cluster.yaml

Mirar los logs en el operator
kc logs -f rook-ceph-operator-68796ffcfd-z9dgl

Mirar los pods.
Veremos que se crean los rook-ceph-mon.
Luego rook-ceph-mgr
Jobs para crear los osd, ver con:
kc get jobs
Y los osd: rook-ceph-osd

Mirar
kc get CephCluster

Fallos, mirar los errores del operator
kc logs -f rook-ceph-operator-68796ffcfd-z9dgl | grep " E "
Tenia un fallo por el que el pod de preparar los osd fallaba. Tuve que estar rápido pillando los logs antes de que el pod desapareciese.
Era un problema de que el disco no estaba limpio.
Podemos mirar esos logs en /var/lib/rook/log/rook-ceph, en el host de cada nodo que estemos desplegando.

Si vamos a redesplegar, borrar los datos de /var/lib/rook/


# Primitivas
rook tiene CDRs para crear los siguientes elementos:
Block: Create block storage to be consumed by a pod
Object: Create an object store that is accessible inside or outside the Kubernetes cluster
Shared File System: Create a file system to be shared across multiple pods

https://rook.io/docs/rook/v1.0/ceph-object.html
Object crearemos un pool de rados y un usuario para acceder. El container de rgw puede tardar algún minutillo en aparecer
Mirar que puerto usar para exponer el rgw, se expondrá directamente en UN SOLO nodo de k8s.

Esperar a que el pod de rgw esté levantado para crear los usuarios.
Si redesplegamos el rgw tendremos que recrear los usuarios.
Obtener credenciales del user (cambia nombre secret para matchear nuestro nomber y store):
kubectl -n rook-ceph get secret rook-ceph-object-user-my-store-my-user -o yaml | grep AccessKey | awk '{print $2}' | base64 --decode
kubectl -n rook-ceph get secret rook-ceph-object-user-my-store-my-user -o yaml | grep SecretKey | awk '{print $2}' | base64 --decode


# Dashboard
https://rook.io/docs/rook/v1.0/ceph-dashboard.html

Crear el NodePort (especificación en la web) para poder acceder.
No cambiar el "rook_cluster", porque aunque nuestro cluster tenga otro nombre, el label del pod manager sigue siendo "rook-ceph" (chequear de todas maneras con kc describe pod rook-ceph-mgr...)

kc get svc rook-ceph-mgr-dashboard-external-http
  para ver el puerto asignado

Accederemos con la IP de un host y el puerto conseguido antes.
La ip de un nodo:
kubectl get nodes --namespace pruebas -o jsonpath="{.items[0].status.addresses[0].address}"

User: admin
Password: kubectl -n rook-ceph get secret rook-ceph-dashboard-password -o jsonpath="{['data']['password']}" | base64 --decode && echo

Bug en el dashboard al intentar obtener el estado
https://github.com/rook/rook/issues/3106
No es grave, solo no muestra el estado global


## Object gateway managment
http://docs.ceph.com/docs/nautilus/mgr/dashboard/#enabling-the-object-gateway-management-frontend

Para poder ver los buckets de S3 desde el dashboard, entrar en la toolbox y ejecutar (apuntar las credenciales):
https://github.com/rook/rook/issues/2722
radosgw-admin user create --uid=admin --display-name=admin --system
  creo que hay que recrearlo si redesplegamos el rgw
ceph dashboard set-rgw-api-access-key XXX
ceph dashboard set-rgw-api-secret-key XXX
ceph dashboard set-rgw-api-host rook-ceph-rgw-MIRAR-NOMBRE-EN-LOS-SERVICIOS
ceph dashboard set-rgw-api-port 80
  el puerto que hayamos puesto al object storage





# Toolbox
https://rook.io/docs/rook/v1.0/ceph-toolbox.html

kubectl -n rook-ceph exec -it $(kubectl -n rook-ceph get pod -l "app=rook-ceph-tools" -o jsonpath='{.items[0].metadata.name}') bash

Crea un container donde podemos lanzar comandos de administración de ceph:
rados df
ceph status
etc




# Administración
Podemos editar el CephCluster CRD (kc edit cephclusters.ceph.rook.io Nombre) para modificar los nodos del cluster.
El operator se dará cuenta y hara los nuevos despliegues o quitará los nodos que hayamos sacado.

https://github.com/rook/rook/blob/master/Documentation/disaster-recovery.md



# Errores
Tras timeouts del cluster por etcd indisponible, el pod de rgw no borró y no se volvió a construir.
Borrar el pod de operator (para que el rc lo vuelva a crear) solucionó el problema.

Al modificar el ceph cluster, el operador dio unos core dump. Borrarlo y que se volviese a crear lo arregló.


Status:failed Message:failed to configure devices
Mirar en el nodo donde se esté desplegando en /var/lib/rook/logs
Buscar "ERROR"



# Troubleshooting
Si algún CRD no está creando lo que debe, reiniciar el pod de operator para que chequee que todo está en su sitio.
