# https://wiki.icinga.org/display/howtos/Build+Icinga+RPMs

RPMs utiles:
yum groupinstall "Development tools"


yum install rpmdevtools make
/usr/sbin/useradd makerpm
su - makerpm
rpmdev-setuptree
cd rpmbuild
vim ~/.rpmmacros
Podemos definir macros del sistema (/etc/rpm/macros.dist)


Hacer un paquete desde fuentes:
vi SPECS/paquete.spec
chown makerpm:makerpm SPECS/paquete.spec
spectool -g -R SPECS/*.spec
rpmbuild -ba SPECS/icinga.spec

Paquete creado en RPMS/$architecture/
