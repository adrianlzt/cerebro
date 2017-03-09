https://wiki.debian.org/UsingQuilt
This page is aimed at people who want to make some changes to a Debian source package which is already using quilt.



http://www.debian-administration.org/articles/20

Agregar sources a /etc/apt/sources.list

apt-get source foo  # get the source to the package foo

apt install equivs
mk-build-deps -i -r foo
cd foo
fakeroot debian/rules binary



apt-get build-dep foo  # get and install the packages required to rebuild the package foo

The only other thing you need are the Debian repackaging utilities which you can install with 
apt-get install devscripts build-essential fakeroot


Aqui editaríamos el código.

Para compilar el código:
cd foo/
debuild -us -uc  # Los parametros son para no firmar el paquete

Esto no generará un nuevo .deb
