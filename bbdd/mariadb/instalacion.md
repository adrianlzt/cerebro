https://mariadb.com/kb/en/library/getting-started-with-mariadb-galera-cluster/

# Repos
Para configurar repo:
https://downloads.mariadb.org/mariadb/repositories/#mirror=klaus&distro=Ubuntu&distro_release=saucy&version=10.0

sudo apt-get install software-properties-common
sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 0xcbcb082a1bb943db
sudo add-apt-repository 'deb http://mirror.klaus-uwe.me/mariadb/repo/10.0/ubuntu saucy main'
sudo apt-get update
sudo apt-get install mariadb-server


https://mariadb.com/kb/en/library/mariadb-package-repository-setup-and-usage/
Instalar repos version opensource para rhel/centos, ubuntu/debian o suse:
curl -sS https://downloads.mariadb.com/MariaDB/mariadb_repo_setup | sudo bash
Estos repos añaden los paquetes MariaDB-*


Si creas una cuenta en mariadb.org nos da acceso a mariadb enterprise:
/etc/yum.repos.d/MariaDB-Manager.repo
[mariadb-enterprise]
name=mariadb-enterprise
baseurl=http://NombreApellido:PASSWORD@code.mariadb.com/MariaDB-Manager/R1.0.0/repo/
enabled=1
gpgcheck=false


Otra forma:
curl --user 'NombreApellido:PASSWORD' \
http://code.mariadb.com/MariaDB-Manager/R1.0.0/MariaDB-Manager.repo \
> /etc/yum.repos.d/MariaDB-Manager.repo


yum install MariaDB-Manager

http://xxx.xxx.xxx.xxx:8080/MariaDBManager
The first time that you access the web interface, you will be asked to provide a username and password for the primary administrator account. You should do this immediately after installation. 


# Install
yum install MariaDB-server MariaDB-client percona-xtrabackup-24

mirar galera.md para instalar el cluster
