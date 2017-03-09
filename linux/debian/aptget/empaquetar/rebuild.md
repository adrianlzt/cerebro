http://www.debian-administration.org/articles/20
https://wiki.debian.org/BuildingAPackage
https://wiki.debian.org/BuildingTutorial

Agregar sources a /etc/apt/sources.list

apt-get source foo  # get the source to the package foo

apt install equivs
mk-build-deps -i -r foo
cd foo
fakeroot debian/rules binary

Tendremos los deb en ../.



https://wiki.debian.org/UsingQuilt
This page is aimed at people who want to make some changes to a Debian source package which is already using quilt.
