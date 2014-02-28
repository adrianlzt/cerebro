 https://github.com/jordansissel/fpm#readme
https://github.com/jordansissel/fpm/wiki

Software para hacer mas sencillo el empaquetamiento

Instalación:
  Dependencias:
    Debian-like: sudo apt-get install rubygems ruby1.9.1-dev
    En centos: yum install rubygems ruby-devel.

gem install fpm

Crear paquetes:
fpm -s <source type> -t <target type> -n <package name> -v <version> [list of sources]...

"Source type" is what your package is coming from; a directory (dir), a rubygem (gem), an rpm (rpm), a python package (python), a php pear module (pear), etc.

"Target type" is what your output package form should be. Most common are "rpm" and "deb" but others exist (solaris, etc)

-d <dependencia>

-e <- Nos deja editar el .spec antes de generar el rpm

Ejemplo:
Tras instalar un paquete nos genera sus ficheros en /usr/share/programa
Para crear un rpm hacemos:
fpm -s dir -t rpm -n nombre_programa -v 0.1 -d dependencia /usr/share/programa


## RPMS ##
Para crear rpms en debian-like necesitamos: apt-get install rpm
En RedHat like: yum install rpm-build

Si queremos poner un epoch: --epoch <valor>
Ejemplo: fpm --epoch 2 -s gem -t rpm 1.5.2 rack

## Directorio ##
RPM a partir de un .tar.gz
mkdir /tmp/fpm
cd programa/
./configure --prefix=/tmp/fpm
make
make install
cd /tmp/fpm
fpm -s dir -t rpm -n nombre_programa -v 0.1 -d dependencia .




## Python ##

Para generar rpm necesita: yum install rpm-build

A partir de un setup.py local
fpm -s python -t rpm pyramid/setup.py

A partir de un modulo de python (se bajará el modulo de la web)
fpm -s python -t rpm pyramid


Para que no genere las dependencias:
--no-depends


## Gemas ##
fpm -s gem -t rpm -v 1.2.3 nombre
