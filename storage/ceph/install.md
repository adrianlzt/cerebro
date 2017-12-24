mirar ansible.md

http://ceph.com/install/
http://www.virtualtothecore.com/en/adventures-ceph-storage-part-3-design-nodes/
https://www.howtoforge.com/tutorial/how-to-build-a-ceph-cluster-on-centos-7/
http://www.virtualtothecore.com/en/adventures-ceph-storage-part-1-introduction/

Tienen codigo para desplegar con ansible, puppet, chef, etc

# Compatibilidades
http://docs.ceph.com/docs/master/start/os-recommendations/

Recomiendan kernels nuevos (4.4, 4.9)
CentOS 7 vale
As of December 2014, XFS is the recommended underlying filesystem type for production environments, while Btrfs is recommended for non-production environments. ext4 filesystems are not recommended because of resulting limitations on the maximum RADOS objects length.[11]



# Un unico nodo
http://docs.ceph.com/docs/master/rados/troubleshooting/troubleshooting-pg/
DO NOT mount kernel clients directly on the same node as your Ceph Storage Cluster, because kernel conflicts can arise. However, you can mount kernel clients within virtual machines (VMs) on a single node.

If you are trying to create a cluster on a single node, you must change the default of the osd crush chooseleaf type setting from 1 (meaning host or node) to 0 (meaning osd) in your Ceph configuration file before you create your monitors and OSDs. This tells Ceph that an OSD can peer with another OSD on the same host. If you are trying to set up a 1-node cluster and osd crush chooseleaf type is greater than 0, Ceph will try to peer the PGs of one OSD with the PGs of another OSD on another node, chassis, rack, row, or even datacenter depending on the setting.




# Instalacion usando ceph-deployer
http://docs.ceph.com/docs/hammer/man/8/ceph-deploy/

El admin node será dede donde lanzemos los comandos ceph-deploy, nuestro portatil por ejemplo.
Montamos 1 nodo mon (ceph-mon-1) y 2 OSDs (ceph-1 y ceph-2)

En todos los nodos:
yum install -y ntp ntpdate ntp-doc && systemctl enable ntpd && systemctl start ntpd


## ceph-deploy
Deberemos tener la herramienta intalada (depende de SO. Arch: yaourt -S ceph-deploy)
Este nodo necesita acceso ssh paswordless a los clientes. Sudo sin password y sin requiretty tambien.

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

Meter los nodos tambien en el /etc/hosts (sus ips internas, las que usaran para conectarse)
En los /etc/hosts de los nodos del cluster deberan estar tambien el resto de nodos, con las IPs que usen para conectarse entre ellos.

Comprobar que conectamos por ssh

mkdir cluster
cd cluster

Comprobar que no tenemos requiretty para sudo en este nodo tampoco.

## Despliegue
Empezamos creando el cluster pasando el nodo (o los nodos) que hará de monitor
El comando intentará pasar las claves ssh privadas para que este nodo tega acceso (no he visto que pase)
Comprobará que puede conectar al nodo, que la ip resuelve al hostname que dice, y creará, localmente, una keyring y el fichero ceph.conf
ceph-deploy new ceph-mon-1

Revisar el fichero de ceph.conf, la ip que aparezca debe ser la interna (con la que se vaya a comunicar)
Desplegando desde mi portatil a unas VMs virtuales (a las que accedo por IPs virtuales) tengo que poner el comando asi:
ceph-deploy new --public-network 172.16.2.0/24 ceph-mon-1
  siendo esa red la de las maquinas

Si tenemos solo dos nodos ceph, haremos:
echo "osd pool default size = 2" >> ceph.conf
  poner a 1 si vamos a montar un ceph de solo un nodo

Instalamos ceph en los nodos (monitores y OSDs).
Mete lo repo de ceph e instala: ceph-common, ceph-base, ceph-selinux, ceph-mon, ceph-osd, ceph-mds, ceph, ceph-radosgw
ceph-deploy install ceph-mon-1 ceph-1 ceph-2

Desplegamos ceph-monitor en los nodos que vayan a hacer la funcion de monitores. Copia ceph.conf al nodo
ceph-deploy mon create-initial
  en caso de fallo mirar el log en la maquina

Ahora podemos mirar los discos que tenemos disponibles en las máquinas que van a ejecutar los OSDs:
ceph-deploy disk list ceph-1 ceph-2
  en caso de no estar vacios, borrar las particiones con parted

Creamos los OSD con los discos que vayamos a usar (mejor discos enteros sin particionar) (create hace prepare y luego activate)
Particionará el disco en dos (para 10GB lo ha partido en 5 y 5), uno para journal y otro para data (XFS) (prepare)
Luego los unirá al cluster (activate)
Copiara el fichero /etc/ceph/ceph.conf
ceph-deploy osd create ceph-1:/dev/vdb ceph-2:/dev/vdb

Comprobamos que los discos se han añadido correctamente:
ceph-deploy osd list ceph-1:/dev/vdb ceph-2:/dev/vdb

Con este comando podemos copiar el fichero ceph.conf y la clave (keyring) a nodos para que puedan llamar al comando ceph
El nodo mon ya lo tiene, no le hace falta.
Podemos pasarlo a los nodos osd si querems poder ejecutar ceph desde ahi (opcional)
ceph-deploy admin ceph-1 ceph-2

ceph health
Si tenemos problemas mirar monitorizar.md
Podemos seguir mirando administration.md


# Borar instalacion
If at any point you run into trouble and you want to start over, execute the following to purge the configuration:
ceph-deploy purgedata {ceph-node} [{ceph-node}]
ceph-deploy forgetkeys

To purge the Ceph packages too, you may also execute:
ceph-deploy purge {ceph-node} [{ceph-node}]




# Instalar un cliente
/etc/yum.repos.d/ceph.repo
[Ceph]
name=Ceph packages for $basearch
baseurl=http://download.ceph.com/rpm-jewel/el7/$basearch
enabled=1
gpgcheck=1
type=rpm-md
gpgkey=https://download.ceph.com/keys/release.asc
priority=1

[Ceph-noarch]
name=Ceph noarch packages
baseurl=http://download.ceph.com/rpm-jewel/el7/noarch
enabled=1
gpgcheck=1
type=rpm-md
gpgkey=https://download.ceph.com/keys/release.asc
priority=1

[ceph-source]
name=Ceph source packages
baseurl=http://download.ceph.com/rpm-jewel/el7/SRPMS
enabled=1
gpgcheck=1
type=rpm-md
gpgkey=https://download.ceph.com/keys/release.asc
priority=1


yum install -y epel-release
yum install -y ceph

Copiar /etc/ceph/ceph.conf y /etc/ceph/ceph.client.admin.keyring
O gestionar una clave que no sea de admin.
