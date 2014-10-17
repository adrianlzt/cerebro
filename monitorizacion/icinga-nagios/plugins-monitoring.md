https://www.monitoring-plugins.org/doc/man/index.html

Para instalarlos con makefile:

yum install mysql-devel mysql-libs openldap-devel openssl net-snmp-utils perl-Net-SNMP postgresql-devel postgresql-libs libdbi-devel fping


Instalado a mano
http://rpmfind.net//linux/RPM/centos/6.5/x86_64/Packages/perl-ExtUtils-MakeMaker-6.55-136.el6.x86_64.html


./configure --enable-perl-modules


## RPM ##
Version 2.0.x

Fix: http://support.nagios.com/forum/viewtopic.php?f=35&t=27761
tar xzf nagios-plugins-2.0.2.tar.gz
vim nagios-plugins-2.0.2/nagios-plugins.spec
      Cambiar el path en la línea 10, 34 para que sea /usr/lib64/
      Eliminar linea 185
      Eliminar command.cfg de la linea 187
tar czf nagios-plugins-2.0.2.tar.gz nagios-plugins-2.0.2/
rpmbuild -ta nagios-plugins-2.0.2.tar.gz

rpmbuild --define 'custom 1' -ta monitoring-plugins-2.0.tar.gz

Genera el rpm monitoring-plugins-2.0-1.x86_64.rpm con todos los checks, y también todas las dependencias.

# Última versión (con Fedora) #
ftp://fr2.rpmfind.net/linux/fedora/linux/development/rawhide/x86_64/os/Packages/n/
