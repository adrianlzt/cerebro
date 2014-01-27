# https://github.com/jordansissel/fpm#readme

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

Para crear rpms en debian-like necesitamos: apt-get install rpm


Ejemplo:
Tras instalar un paquete nos genera sus ficheros en /usr/share/programa
Para crear un rpm hacemos:
fpm -s dir -t rpm -n nombre_programa -v 0.1 -d dependencia /usr/share/programa
