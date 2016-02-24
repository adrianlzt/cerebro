http://www.rpm.org/max-rpm/s1-rpm-inside-scripts.html

The %pre script executes just before the package is to be installed

The %post script executes after the package has been installed.

%preun, justo antes de borrar el rpm

%postun, después de borrar el rpm



# Upgrade
Run the %pre section of the RPM being installed.
Install the files that the RPM provides.
Run the %post section of the RPM.
Run the %preun of the old package.
Delete any old files not overwritten by the newer version. (This step deletes files that the new package does not require.)
Run the %postun hook of the old package.


https://fedoraproject.org/wiki/Packaging:ScriptletSnippets#Syntax
La variable $1 la podemos usar para conocer si estamos instalando o actualizando


Ejemplo para solo ejecutar unas acciones si se borra el paquete, pero no si se actualiza
%postun
if [ $1 == 0 ]; then
    acciones al desinstalar
fi
