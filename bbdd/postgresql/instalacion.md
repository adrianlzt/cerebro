Para instalar la última versión en debian-like:
http://wiki.postgresql.org/wiki/Apt

sudo echo "deb http://apt.postgresql.org/pub/repos/apt/ squeeze-pgdg main" > /etc/apt/sources.list.d/pgdg.list
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get update
sudo apt-get install postgresql-9.3 pgadmin3


Para instalar el cliente:
apt-get install postgresql-client-9.3
