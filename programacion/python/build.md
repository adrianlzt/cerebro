http://trac.edgewall.org/ticket/163
https://docs.python.org/2.7/install/index.html?highlight=build

[bdist_rpm]
requires = python >= 2.1
           python-xml >= 2.1


python2.7 setup.py bdist_rpm


Crear egg (mirar egg.md):
python setup.py bdist_egg


# Compilar python
./configure --prefix=/usr --enable-shared --libdir=/usr/lib64/
  --enable-shared genera la libs
  --libdir hace que se instalen las libs en /usr/lib64, que es donde esperan encontrarlos los rhel/centos 64bits
make install DESTDIR=/tmp/test

Luego usar fpm para generar el fpm


