http://wiki.centos.org/HowTos/RebuildSRPM

yum install -y rpmdevtools make
/usr/sbin/useradd makerpm
su - makerpm
(a partir de aqui como usuario makerpm)
rpmdev-setuptree
cd rpmbuild

Bajamos el *.src.rpm. 
Manualmente o con: $ yumdownloader --source pkgname

Instalamos un fuente (.src.rpm): 
rpm -hvi <paquete>.src.rpm

Modificamos spec: rpmbuild/SPECS/<nombre>.spec, o código rpmbuild/SOURCES
Generamos rpm y src.rpm:
$ rpmbuild -ba ~/rpmbuild/SPECS/<nombre>.spec
  -ba  build source and binary packages from <specfile>



Algunos rpms pueden ser generados con el mismo .src.rpm.
Por ejemplo, nrpe y nagios-plugins-nrpe se generan con nrpe...src.rpm
