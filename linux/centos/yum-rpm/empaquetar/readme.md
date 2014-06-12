# http://blog.famillecollet.com/pages/Config-en
# Sources de paquetes rpm. Usar como ejemplo.

Crear usuario mockbuild:mockbuild (# useradd -G mockbuild mockbuild) o, si ya existe el grupo, # useradd -g mockbuild mockbuild


http://www.ibm.com/developerworks/linux/library/l-rpm1/index.html -> doc un pelín anticuada
http://fedoraproject.org/wiki/How_to_create_an_RPM_package

Crear el archivo spec: $ vim <paquete>.spec (vim nos generará automáticamente una plantilla).
También se puede generar con: $ rpmdev-newspec <paquete>

To build an RPM, you must:
Set up a directory hierarchy per the rpmbuild specifications.
Place your source code and supplemental files in the proper locations in the hierarchy.
Create your spec file.
Build the RPM. You can optionally build a source RPM to share your source code with others.
To begin, build the hierarchy. In a directory in your home directory—say, $HOME/mywget—create five subdirectories:
BUILD. BUILD is used as scratch space to actually compile the software.
RPMS. RPMS contains the binary RPM that rpmbuild builds.
SOURCES. SOURCES is for source code.
SPECS. SPECS contains your spec file or files—one spec file per RPM you want to build.
SRPMS. SRPMS contains the source RPM built during the process.
At a minimum, you need source code in SOURCES and a spec file in SPECS.

$ rpmdev-setuptree (crea la esctructura de directorios necesaria en $HOME/rpmbuild)

$ rpm -Vp RPMS/i386/<paquete>.rpm (nos dice que archivos va a instalar)

Notas: 
El nombre del source lo toma del parámetro “Source:” o “Source0:”
También espera que la carpeta que descomprima se llame como el nombre asignado.
En el fichero specs no se hace mucho caso a los comentarios (#). Si en “%build” pongo #%configure seguirá ejecutando el configure
Las dependencias las genera automaticamente, al menos algunas (glibc, rpmlib, …)
BuildRequires: The "auto-br-rpmbuild" command may be helpful.
Requires: rpmbuild automatically detects dependencies so the Requires tag is not always necessary. However, you may wish to highlight some specific packages as being required, or they may not be automatically detected.
Habilidad de los paquetes de actuar ante una instalación de otro paquete (%triggerin) (/var/lib/rpm/Triggername)
Copia un fichero del directorio de build al buildroot (se hará en la fase install):
cp %{_builddir}/%{buildsubdir}/fileInstaled $RPM_BUILD_ROOT%{_bindir}
Cuidado de no listar en %files directorios que no pertenezcan al paquete. No listar por ejemplo %{_bindir}, porque sería como que /usr/bin pertenece a ese paquete.
Se descubriría el fallo al hacer el rpm -Vp, que aparecería: .M.......    /usr/bin.
Tambien podemos ver que va a instalar con: rpmls <paquete>.rpm
Use "rpm -q --provides PACKAGENAME" to see what a given package provides.
Grupos posibles: /usr/share/doc/rpm-*/GROUPS
If you install an init or systemd script, consider using chkconfig or systemctl to arrange for the service to be started/stopped on the next reboot. Before uninstalling, you should normally try to stop its services if they are running.
To catch many common errors early, run rpmlint on your SPEC file before trying to build anything from it

auto-buildrequires -> para generar automaticamente una lista de BuildRequisite

Rust y Alien pueden ayudar en la creación de rpms, aunque es totalmente necesario revisar lo que genenran, ya que no es correcto tal como lo genera.

Probar paquete generado
$ rpmlint NAME.spec ../RPMS/*/NAME*.rpm ../SRPMS/NAME*.rpm
$ rpmls *.rpm
Mock is a powerful tool that uses the SRPM you have created to build binary packages within a nearly empty environment. This can reveal if you have accurate build dependencies
Mantener distintos directorios rpmbuild

Por defecto siempre se usa el directorio $HOME/rpmbuild.
Para poder tener varios directorios cada uno con la información de distintos paquetes, al comienzo del fichero .spec definiremos:
%define _topdir      %(echo $HOME)/directorio-rpmbuild
También será necesario redifinir el buildroot a la hora de ejecutar buildroot:
$ rpmbuild -bb --buildroot /home/mockbuild/rpmbuild-tree-orig/BUILDROOT/ SPECS/a.spec
De esta manera todas las operaciones echas por rpmbuild se realizarán sobre ese directorio en vez de sobre $HOME/rpmbuild
