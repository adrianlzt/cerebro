http://docs.icinga.org/icinga2/latest/doc/module/icinga2/chapter/getting-started#getting-started
Mirar ansible.md

Ubuntu:
Icinga ppa: https://launchpad.net/~formorer/+archive/ubuntu/icinga
add-apt-repository ppa:formorer/icinga
apt-get update
apt-get install icinga2


RedHat:
yum install https://packages.icinga.com/epel/7/release/noarch/icinga-rpm-release-7-1.el7.centos.noarch.rpm
yum install https://packages.icinga.com/epel/6/release/noarch/icinga-rpm-release-6-1.el6.noarch.rpm

yum install icinga2
# Instalar checks basicos (metiendo EPEL)
rpm -Uvh "http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm"
yum install nagios-plugins-disk nagios-plugins-ping nagios-plugins-users nagios-plugins-ssh nagios-plugins-procs nagios-plugins-swap nagios-plugins-load nagios-plugins-http

service icinga2 start
Activado por defecto en el arranque (para desactivar: chkconfig icinga2 off)

RHEL 7:
systemctl enable icinga2
systemctl start icinga2


Por defecto se instalan las siguientes features:
checker for executing checks
notification for sending notifications
mainlog for writing the icinga2.log file

Podemos chequear las activas con (RHEL, paquete icinga2-bin)
icinga2 feature list

A mano:
ls /etc/icinga2/features-enabled

## Activamos ido (necesario para icingaweb)
yum install icinga2-ido-mysql
Creamos database, user y metemos el schema:
mysql icinga < /usr/share/icinga2-ido-mysql/schema/mysql.sql

Activamos (parece que se activa al instalar el rpm)
icinga2 feature enable ido-mysql

Configuramos los parametros:
/etc/icinga2/features-enabled/ido-mysql.conf

Reiniciamos icinga2


## Icingaweb2
Instalamos apache/nginx e icingaweb2

Hace falta activar la feature command y reiniciar icinga2:
icinga2 feature enable command

Hace falta meter al user del webserver en el grupo icingacmd, para que pueda escribir en el socket.

Por defecto nos monitorizar el host de icinga con: disk, disk /, http, icinga, load, ping4, ping6, procs, ssh y swap.

Para entender la config mirar: https://docs.icinga.com/icinga2/latest/doc/module/icinga2/toc#!/icinga2/latest/doc/module/icinga2/chapter/monitoring-basics
Para usar el director mirar: wizard.md




## Por código fuente ##
https://git.icinga.org/?p=icinga2.git;a=blob;f=INSTALL;hb=HEAD

Primero crearemos los .deb y luego existe ya el metapaquete para instalar todo (https://git.icinga.org/?p=icinga2-debian.git;a=summary)

Para ubuntu/debian:
apt-get install make build-essential libssl-dev libboost-all-dev doxygen libmysqlclient-dev python-dev automake autoconf libtool libltdl-dev bison flex
Nos bajamos un snapshot del codigo en .tar.gz  (https://git.icinga.org/?p=icinga2.git;a=tree;hb=HEAD)


tar zxvf icinga2-HEAD.tar.gz
cd icinga2/
./configure -> no puedo hacerlo!! que pasa??
Note: The Git repository does not contain any auto-generated Autotools files, i.e. there is no 'configure' script. In this case you will need to regenerate the 'configure' script by running 'autogen.sh'. However, as an end-user you should reconsider whether you really want to use the code from the Git repository. In general it is advisable to use one of the dist tarballs instead.

Hay paquetes rpm generados automáticamente cada día:
http://packages.icinga.org/epel/6/snapshot/x86_64/


Al final he optado por vagrnat + autoprovision:
cd icinga2/
vagrant up
localhost:8080/icinga


La intento poner en AWS
La instalacion con el bootstrap.sh va perfecta
