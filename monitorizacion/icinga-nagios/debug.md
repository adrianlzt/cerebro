https://wiki.icinga.org/display/Dev/Debug

Para que el paquete icinga-debuginfo venga con toda la información tenemos que quitar el stripped de los binarios que aparece en el icinga.spec cuando generamos los rpms:
### strip binary
#%{__strip} %{buildroot}%{_bindir}/{icinga,icingastats,log2ido,ido2db}
#%{__strip} %{buildroot}%{_libdir}/icinga/cgi/*.cgi


Mirar el fichero objects.cache para ver como ve icinga los objetos.
# Tip: Use that file to debug your configuration with fully resolved objects like the core sees them.
