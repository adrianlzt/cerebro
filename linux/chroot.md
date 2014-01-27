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
