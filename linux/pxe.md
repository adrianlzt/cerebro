http://download.intel.com/design/archives/wfm/downloads/pxespec.pdf
http://www.syslinux.org/wiki/index.php/PXELINUX
https://www.debian-administration.org/article/478/Setting_up_a_server_for_PXE_network_booting
Setting up a server for PXE network booting

https://github.com/paulmaunders/TFTP-PXE-Boot-Server
Ficheros listos para cargar centos con pxe

Pasos de como funciona un carga por PXE: http://docs.oracle.com/cd/E24628_01/em.121/e27046/appdx_pxeboot.htm
pxe-pasos.md


# Instalacion
mkdir /var/lib/tftpboot
apt-get install dnsmasq
  dnsmasq como servidor dhcp y tftp


# Configuration
Ejemplo tambien en networking/dhcp/isc-dhcp-server.md

/etc/dnsmasq.d/pxe
interface=eth1
dhcp-range=192.168.1.200,192.168.1.220,12h
dhcp-option=3,192.168.1.1
dhcp-option=6,8.8.8.8,8.8.4.4
dhcp-boot=/var/lib/tftpboot/pxelinux.0
dhcp-option-force=209,default
dhcp-option-force=210,/var/lib/tftpboot/pxelinux.cfg/
enable-tftp
tftp-root=/var/lib/tftpboot

# La opcion 210 es para definir el working dir. Si no lo definimos sera el path del fichero pxelinux.0
# Todos los ficheros sin path absoluto se buscaran en el working dir


# Ejemplos de configuracion del fichero default para CentOS: http://wiki.centos.org/es/HowTos/PXE/PXE_Setup/Menus

mkdir /var/lib/tftpboot/pxelinux.cfg
vi /var/lib/tftpboot/pxelinux.cfg/default
DISPLAY boot.txt

DEFAULT centos7

LABEL centos7
        MENU LABEL CentOS 7.0 x86_64
        KERNEL centos/7/x86_64/vmlinuz
        APPEND initrd=centos/7/x86_64/initrd.img ramdisk_size=100000 ip=dhcp repo=http://sunsite.rediris.es/mirror/CentOS/7/os/x86_64/

LABEL trusty
        KERNEL ubuntu/trusty/amd64/linux
        APPEND vga=normal initrd=ubuntu/trusty/amd64/initrd.gz

PROMPT 1
TIMEOUT 100
ONTIMEOUT centos7

# Para ver sirve default?
# Y display?
# Y menu label?

# Para centos, en APPEND se le puede pasar un kickstarter (fichero con las instrucciones de como instalarse)


vi /var/lib/tftpboot/pxelinux.cfg/boot.txt
- Boot Menu -
=============

centos7
trusty


# Ficheros ubuntu
cd /var/lib/tftpboot/pxelinux.cfg
wget http://archive.ubuntu.com/ubuntu/dists/trusty-updates/main/installer-amd64/current/images/netboot/pxelinux.0
mkdir -p ubuntu/trusty/amd64
cd ubuntu/trusty/amd64
wget http://archive.ubuntu.com/ubuntu/dists/trusty-updates/main/installer-amd64/current/images/netboot/ubuntu-installer/amd64/linux
wget http://archive.ubuntu.com/ubuntu/dists/trusty-updates/main/installer-amd64/current/images/netboot/ubuntu-installer/amd64/initrd.gz

# Ficheros CentOS
cd /var/lib/tftpboot/pxelinux.cfg
mkdir -p centos/7/x86_64/
cd centos/7/x86_64/
wget http://ftp.cixug.es/CentOS/7.0.1406/os/x86_64/images/pxeboot/initrd.img
wget http://ftp.cixug.es/CentOS/7.0.1406/os/x86_64/images/pxeboot/upgrade.img
wget http://ftp.cixug.es/CentOS/7.0.1406/os/x86_64/images/pxeboot/vmlinuz



# PXE live cd
https://fedorahosted.org/cobbler/wiki/HowToPxeAnyLiveCd
https://www.centos.org/forums/viewtopic.php?t=20038


# GNUParted Live CD
http://gparted.org/livepxe.php

Se carga un kernel y un initrd. Este initrd se baja la imagen del livecd por http.


# Diskless
http://backreference.org/2013/12/23/diskless-iscsi-boot-with-pxe-howto/
https://www.kernel.org/doc/Documentation/filesystems/nfs/nfsroot.txt
