http://developerblog.redhat.com/2015/01/07/using-mock-to-build-python27-software-collections-packages-for-rhel6/#more-414639O

https://fedoraproject.org/wiki/Projects/Mock

Mock takes a srpm and builds it in a chroot. This ensures that your BuildRequires lines are correct, that there are no missing dependencies, and that it builds cleanly.

Instalar los repos de epel
Luego:
yum install mock python-ctypes

cd /etc/mock
cp epel-6-x86_64.cfg centos-6-x86_64.cfg
Cambiar
config_opts['root'] = 'epel-6-x86_64'
por
config_opts['root'] = 'centos-6-x86_64'


usermod -G mock makerpm
su - makerpm
rpmdev-setuptree
mock -r centos-6-x86_64 --init   <- Iniciamos el entorno chroot para compilar paquetes para centos-6-x86_64




Ejemplo, instrucciones para collectd:

# - install and configure mock (https://fedoraproject.org/wiki/Projects/Mock)
#
# - enable the EPEL repository (http://dl.fedoraproject.org/pub/epel/) in the
#   configuration files for your target systems (/etc/mock/*.cfg).
#
# - copy this file in your ~/rpmbuild/SPECS/ directory
#
# - fetch the desired collectd release file from https://collectd.org/files/
#   and save it in your ~/rpmbuild/SOURCES/ directory <- debe ser el .tar.bz2
#
# - build the SRPM first: <- Fijarse que la versión de collectd en el .spec corresponde con el del tar.bz2
#   mock -r centos-6-x86_64 --buildsrpm --spec ~/rpmbuild/SPECS/collectd.spec --sources ~/rpmbuild/SOURCES/  <- lo generará en /var/lib/mock/centos-6-x86_64/result
#
# - then build the RPMs:
#   mock -r centos-6-x86_64 --no-clean --rebuild /var/lib/mock/centos-6-x86_64/result/collectd-X.Y.Z-NN.src.rpm
#
# - you can also optionally enable/disable plugins which are disabled/enabled
#   by default:
#   mock -r centos-6-x86_64 --no-clean --without=java --with=oracle --rebuild /var/lib/mock/centos-6-x86_64/result/collectd-X.Y.Z-NN.src.rpm
#

Los rpms generados los dejará en
/var/lib/mock/centos-6-x86_64/result
