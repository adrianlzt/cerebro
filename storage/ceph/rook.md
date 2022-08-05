https://rook.io/docs/rook/v1.0/ceph-storage.html

Nos evita tener que configurar e instalar ceph.
También facilita la configuración de ceph en kubernetes.


# Requisitos
modprobe rbd
  debe funcionar

Paquete "lvm2" instalado.


Discos limpios (tenemos que pasar discos enteros, no vale particiones).
Limpiar los discos:
sgdisk -Z /dev/sdX
  sgdisk se instala con "yum install gdisk"

Limpiar para evitar que pueda detectar un anterior BlueStore.
dd if=/dev/zero of=/dev/sdX bs=1M count=100


Usamos helm para desplegar el operator.

Luego usamos helm de nuevo para desplegar un cluster usando el operator.
Aquí especificamos que máquinas/discos usar y que queremos hacer con ellos.


# Conectar externamente
https://www.adaltas.com/en/2020/04/16/expose-ceph-from-rook-kubernetes/


# Eliminar un OSD
https://rathpc.github.io/rook.github.io/docs/rook/v1.4/ceph-osd-mgmt.html#remove-an-osd



# Antiguo

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


Borrar un cluster tiene pinta de que lo destruye. No tengo claro que se pueda recuperar


Borrar OSD a mano
https://gist.github.com/cheethoe/49d9c1d0003e44423e54a060e0b3fbf1


## Recuperación cluster
Vamos a proceder a recuperar la info de los monitores a partide los OSDs

Instalar en los hosts:
yum install -y ceph-osd

Montar los OSDs
ceph-volume lvm list
  para ver los ids y fsid
ceph-volume lvm activate --all
  o para activar de uno en uno: ceph-volume lvm activate <osd-id> <osd-fsid>

Ahora tenemos que generar el update-mon-db en cada nodo, e ir pasando la bd entre los nodos para que cada uno añada su parte:
nodoA$ for osd in /var/lib/ceph/osd/ceph-*; do ceph-objectstore-tool --data-path $osd --op update-mon-db --mon-store-path /tmp/mon-store --no-mon-config; done
rsync -avz nodoA:/tmp/mon_store /tmp
rsync -avz /tmp/mon_store nodoB:/tmp
nodoA$ for osd in /var/lib/ceph/osd/ceph-*; do ceph-objectstore-tool --data-path $osd --op update-mon-db --mon-store-path /tmp/mon-store --no-mon-config; done
rsync -avz nodoB:/tmp/mon_store /tmp
etc

En el último nodo donde tengamos toda la bbdd sync
yum install ceph-mon
ceph-monstore-tool /tmp/mon-store rebuild


Si tenemos problemas, podemos usar este comando para leer el contenido de la db rocksdb:
ceph-kvstore-tool rocksdb /tmp/mon-store/store.db/ list
ceph-kvstore-tool rocksdb /tmp/mon-store/store.db/ get osdmap 123
ceph-kvstore-tool rocksdb /tmp/mon-store/store.db/ dump
  saca el contenido como od -ax




# Errores
Tras timeouts del cluster por etcd indisponible, el pod de rgw no borró y no se volvió a construir.
Borrar el pod de operator (para que el rc lo vuelva a crear) solucionó el problema.

Al modificar el ceph cluster, el operador dio unos core dump. Borrarlo y que se volviese a crear lo arregló.


Status:failed Message:failed to configure devices
Mirar en el nodo donde se esté desplegando en /var/lib/rook/logs
Buscar "ERROR"


Comandos killed. Tiene suficiente memoria? Buscar OOM en el dmesg el host del pod.


Se queda pillado creando rgw. Mira si hay algún comando bloqueado en el pod (un fork del comando operator, tipicamente radosgw-admin).
Mirar contra que IPs se intenta conectar cuando se queda pillado. Tal vez un osd muerto?



# Troubleshooting
Si algún CRD no está creando lo que debe, reiniciar el pod de operator para que chequee que todo está en su sitio.


Si tenemos algun pod osd fallando, para ver a que disco corresponde podemos mirar el FSID del pod y buscarlo en el fichero /var/lib/rook/log/rook-ceph/ceph-volume.log
Y ver a que identificador corresponde con lsblk
Mejor, usar el comando, nos dirá device, osd-fsid y block device uuid:
ceph-volume lvm list




## Logs
Arranque de rook
rookcmd: starting Rook v1.0.1 with arguments '/usr/local/bin/rook ceph operator'
