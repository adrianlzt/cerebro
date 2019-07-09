Si queremos generar un rpm a partir de un rpm ya instalado: rpmrebuild.md

http://wiki.centos.org/HowTos/RebuildSRPM

yum install -y rpmdevtools make
Opcional:
  Instalar epel
  yum groupinstall "Development tools"
/usr/sbin/useradd makerpm
su - makerpm
(a partir de aqui como usuario makerpm)
rpmdev-setuptree
cd rpmbuild

Bajamos el *.src.rpm. 
Manualmente o con:
  yum install yum-utils
  yumdownloader --source pkgname

Instalamos un fuente (.src.rpm):
rpm -hvi <paquete>.src.rpm
  lo instala en ~/rpmbuild/

Miramos que requisitos de build tiene el spec (mirar el fichero, porque puede que ciertos requires solo sean para ciertos entornos/versiones):
grep BuildRequires SPECS/*.spec
Y los instalamos
grep BuildRequires SPECS/*.spec | awk '{print $2;}' | xargs echo yum install

Modificamos spec: rpmbuild/SPECS/<nombre>.spec, o código rpmbuild/SOURCES
Generamos rpm y src.rpm:
$ rpmbuild -ba ~/rpmbuild/SPECS/<nombre>.spec
  -ba  build source and binary packages from <specfile>



Algunos rpms pueden ser generados con el mismo .src.rpm.
Por ejemplo, nrpe y nagios-plugins-nrpe se generan con nrpe...src.rpm
