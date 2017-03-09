https://wiki.debian.org/SourcesList

deb http://site.example.com/debian distribution component1 component2 component3
deb-src http://site.example.com/debian distribution component1 component2 component3

distribution suele ser el nombre de la version: wheezy, jessie, stretch, sid o un alias: oldstable, stable, testing, unstable

Los componentes serán de que repos tira.
Por ejemplo, lo de arriba tirará de:
http://archive.ubuntu.com/ubuntu/dists/distribution/component1
http://archive.ubuntu.com/ubuntu/dists/distribution/component2
http://archive.ubuntu.com/ubuntu/dists/distribution/component3


Si ponemos un repo tipo:
deb http://get.docker.io/ubuntu docker main

apt-get va a coger el fichero:
http://get.docker.io/ubuntu/dists/docker/Release

La lista de paquetes:
http://get.docker.io/ubuntu/dists/docker/main/binary-amd64/Packages

Repo 
deb http://dl.bintray.com/adrianlzt/deb /
equivale a
http://dl.bintray.com/adrianlzt/deb/


Normalmente se usa como
deb http://archive.ubuntu.com/ubuntu/ trusty-security main restricted
deb http://archive.ubuntu.com/ubuntu/ VERSION 


Para usar el comando add-apt-repository
En la 12.04: apt-get install python-software-properties
En la 13.10: apt-get install software-properties-common


Para usar repos https:
sudo apt-get install apt-transport-https ca-certificates


## Preferencia ##
https://wiki.debian.org/es/AptPreferences#A.2Fetc.2Fapt.2Fpreferences

/etc/apt/preferences
Package: *
Pin: release a=testing
Pin-Priority: 900


# Internals
Los repos parece que se bajan a un fichero tipo
/var/lib/apt/lists/artifactory.inet_artifactory_apt-tools_dists_trusty_dev_binary-amd64_Packages.gz
Luego parsea ese fichero


# Proxy

Proxy para todo apt
/etc/apt/apt.conf.d/05proxy
Acquire::http::Proxy "http://yourproxyaddress:proxyport";
Acquire::https::Proxy "http://yourproxyaddress:proxyport";
Acquire::ftp::Proxy "http://yourproxyaddress:proxyport";
Acquire::socks::Proxy "http://yourproxyaddress:proxyport";

Proxy para un host en particular:
Acquire::http::proxy::artifactory.inet "http://proxy.inet:6666";

No proxy para un host
Acquire::http::proxy::artifactory.inet "DIRECT";

