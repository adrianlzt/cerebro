https://wiki.postgresql.org/wiki/Developer_FAQ

https://wiki.postgresql.org/wiki/Working_with_Git
git clone git://git.postgresql.org/git/postgresql.git

https://www.postgresql.org/docs/devel/static/installation.html

Para instalar las deps en centos podemos usar:
yum groupinstall "Development Tools"
yum install -y readline-devel zlib-devel

./configure
  tal vez queramos usar algo tipo: --prefix=/usr/local/pgsql12beta4
make
  3:36 en compilar en mi pc
sudo -s
make install
  lo instalará en /usr/local/pgsql


Crear directorio PGDATA
sudo -u postgres /usr/local/pgsql/bin/initdb -D /some/path

