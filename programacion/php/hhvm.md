http://hhvm.com/

HHVM is an open-source virtual machine designed for executing programs written in Hack and PHP. HHVM uses a just-in-time (JIT) compilation approach to achieve superior performance while maintaining the development flexibility that PHP provides

Es como la máquina virtual de java pero para PHP y hack (un lenguaje de programación).

# Instalacion


## Ubuntu 14.04

Dependencias:
Commandline: apt-get install hhvm
Install: libboost-regex1.54.0, liblqr-1-0, libc-client2007e, libevent-2.0-5, libunwind8, liblcms2-2, libijs-0.35, libgflags2, libjpeg-turbo8, libxau6, libpaper1, libxext6, libltdl7, libgomp1, libboost-system1.54.0, libicu52, libfontconfig1, libonig2, libcups2, libtiff5, libfftw3-double3, libx11-data, libfreetype6, libxcb1, libgs9-common, libcupsimage2, libmemcached10, libvpx1, libmcrypt4, libboost-context1.54.0, libjbig2dec0, fontconfig-config, libgd3, libjemalloc1, hhvm, libboost-filesystem1.54.0, libyaml-0-2, libavahi-common-data, libxdmcp6, binutils, libavahi-client3, libgoogle-glog0, libmagickwand5, libgmp10, mysql-common, mlock, libboost-program-options1.54.0, libjasper1, libmysqlclient18, poppler-data, libavahi-common3, libgs9, libxslt1.1, gsfonts, libmagickcore5, libpaper-utils, libboost-thread1.54.0, libjbig0, libelf1, imagemagick-common, ghostscript, fonts-dejavu-core, libx11-6, libxpm4, libcupsfilters1, libtbb2, libjpeg8


Mensaje fin de instalacion hhvm en ubuntu 14.04
update-alternatives: using /usr/bin/hhvm to provide /usr/bin/php (php) in auto mode
********************************************************************
* HHVM is installed.
*
* Running PHP web scripts with HHVM is done by having your webserver talk to HHVM
* over FastCGI. Install nginx or Apache, and then:
* $ sudo /usr/share/hhvm/install_fastcgi.sh
* $ sudo /etc/init.d/hhvm restart
* (if using nginx)  $ sudo /etc/init.d/nginx restart
* (if using apache) $ sudo /etc/init.d/apache restart
*
* Detailed FastCGI directions are online at:
* https://github.com/facebook/hhvm/wiki/FastCGI
*
* If you're using HHVM to run web scripts, you probably want it to start at boot:
* $ sudo update-rc.d hhvm defaults
*
* Running command-line scripts with HHVM requires no special setup:
* $ hhvm whatever.php
*
* You can use HHVM for /usr/bin/php even if you have php-cli installed:
* $ sudo /usr/bin/update-alternatives --install /usr/bin/php php /usr/bin/hhvm 60


## CentOS 7
https://github.com/facebook/hhvm/wiki/Building-and-installing-HHVM-on-RHEL-7
EPEL + Paquete rpm
yum install http://dl.fedoraproject.org/pub/epel/7/x86_64/e/epel-release-7-5.noarch.rpm




Probar si hhvm se ha instalado correctamente:
hhvm -a


# Configuración
https://github.com/facebook/hhvm/wiki/Getting-Started

sudo /usr/share/hhvm/install_fastcgi.sh
  este script, en nginx, lo que hace es añadir la linea:
        # Make site accessible from http://localhost/
        server_name localhost;
--->    include hhvm.conf;

        location / {


En CentOS meteremos el fichero hhvm.conf en /etc/nginx/default.d/


Meteremos un hello_world.php y veremos que lo compila correctamente.
