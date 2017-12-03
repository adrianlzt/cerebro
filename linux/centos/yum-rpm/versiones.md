Cuidado si un rpm tiene definido "epoch".
Eso cambia el sistema de orden de los paquetes:

Epoch:
Used to force the package to be seen as newer than any previous versions with a lower epoch, even if the version number would normally not trigger such an upgrade. This value is required to be a positive integer; the default value if left unspecified is 0. This is useful when the version numbering scheme of a package changes (or is alphanumeric), breaking normal version comparison logic. See pacman(8) for more information on version comparisons.


Obtener el epoch de un rpm:
rpm -qp --queryformat "%{EPOCH}:%{NAME}-%{VERSION}-%{RELEASE}\n " 



Para obtener el valor de las macros ver repositorios.md


# Lock version
https://access.redhat.com/solutions/98873

No actualizar un paquete
yum install yum-plugin-versionlock
yum versionlock gcc-*
