http://ceph.com/install/

Tienen codigo para desplegar con ansible, puppet, chef, etc

# Compatibilidades
http://docs.ceph.com/docs/master/start/os-recommendations/

Recomiendan kernels nuevos (4.4, 4.9)
CentOS 7 vale

# Manual
Montar 4 nodos, 1 ceph-deploy mas 3 servers

En todos los nodos:
yum install ntp ntpdate ntp-doc yum-plugin-priorities


## ceph-deploy
yum install -y epel-release

Meter repo de ceph:
[ceph-noarch]
name=Ceph noarch packages
baseurl=https://download.ceph.com/rpm-{ceph-release}/{distro}/noarch
enabled=1
gpgcheck=1
type=rpm-md
gpgkey=https://download.ceph.com/keys/release.asc

yum update && yum install ceph-deploy

No se ejecuta con root
Este nodo necesita acceso ssh paswordless a los clientes. Sudo sin password y sin requiretty tambien.
selinux desactivado
cephdeploy$ ssh-keygen
cephdeploy$ cat /home/cloud-user/.ssh/id_rsa.pub
Copiar a los .ssh/authorized_keys de los nodos

Los nombres de los nodos deben ser iguales a sus hostnames! Aqui usare los nombres node{1,2,3} y ceph-deploy

Meter en el ~/.ssh/config los nodos con el user ya configurado
Host node1
   Hostname 172.16.2.35
   User cloud-user
Host node2
   Hostname 172.16.2.36
   User cloud-user
Host node3
   Hostname 172.16.2.37
   User cloud-user

Meter los nodos tambien en el /etc/hosts

Comprobar que tenemos ping y conectamos por ssh.
Tambien a la propia maquina ceph-deploy

mkdir cluster
cd cluster

Comprobar que no tenemos requiretty para sudo en este nodo tampoco.

## Despliegue
ceph-deploy new node1 node2

Deberan haberse creado tres ficheros:
ceph.conf  ceph-deploy-ceph.log  ceph.mon.keyring


Si tenemos solo dos nodos ceph, tendremos que meter esta linea en la seccion global del ceph.conf
osd pool default size = 2

Instalamos ceph en los nodos (en los que hemos hecho "new" antes):
ceph-deploy install ceph-deploy node1 node2
  llamo ceph-deploy a la maquina desde donde lanzo esto
  tenemos que tener instalado ceph tambien en el ceph-deploy

Si nos da error instalando en la maquina ceph-deploy con este error:
[ceph_deploy][ERROR ] RuntimeError: NoSectionError: No section: 'ceph'
El workaround (http://tracker.ceph.com/issues/12694) es:
sudo mv /etc/yum.repos.d/ceph.repo /etc/yum.repos.d/ceph-deploy.repo

Add the initial monitor(s) and gather the keys:
ceph-deploy mon create-initial




# Borar instalacion
If at any point you run into trouble and you want to start over, execute the following to purge the configuration:
ceph-deploy purgedata {ceph-node} [{ceph-node}]
ceph-deploy forgetkeys

To purge the Ceph packages too, you may also execute:
ceph-deploy purge {ceph-node} [{ceph-node}]
