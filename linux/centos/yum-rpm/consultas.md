http://www.linode.com/wiki/index.php/Linux_Packaging
http://yum.baseurl.org/wiki/RepoQuery

Releer repos
yum clean expire-cache
Borrar solo los metadatos de un repo determinado
yum clean metadata --disablerepo="*" --enablerepo="repo*"


Información
$ yum list <paquete> (usa internet)
$ yum --showduplicates list <paquete> (muestra todas las versiones disponibles en el repositorio)
# tail /var/log/yum.log (últimos paquetes instalados)
$ yum info <paquete>
$ rpm -qi <paquete> (sobre la base de datos local. '-q' query. '-i' info)
$ yum search <paquete>
$ yum check-update (nos dice si hay paquetes por actualizar. RC, =100, paquetes para actualizar, =0 no updates, =1 error)
$ yum resolvedep httpd (dice que paquetes nos dan ese recurso)
$ yum deplist <paquete> (nos dice las dependencias del paquete, recursivamente. Busca un provider, un rpm, para solventar la dep)
$ repoquery -R <paquete> (nos dice las dependencias del paquete)


Listar todos los paquetes instalados
$ rpm -qa


Listar ficheros
$ repoquery -ql <paquete> (ficheros de un paquete NO instalado)
$ rpm -ql <paquete> (ficheros de un paquete instalado)
$ rpm -qlv <paquete> (ficheros de un paquete instalado, mostrar tambien permisos, usuario, grupo, etc)
$ rpm -qc <paquete> (solo ficheros de configuración)
$ rpm -qd <paquete> (solo ficheros de documentación)


Para mostrar esta información sobre un .rpm
$ rpm -qp(i,l) <paquete>.rpm
$ rpmls <paquete>.rpm


Que fichero pertenece a un paquete
$ rpm -qf /bin/vi
$ rpm -qf `which vim`


Dependencias
$ rpm -qR <paquete>
    que dependencias necesita este paquete
$ rpm -q --provides <paquete>
    que librerias provee este paquete
$ rpm -qpR <paquete>.rpm
$ yum deplist <paquete>
  Nos dice que paquetes cumplen las dependencias que necesita el rpm
$ yum deplist $(rpm -q <paquete>)  (para solo obtener las dependencias de la versión instalada)
$ rpm -q --whatprovides 'gcl-selinux(x86-64)'
$ yum whatprovides 'gcl-selinux(x86-64)'
$ yum whatprovides */dig

inversas
rpm -q --whatrequires <paquete>
  nos dice que rpms necesita

repoquery --whatrequires nagios-plugins-perl
  nos dice que paquetes (de todos los que estén en los repos) necesitan a ese paquete

Conflictos:
repoquery --conflicts setuptools
rpm -qap --qf '[%{conflicts}\n]' setuptools-0.6c11-bdistrpm.noarch.rpm

Obsoletes:
rpm -qap --qf '[%{obsoletes}\n]' setuptools-0.6c11-bdistrpm.noarch.rpm
rpm -qp --obsoletes fichero.rpm


Verificar paquete
# rpm -vK <paquete>.rpm (comprueba la firma del paquete)
$ rpm -V vim-common (verifica un paquete ya instalado)


Parámetros avanzados:
Variables por las que podemos preguntar: rpm --querytags
Obtener los valores: rpm -qp --qf "%{EPOCH}" file.rpm

Otro ejemplo: rpm -qp --qf "%-30{NAME}%{DISTRIBUTION}\n" file.rpm

Obtener version y release:
rpm -q --qf "%{VERSION}-%{RELEASE}" nombrePaqueteInstalado
