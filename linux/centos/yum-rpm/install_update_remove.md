Releer repos
yum clean metadata

No hacer caso a las gpg key
--nogpgcheck

Instalar
# rpm -i <paquete>.rpm  //No instala dependencias automaticamente si las necesita
# rpm -i --nodeps <paquete>.rpm  //Instala aunque haya dependencias no solucionadas
# rpm -i --force <paquete>.rpm // Ignoramos package and file conflicts
# yum install <paquete>
# yum install <paquete>.rpm //Instala dependencias en caso de necesitarlas
# yum install <paquete>-version-1.2-3  //Podemos determinar una version en concreto

No existe opcion --nodeps o similar: http://yum.baseurl.org/wiki/NoDeps
rpm -i --nodeps paquetes.rpm

Activar repositorio para busqueda, instalación...
Si un repositorio (el fichero almacenado en /etc/yum.repos.d) esta marcado como enabled=0, para poder utilizarlo usaremos --enablerepo y el nombre del repositorio
$ yum --enablerepo repo search...


Reinstalar
Sustituir un paquete sin tener que borrar las dependencias
# yum reinstall vim-common


Borrar
# rpm -e <paquete>
# rpm -e --nodeps <paquete>  (borra sin hacer caso a las dependencias)
# yum remove <paquete>


Actualizar
# yum update <paquete>

	todo el sistema
	# yum update

	Actualiza o instala
	# rpm -vhU http://mirrors.usc.edu/pub/linux/distributions/fedora/linux/updates/12/x86_64/vim-minimal-7.2.411-1.fc12.x86_64.rpm
	# rpm -vhU <paquete>.rpm (si se da una lista de paquetes, los instala en el orden necesario)
		-h, --hash                       print hash marks as package installs (good with -v)
		-v, --verbose                    provide more detailed output

	Solo actualiza
	# rpm -vhF <paquete>.rpm


Buscar paquete
$ yum search <paquete>


Grupos de paquetes
# yum grouplist
# yum groupremove


Descargar rpm
$ yumdownloader --resolve gcl 
	(--resolve hace que se descarguen todos los paquetes para la instalación, los necesarios en el sistema donde se ejecute el comando)

Descargar srpm (source rpm)
# yumdownloader --source php 


Extraer ficheros del rpm
$ rpm2cpio <paquete>.rpm | cpio -idv
