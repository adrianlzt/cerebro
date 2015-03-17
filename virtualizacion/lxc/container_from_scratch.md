# Demo - minimal container


Practicas sobre una debian 7.7

Notas para hacerlo en arch:
Usar busybox de la web, el de pacman tiene linkado dinámico, por lo que nos pedirá tambien ciertas librerias en /lib
Cambiar el PATH, ya que el del sistema no tiene /bin, /sbin...


Necesitamos tener instalado:
  ystemd
  busybox

mkdir /contenedor
cd /contenedor
mkdir -p {minimal,minimal/usr}/{bin,sbin,etc}
cd minimal/
for i in $(busybox --list-full); do ln -s /bin/sh $i; done
# se linka a /bin/sh porque la herramienta que vamos a usar para crear el container (systemd spoon) hace unos health checks, y uno de ellos es comprobar que no hay ningun symlink hacia fuera del container.
rm bin/sh
cp /bin/busybox bin/sh
touch etc/os-release
cd ..

Antes de hacer un container, vamos a entrar como chroot
chroot minimal /bin/sh
  cambiamos el namespace mount para que ahora nuestro root sea minimal/, y ejecutamos dentro de ese namespace, el comando /bin/sh
ps
  no funciona, porque tenemos un container pero faltan algunas piezas para que sea completo.

exit
  salimos del chroot

systemd-nspawn -D minimal /bin/sh
  aqui, además del namespace mount tenemos el pid.

ps aux
  veremos nuestro propio namespace

ip a
No tenemos un network namespace, por lo que veremos las interfaces del sistema


exit
  salimos del container para crearlo con namespace de red


systemd-nspawn --private-network -D minimal /bin/sh
  ahora tenemos 3 namespaces: mount, network y pid

Si corremos top dentro del container, podremos ver el proceso con ps en el host:
root      2743  0.0  0.0  19468  2096 pts/11   S+   21:36   0:00  |           \_ systemd-nspawn --private-network -D minimal /bin/sh
root      2745  0.0  0.0   1144     4 ?        Ss   21:36   0:00  |               \_ /bin/sh
root      2756  0.0  0.0   1140     4 ?        S    21:36   0:00  |                   \_ top

Veremo que los numeros PIDs son distintos vistos desde dentro del sistema y desde fuera.


# Crear una imagen de un container
Tenemos que empaquetar todos el sistema en un fichero para poder compartirlo.

Ejemplo con cpio:
find minimal -print | cpio -o | pbzip2 -c > minimal.cpio.bz


# Limitando recursos
Mirar linux/cgroups-systemd.md



# Network
Mirar network/ip.md namespaces

Tengo namespace con una interfaz conectada a otra interfaz en el host.

ip netns exec minimal chroot minimal/ /bin/sh
  en el network namespace minimal, ejecuto el comando 'chroot minimal/ /bin/sh'
  Termino en el network namespace 'minimal' dentro del mount namespace donde el directorio minimal/ es root

Dentro del chroot:
ip addr add 10.0.0.2/24 dev eth1
ip link set eth1 up

En el host:
ip addr add 10.0.0.1/24 dev veth1
ip link set veth1 up

Y ya tenemos conectividad entre el container y el host.


Con systemd spoon solo tenemos que hacer (implementado en la 218. En la 44 no está):
systemd-nspawn --network-veth -D minimal /bin/sh
  pero no se como lo hace, o al menos no veo el network namespace con el comando 'ip netns list'

Tambien podemos crear dos interfaces peer y unir una de ellas con:
systemd-nspawn --network-interface=eth2 -D nuevo /bin/sh
  habrá que configuralas tras conectarlas. Al cerrar el spoon desaparecen las interfaces


# Despliegue de software con YUM
mkdir ftpserver/

yum.conf:
[main]
cachedir=/var/cache/yum
keepcache=1
debuglevel=2
logfile=/var/log/yum.log
exactarch=1
obsoletes=1

[base]
name=CentOS-7 - Base
baseurl=http://centos.mirror.xtratelecom.es/7/os/x86_64/
#mirrorlist=http://mirrorlist.centos.org/?release=7&arch=x86_64&repo=os
gpgcheck=0
enabled=1

Instalamos software:
yum -c yum.conf --installroot=/full/path/ftpserver/ install vsftpd

ip netns exec minimal chroot ftpserver /bin/bash
vsftpd
  por defecto corre en modo demonio, por lo que si salimos de la shell se mantendrá ejecutándose

También podríamos hacer:
ip netns exec minimal chroot ftpserver /usr/sbin/vsftpd


# Base layer centos
mkdir /dir/base
yum -c yum.conf --installroot=/dir/base install basesystem
  200MB
  a partir de ahora podremos quitar el "-c yum.conf", porque yum encontrará la configuración en el installroot



# AUFS para ir creando capas
mkdir /dir/app /dir/tmp
mount -t aufs -o br=/dir/app:/dir/base none /dir/tmp

sed -i s/'gpgcheck=1'/'gpgcheck=0'/ /dir/tmp/etc/yum.repos.d/*
  si no, intentará buscar la key en nuestro host
yum --installroot=/dir/tmp/ install vsftpd


Ahora si queremos empaquetar nuestra app solo necesitaremos el directorio app/
find app -print | cpio -o | pbzip2 -c > app.cpio.bz2

Se supongo que la base layer ya está disponible, nosotros solo realizamos cambios sobre la app.

Ahora en un servidor remoto, volverán a usar aufs para ir montando la base con las versiones de la app que le vayamos enviando.



# Instalar un sistema entero (~850MB)
mkdir /tmp/centos-rootfs
yum -c yum.conf --installroot=/tmp/centos-rootfs groupinstall core
  puede que falle btrfs-progs.i686, pero si lo queremos para un container nos dara igualç

Un poco de cleanup
chroot /tmp/centos-rootfs
passwd root
sed -i '/selinux/d' /etc/pam.d/login
sed -i '/pam_loginuid.so/d' /etc/pam.d/login
  desactivar selinux
systemd-nspawn --private-network -D centos-rootfs/ /sbin/init

No necesitamos arrancar el sistema entero, podríamos hacer por ejemplo:
systemd-nspawn --private-network -D centos-rootfs/ /usr/bin/app



# Seguridad
Aun no está suficientemente desarrollado para fiarse del aislamiento que puede ofrecer los containers
