# CentOS / RHEL
Para instalar paquetes debuginfo en CentOS/RHEL tenemos la utilidad debuginfo-install que esta dentro del paquete yum-utils

Tendremos que irnos a /etc/yum.repos.d y activar en los distintos ficheros los repositorios de debuginfo (enabled=1)

http://debuginfo.centos.org/6/x86_64/


# Arch
https://wiki.archlinux.org/title/Debugging/Getting_traces

Buscar el paquete en https://archlinux.org/packages/
Mirar en que repo está.

Luego ir a https://geo.mirror.pkgbuild.com/
Entrar el REPO-debug/

Instalarlo a mano:
sudo pacman -U https://geo.mirror.pkgbuild.com/extra-debug/os/x86_64/zabbix-debug-6.4.13-1-x86_64.pkg.tar.zst

Instala los símbolos en /usr/lib/debug/.build-id/
También instala el código fuente en /usr/src/debug/

También podemos configurarlo en pacman para tener los paquetes disponibles con pacman.

## AUR
Editar el PKGBUILD y añadir en la linea options:

options=('debug' '!strip')


Si ponemos
options=('debug' 'strip')

Se generará otro paquete foo-debug

Note: It is insufficient to simply install the newly compiled debug package,
because the debugger will check that the file containing the debug symbols
is from the same build as the associated library and executable. You must
install both of the recompiled packages. In Arch, the debug symbols files
are installed under /usr/lib/debug
