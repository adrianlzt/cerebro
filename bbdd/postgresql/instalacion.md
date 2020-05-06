https://www.postgresql.org/download/

Para instalar desde código mirar develop.md

Para instalar la última versión en debian-like:
http://wiki.postgresql.org/wiki/Apt

Yum repo (dan un .rpm para instalar el fichero .repo con las keys):
https://download.postgresql.org/pub/repos/yum/

sudo echo "deb http://apt.postgresql.org/pub/repos/apt/ squeeze-pgdg main" > /etc/apt/sources.list.d/pgdg.list
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get update
sudo apt-get install postgresql-9.3 pgadmin3


Para instalar el cliente:
apt-get install postgresql-client-9.3


Una vez arrancado el server, para crear user y database:
sudo su postgres
createuser --interactive
createdb nombreuser
