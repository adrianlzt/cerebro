# CentOS / RHEL
Para instalar paquetes debuginfo en CentOS/RHEL tenemos la utilidad debuginfo-install que esta dentro del paquete yum-utils

Tendremos que irnos a /etc/yum.repos.d y activar en los distintos ficheros los repositorios de debuginfo (enabled=1)


# Arch
https://wiki.archlinux.org/index.php/Debug_-_Getting_Traces

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
