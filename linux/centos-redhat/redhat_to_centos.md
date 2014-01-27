http://www.unixmen.com/201201-how-to-convert-rhel-6-x-to-centos-6-x/

Mirar que version 6.x queremos, y cambiarlo en las url.
Mirar las versiones que toque de centos-release, yum-xxx yum-utils, yum-plugin...

yum clean all
mkdir ~/centos
cd ~/centos
wget http://mirror.centos.org/centos/6.4/os/x86_64/RPM-GPG-KEY-CentOS-6
wget http://mirror.centos.org/centos/6.4/os/x86_64/Packages/centos-release-6-4.el6.centos.10.x86_64.rpm
wget http://mirror.centos.org/centos/6.4/os/x86_64/Packages/yum-3.2.29-40.el6.centos.noarch.rpm
wget http://mirror.centos.org/centos/6.4/os/x86_64/Packages/yum-utils-1.1.30-14.el6.noarch.rpm
wget http://mirror.centos.org/centos/6.4/os/x86_64/Packages/yum-plugin-fastestmirror-1.1.30-14.el6.noarch.rpm
rpm --import RPM-GPG-KEY-CentOS-6
rpm -e --nodeps redhat-release-server
rpm -e yum-rhn-plugin rhn-check rhnsd rhn-setup rhn-custom-info
rpm -Uhv --force *.rpm
yum upgrade
