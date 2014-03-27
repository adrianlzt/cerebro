Si ponemos un repo tipo:
deb http://get.docker.io/ubuntu docker main

apt-get va a coger el fichero:
http://get.docker.io/ubuntu/dists/docker/Release

La lista de paquetes:
http://get.docker.io/ubuntu/dists/docker/main/binary-amd64/Packages


Para usar el comando add-apt-repository
En la 12.04: apt-get install python-software-properties
En la 13.10: apt-get install software-properties-common


Para usar repos https:
sudo apt-get install apt-transport-https ca-certificates
