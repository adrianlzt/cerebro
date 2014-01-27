# http://www.linode.com/wiki/index.php/Linux_Packaging

Releer repos
yum clean metadata


Información
$ yum list <paquete> (usa internet)
$ yum --showduplicates list <paquete> (muestra todas las versiones disponibles en el repositorio)
# tail /var/log/yum.log (últimos paquetes instalados)
$ yum info <paquete>
$ rpm -qi <paquete> (sobre la base de datos local. '-q' query. '-i' info)
$ yum search <paquete>
$ yum check-update (nos dice si hay paquetes por actualizar. RC, =100, paquetes para actualizar, =0 no updates, =1 error)


Listar todos los paquetes instalados
$ rpm -qa


Listar ficheros
$ repoquery -ql <paquete> (ficheros de un paquete NO instalado)
$ rpm -ql <paquete> (ficheros de un paquete instalado)
$ rpm -qlc <paquete> (solo ficheros de configuración)
$ rpm -qld <paquete> (solo ficheros de documentación)


Para mostrar esta información sobre un .rpm
$ rpm -qp(i,l) <paquete>.rpm
$ rpmls <paquete>.rpm


Que fichero pertenece a un paquete
$ rpm -qf /bin/vi
$ rpm -qf `which vim`


Dependencias
$ rpm -qR <paquete>
$ rpm -qpR <paquete>.rpm
$ yum deplist <paquete>
$ yum deplist $(rpm -q <paquete>)  (para solo obtener las dependencias de la versión instalada)
$ rpm -q --whatprovides 'gcl-selinux(x86-64)'
$ yum whatprovides 'gcl-selinux(x86-64)'
$ yum whatprovides */dig

inversas
rpm -q --whatrequires <paquete>


Verificar paquete
# rpm -vK <paquete>.rpm (comprueba la firma del paquete)
$ rpm -V vim-common (verifica un paquete ya instalado)
