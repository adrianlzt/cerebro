http://www.rpm.org/max-rpm/s1-rpm-build-creating-spec-file.html
http://www.rpm.org/max-rpm/s1-rpm-inside-macros.html

# Epoch
http://erikos.buchoase.de/2009/01/26/rpm-epoch-field/

Epoch: 1


# Nombre del directorio dentro del tar.gz
The name of the top-level directory was also identical to that of the tar file, which was in <name>-<version> format

Si el nombre dentro del tar no coincide con el nombre de nuestro rpm, usaremos:

Assume, for a moment, that the cdplayer sources, when unpacked, create a top-level directory named cd-player. In this case, our %setup line would look like this:
%setup -n cd-player
