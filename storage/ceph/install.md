http://ceph.com/install/
http://www.virtualtothecore.com/en/adventures-ceph-storage-part-3-design-nodes/
https://www.howtoforge.com/tutorial/how-to-build-a-ceph-cluster-on-centos-7/

Tienen codigo para desplegar con ansible, puppet, chef, etc

# Compatibilidades
http://docs.ceph.com/docs/master/start/os-recommendations/

Recomiendan kernels nuevos (4.4, 4.9)
CentOS 7 vale
As of December 2014, XFS is the recommended underlying filesystem type for production environments, while Btrfs is recommended for non-production environments. ext4 filesystems are not recommended because of resulting limitations on the maximum RADOS objects length.[11]


# Instalacion usando ceph-deployer
http://docs.ceph.com/docs/hammer/man/8/ceph-deploy/

El admin node será dede donde lanzemos los comandos ceph-deploy, nuestro portatil por ejemplo.
Montamos 1 nodo mon y 2 OSDs

En todos los nodos:
yum install ntp ntpdate ntp-doc yum-plugin-priorities


## ceph-deploy
No se ejecuta con root
Este nodo necesita acceso ssh paswordless a los clientes. Sudo sin password y sin requiretty tambien.
selinux desactivado
cephdeploy$ ssh-keygen
cephdeploy$ cat /home/cloud-user/.ssh/id_rsa.pub
Copiar a los .ssh/authorized_keys de los nodos

Los nombres de los nodos deben ser iguales a sus hostnames!

Meter en el ~/.ssh/config los nodos con el user ya configurado
Host ceph-mon-1
   Hostname 172.16.2.35
   User cloud-user
Host ceph-2 
   Hostname 172.16.2.36
   User cloud-user
Host ceph-3
   Hostname 172.16.2.37
   User cloud-user

Meter los nodos tambien en el /etc/hosts y distribuir este fichero por todos los nodos.

Comprobar que tenemos ping y conectamos por ssh (tambien a la propia maquina del ceph-deploy).

mkdir cluster
cd cluster

Comprobar que no tenemos requiretty para sudo en este nodo tampoco.

## Despliegue
Empezamos creando el cluster pasando el nodo (o los nodos) que hará de monitor
El comando intentará pasar las claves ssh privadas para que este nodo tega acceso (no he visto que pase)
Comprobará que puede conectar al nodo, que la ip resuelve al hostname que dice, y creará, localmente, una keyring y el fichero ceph.conf
ceph-deploy new ceph-mon-1

Deberan haberse creado tres ficheros:
ceph.conf  ceph-deploy-ceph.log  ceph.mon.keyring


Si tenemos solo dos nodos ceph, tendremos que meter esta linea en la seccion global del ceph.conf
osd pool default size = 2

Instalamos ceph en los nodos (en los que hemos hecho "new" antes):
ceph-deploy install ceph-deploy ceph-1 ceph-2
  llamo ceph-deploy a la maquina desde donde lanzo esto
  tenemos que tener instalado ceph tambien en el ceph-deploy

Si nos da error instalando en la maquina ceph-deploy con este error:
[ceph_deploy][ERROR ] RuntimeError: NoSectionError: No section: 'ceph'
El workaround (http://tracker.ceph.com/issues/12694) es:
sudo mv /etc/yum.repos.d/ceph.repo /etc/yum.repos.d/ceph-deploy.repo

Add the initial monitor(s) and gather the keys:
ceph-deploy mon create-initial
Si falla con esto:
[ceph_deploy.mon][WARNIN] mon.ceph-2 monitor is not yet in quorum, tries left: 1
[ceph_deploy.mon][WARNIN] waiting 20 seconds before retrying
[ceph_deploy.mon][ERROR ] Some monitors have still not reached quorum:
[ceph_deploy.mon][ERROR ] ceph-1
[ceph_deploy.mon][ERROR ] ceph-2

Darle más tiempo y luego volver a ejecutarlo.



Preparar directorios de nodos (OSDs) para añadirlos al cluster (osd.md info especifica):
ceph-deploy osd prepare ceph-1:/mnt ceph-2:/mnt

Activar OSDs
ceph-deploy osd activate ceph-1:/mnt ceph-2:/mnt

Copiar conf a los nodos
ceph-deploy admin ceph-deploy ceph-1 ceph-2

ceph health
FALLA!
Creo que me he perdido algo.
Tiene que haber un nodo admin del cluster? Leer doc




Prueba usando discos directamente. FALLA
Preparar directorios de nodos (OSDs) para añadirlos al cluster (osd.md info especifica):
ceph-deploy osd prepare ceph-1:/dev/vdb ceph-2:/dev/vdb
  Debemos, por cada nodo, leer un mensaje tipo: [ceph_deploy.osd][DEBUG ] Host ceph-1 is now ready for osd use.
  Tambien podemos meter directorios. Ej: ceph-1:/var/local/ceph1 (aunque algo me fallo probando, tal vez permisos en ese dir?)

Activamos los OSDs:
ceph-deploy osd activate ceph-1:/dev/vdb ceph-2:/dev/vdb

Error:
[ceph-1][WARNIN] ceph_disk.main.FilesystemTypeError: Cannot discover filesystem type: device /dev/vdb: Line is truncated:
https://github.com/ceph/ceph-docker/issues/324
El problema es: https://github.com/ceph/ceph-docker/issues/324#issuecomment-231120652
Bug en ceph cerrado por el autor (erroneamente creo): http://tracker.ceph.com/issues/16649


Al final he visto que ya habia montado en cada nodo:
/var/lib/ceph/osd/ceph-X
Asi que hago:
ceph-deploy osd prepare ceph-1:/var/lib/ceph/osd/ceph-1 ceph-2:/var/lib/ceph/osd/ceph-2

Nada! Falla con:
[ceph-1][WARNIN] ceph_disk.main.Error: Error: No cluster conf found in /etc/ceph with fsid 8726370b-d0b6-49a3-9071-00faf78bd0c8
[ceph-1][ERROR ] RuntimeError: command returned non-zero exit status: 1
[ceph_deploy][ERROR ] RuntimeError: Failed to execute command: /usr/sbin/ceph-disk -v activate --mark-init systemd --mount /var/lib/ceph/osd/ceph-1




# Borar instalacion
If at any point you run into trouble and you want to start over, execute the following to purge the configuration:
ceph-deploy purgedata {ceph-node} [{ceph-node}]
ceph-deploy forgetkeys

To purge the Ceph packages too, you may also execute:
ceph-deploy purge {ceph-node} [{ceph-node}]
