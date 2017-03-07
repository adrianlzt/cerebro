https://github.com/jordansissel/fpm#readme
https://github.com/jordansissel/fpm/wiki

Software para hacer mas sencillo el empaquetamiento

Instalación:
  Dependencias:
    Debian-like: sudo apt-get install rubygems ruby1.9.1-dev
    En centos: yum install rubygems ruby-devel
    Arch (al menos): yaourt -S rpm-org

Con Docker:
  docker run --rm -w /mnt -v "$PWD:/mnt" tenzer/fpm fpm -s dir -t rpm -n PackageName app/
  docker run --rm -w /mnt -v "$PWD:/mnt" tenzer/fpm fpm -s rpm -t deb programa.rpm

gem install fpm

Para centos6:
gem install fpm -v 1.4.0
  https://github.com/jordansissel/fpm/issues/1090

Crear paquetes:
fpm -s <source type> -t <target type> -n <package name> -v <version> [list of sources]...

"Source type" is what your package is coming from; a directory (dir), a rubygem (gem), an rpm (rpm), a python package (python), a php pear module (pear), etc.

"Target type" is what your output package form should be. Most common are "rpm" and "deb" but others exist (solaris, etc)

-d <dependencia>
  -d 'name'
  -d 'name > version'
  -d 'clog = 0.33-1'

Para mirar las deps de un binario:
ldd /usr/bin/xxx
 

-e <- Nos deja editar el .spec antes de generar el rpm

-a ARCH (all para poner noarch)

-x dir/*  <- Nos permite no meter ficheros en el rpm, pero no consigo que me funcione

--config-files file/path <- nos permite marcar en los rpms que estos ficheros son de configuracion

Ejemplo:
Tras instalar un paquete nos genera sus ficheros en /usr/share/programa
Para crear un rpm hacemos:
fpm -s dir -t rpm -n nombre_programa -v 0.1 -d dependencia /usr/share/programa


## RPMS ##
Para crear rpms en debian-like necesitamos: apt-get install rpm
En RedHat like: yum install rpm-build
Archlinux: packer -S rpm-org

Si queremos poner un release (a.b.c-X): --iteration <valor>
Ejemplo: fpm --iteration 2 -s gem -t rpm 1.5.2 rack

--epoch N
  esto vale mas que el numero de release
  se suele escribir como: EPOCH:nombre-a.b.c-release

Poner dependencias como librerias:
-d 'libspeex.so.1()(64bit)'
en general
-d 'libXXX.so.N()(64bit)'

## Directorio ##
RPM a partir de un .tar.gz
mkdir /tmp/fpm
cd programa/
./configure --prefix=/tmp/fpm
make
make install
cd /tmp/fpm
fpm -s dir -t rpm -n nombre_programa -v 0.1 -d dependencia .

Si queremos que todos los ficheros del directorio actual se guarden en el rpm debajo de /opt/ui
fpm -s dir --prefix /opt/ui -t rpm -n puppet-monitoring-ui .

Genera una segunda iteración (a.b.c-2) para noarch, marcando dos ficheros como cofiguración (rpm guarda los antiguos al instalar el paquete). Si ponemos un --prefix hay que poner la ruta absoluta de los --config-files
fpm -s dir --prefix /opt/ui -t rpm -n puppet-monitoring-ui -v 0.4.3 -a all --iteration 2 --config-files /opt/ui/config/database.yml --config-files /opt/ui/config/environments/production.rb .



## Python ##
https://github.com/jordansissel/fpm/wiki/ConvertingPython

Para generar desde python: yum install python-setuptools

A partir de un setup.py local
fpm -s python -t rpm pyramid/setup.py

A partir de un modulo de python (se bajará el modulo de la web)
fpm -s python -t rpm pyramid


Para que no genere las dependencias:
--no-depends

fpm -s python -t rpm -p . --python-bin /usr/bin/python2.7 --python-package-name-prefix python27 --python-install-lib /usr/lib/python2.7/site-packages paramiko


## Gemas ##
fpm -s gem -t rpm -v 1.2.3 nombre

Convertir gema y todas sus dependencias: https://github.com/jordansissel/fpm/wiki/ConvertingGems#convert-a-gem-and-all-of-its-dependencies


## deb ##
Gema en deb
fpm -s gem -t deb -v 1.2.3 nombre

Parece que no se pueden firmar los .deb


## Ejecutar comandos en la pre/post instalacion ##
--after-install modify_cyclops_agent_conf.sh
  Ejecuta ese script tras la instalación

--before-install fichero.sh
