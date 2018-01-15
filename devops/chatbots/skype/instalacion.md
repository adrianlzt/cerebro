# Ubuntu
apt-get install gdebi
/etc/apt/sources.list

Activar
deb http://archive.canonical.com/ubuntu trusty partner

apt-get update
apt-get install gdebi

dpkg --add-architecture i386
apt-get update
wget -O skype-install.deb http://www.skype.com/go/getskype-linux-deb
dpkg -i skype-install.deb
apt-get upgrade --fix-missing
apt-get -f install -y
dpkg -i skype-install.deb


# Centos
https://wiki.centos.org/HowTos/Skype
http://www.if-not-true-then-false.com/2012/install-skype-on-fedora-centos-red-hat-rhel-scientific-linux-sl/comment-page-4/

Problemas de dependencias:
Error: Package: glibc-2.12-1.107.el6.i686 (CentOS-Base)
           Requires: glibc-common = 2.12-1.107.el6
           Installed: glibc-common-2.12-1.149.el6_6.9.x86_64 (@pro-rhel-x86_64-server-6)
               glibc-common = 2.12-1.149.el6_6.9
           Available: glibc-common-2.12-1.107.el6.x86_64 (CentOS-Base)
               glibc-common = 2.12-1.107.el6

