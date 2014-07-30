##########
# Ubuntu #
##########

# https://help.ubuntu.com/community/BasicChroot
Crear un entorno enjaulado para hacer pruebas:
Como root:

apt-get install dchroot debootstrap
mkdir /srv/chroot/squeeze

Activamos alguna de las srviantes (squeeze)
vi /etc/schroot/schroot.conf

[precise]
description=Ubuntu Precise
directory=/srv/chroot/precise
users=adrian #Lista de usuarios que pueden entrar al chroot
root-users=root #Lista de usuarios que pueden acceder al chroot sin password


debootstrap --verbose --srviant=buildd precise /srv/chroot/precise http://es.archive.ubuntu.com/ubuntu
buildd, which installs the build-essential packages


Estos comandos no son necesarios. Solo si vamos a tener que usar estos ficheros especiales:
mkdir -p /srv/chroot/precise/proc /srv/chroot/precise/dev/pts /srv/chroot/precise/sys
mount -o bind /proc /srv/chroot/precise/proc
mount -o bind /dev /srv/chroot/precise/dev
mount -o bind /dev/pts /srv/chroot/precise/dev/pts
mount -o bind /sys /srv/chroot/precise/sys

Y si queremos tener resolución de DNS:
cp /etc/resolv.conf /srv/chroot/precise/etc/resolv.conf


Entramos en el entorno chrooteado:
chroot /srv/chroot/precise



##########
# CentOS #
##########
http://geek.co.il/2010/03/14/how-to-build-a-chroot-jail-environment-for-centos

mkdir /opt/puppet-simulator
mkdir -p /opt/puppet-simulator/var/lib/rpm
rpm --rebuilddb --root=/opt/puppet-simulator
wget http://mirror.centos.org/centos/6.5/os/x86_64/Packages/centos-release-6-5.el6.centos.11.1.x86_64.rpm
rpm -i --root=/opt/puppet-simulator --nodeps centos-release-6-5.el6.centos.11.1.x86_64.rpm
yum --installroot=/opt/puppet-simulator install -y rpm-build yum

# Montar /proc y /dev enlazados. OpenSSL por ejemplo necesita /dev/urandom
mount --bind /proc /opt/puppet-simulator/proc
mount --bind /dev /opt/puppet-simulator/dev

chroot /opt/puppet-simulator




## schroot ##
Permitir a usuarios no root entrar y ejecutar comandos en entornos chroot.

/etc/schroot/chroot.d/puppet.conf
[puppet]
type=plain
description=Puppet simulator
directory=/opt/puppet-simulator
users=apache
groups=apache
root-groups=apache

Permite al usuario apache ejecutar comandos como root en el chroot:
apache$ schroot -c puppet -u root -d / yum install nc
