http://omdistro.org/

Welcome to OMD - the Open Monitoring Distribution. OMD implements a completely new concept of how to install, maintain and update a monitoring system built on Nagios.

OMD avoids the tedious work of manually compiling and integrating Nagios addons while at the same time avoiding the problems of pre-packaged installations coming with your Linux distribution, which are most times outdated and provide no regular updates.

OMD bundles Nagios together with many important addons and can easily be installed on every major Linux distribution. We provide prebuilt packages for all enterprise Linux distributions and also for some other, such as Ubuntu 11.04.


Parece que hay varios sabores de OMD. Al menos
  http://labs.consol.de/nagios/omd-repository/
  http://mathias-kettner.com/nagios_support_download.php?HTML=yes (de pago, pero hay versión de demo, hasta 10 hosts)


** INSTALACION de labs.consol.de
Lo mejor para instalarla es tener un linux pelado (Debian, Ubuntu, CentOS o Suse) e instalar el repositorio de labs.consol.de
https://labs.consol.de/repo/stable/#_6

Para este caso lo haré con una CentOS 6.4:
 rpm -Uvh "http://labs.consol.de/repo/stable/rhel6/i386/labs-consol-stable-1.3-1.rhel6.noarch.rpm"

Nos hará falta el repo EPEL:
 rpm -Uvh "http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm"

Instalamos omd:
yum install omd

Para arrancar la monitorización:
omd create nombre

En CentOS/RH 6.4 existe un bug con mount que hace que falle el omd:
Creating temporary filesystem /omd/sites/test/tmp...mount: can't find /omd/sites/test/tmp in /etc/fstab or /etc/mtab ERROR
El bug: https://bugzilla.redhat.com/show_bug.cgi?id=917678
RPM para arreglarlo: http://jens.fedorapeople.org/rhel64-bz917678/
  wget http://jens.fedorapeople.org/rhel64-bz917678/rhel64-bz917678.repo -O /etc/yum.repos.d/rhel64-bz917678.repo
  yum update util-linux-ng

Para arrancar la instancia:
omd start nombre

Y apuntamos el navegador a: http://localhost/nombre
The admin user for the web applications is omdadmin with password omd

Please do a su - test for administration of this site
Nos crea un arbol de directorios bajo /omd/sites/nombre




** Instalación del omd de check_mk

Nos hará falta el repo EPEL:
  rpm -Uvh "http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm"

yum install omd-1.2.2p2.dmmk-rh64-30.x86_64.rpm
