http://www.debian-administration.org/articles/20

apt-get source foo  # get the source to the package foo
apt-get build-dep foo  # get and install the packages required to rebuild the package foo

The only other thing you need are the Debian repackaging utilities which you can install with 
apt-get install devscripts build-essential fakeroot

Aqui editaríamos el código.

Para compilar el código:
cd foo/
debuild -us -uc  # Los parametros son para no firmar el paquete

Esto no generará un nuevo .deb
