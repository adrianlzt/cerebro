Para Ubuntu:
Bajar de http://apt.puppetlabs.com/ el .deb de nuestra versión de ubuntu.
dpkg -i paquete.deb

apt-get update
apt-get install puppet


RHEL:
rpm -ivh http://yum.puppetlabs.com/el/6/products/i386/puppetlabs-release-6-7.noarch.rpm
yum install -y puppet

