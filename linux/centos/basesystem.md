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


Sistema base, sin boot, ni kernel (200MB)
yum -c yum.conf --intallroot=/mnt/ install basesystem


Sistema completo, lo que nos dejaría una instalación minima con el instalador de centos (850MB)
yum -c yum.conf --installroot=/tmp/centos-rootfs groupinstall core

  puede que falle btrfs-progs.i686, pero si lo queremos para un container nos dara igual

Un poco de cleanup necesario:
chroot centos-rootfs/
passwd root
sed -i '/selinux/d' /etc/pam.d/login
sed -i '/pam_loginuid.so/d' /etc/pam.d/login
  desactivar selinux
