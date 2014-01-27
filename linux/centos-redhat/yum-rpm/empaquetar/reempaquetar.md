http://wiki.centos.org/HowTos/RebuildSRPM

yum install rpmdevtools make
/usr/sbin/useradd makerpm
su - makerpm
rpmdev-setuptree
cd rpmbuild

Bajamos el *.src.rpm. Manualmente o con: yumdownloader --source pkgname

Instalamos un fuente (.src.rpm): 
$ rpm -hvi <paquete>.src.rpm

Modificamos spec: rpmbuild/SPECS/<nombre>.spec, o código rpmbuild/SOURCES
Generamos rpm y src.rpm:
$ rpmbuild -ba ~/rpmbuild/SPECS/<nombre>.spec
  -ba  build source and binary packages from <specfile>
