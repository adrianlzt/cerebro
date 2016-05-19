http://packages.icinga.org/

CentOS: 
curl http://packages.icinga.org/epel/ICINGA-release.repo -o /etc/yum.repos.d/ICINGA-release.repo

.src.rpm: https://packages.icinga.org/epel/6Server/release/src/icinga-1.13.3-0.el6.src.rpm

Por ahora (15/10/2013) solo veo los paquetes de icinga-web

Para ubuntu: https://launchpad.net/~formorer/+archive/icinga


Cuando te bajas el tgz viene con un fichero .spec para generar los rpm

https://wiki.icinga.org/display/howtos/Build+Icinga+RPMs


curl http://packages.icinga.org/epel/ICINGA-release.repo -o /etc/yum.repos.d/ICINGA-release.repo
rpm -Uvh "http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm"
yum install groupinstall "Development tools"
yum install -y rpmdevtools gcc gd-devel httpd zlib-devel libpng-devel libjpeg-devel libdbi-devel 'perl(ExtUtils::Embed)' make tar
yumdownloader --source icinga
/usr/sbin/useradd makerpm
su - makerpm
rpmdev-setuptree
cd rpmbuild

rpmbuild -ba ~/rpmbuild/SPECS/icinga.spec
