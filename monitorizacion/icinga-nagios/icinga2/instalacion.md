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
