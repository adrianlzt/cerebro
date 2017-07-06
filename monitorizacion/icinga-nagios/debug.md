https://wiki.icinga.org/display/Dev/Debug

Para que el paquete icinga-debuginfo venga con toda la información tenemos que quitar el stripped de los binarios que aparece en el icinga.spec cuando generamos los rpms:
### strip binary
#%{__strip} %{buildroot}%{_bindir}/{icinga,icingastats,log2ido,ido2db}
#%{__strip} %{buildroot}%{_libdir}/icinga/cgi/*.cgi


Mirar el fichero objects.cache para ver como ve icinga los objetos.
# Tip: Use that file to debug your configuration with fully resolved objects like the core sees them.


Bajar zip de github
https://github.com/Icinga/icinga-core

yum groupinstall -y "Development tools"


./configure --enable-idoutils=no
  si lo queremos sin idoutils, si no, necesitaremos alguna libreria de conex con una BD
make icinga
  para compilar solo icinga core


# GDB
gdb path/icinga
> b common.c:127
> run /etc/icinga/icinga.cfg

