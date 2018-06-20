https://www.elastic.co/guide/en/elasticsearch/reference/5.0/install-elasticsearch.html#install-elasticsearch
https://www.elastic.co/guide/en/elasticsearch/reference/current/system-config.html

# CentOS / RedHat
ES 6
https://www.elastic.co/guide/en/elasticsearch/reference/6.0/rpm.html
rpm --import https://artifacts.elastic.co/GPG-KEY-elasticsearch


[elasticsearch-6.x]
name=Elasticsearch repository for 6.x packages
baseurl=https://artifacts.elastic.co/packages/6.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=1
autorefresh=1
type=rpm-md


Repo:
[elasticsearch-5.x]
name=Elasticsearch repository for 5.x packages
baseurl=https://artifacts.elastic.co/packages/5.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=1
autorefresh=1
type=rpm-md

yum install elasticsearch
Necesita java8
yum install -y java-1.8.0-openjdk
systemctl enable elasticsearch.service

Es suficiente tener JRE, pero es mejor tener JDK para tener herramientas como jstack y jps, y también un mejor control de update.

vi /etc/elasticsearch/elasticsearch.yml
  cluster.name: loquequeramos <- por si tenemos varios elasticsearch, decidir cuales deben unirse entre ellos
  node.name: "blabla" <- si no le damos, le asignará uno aleatorio de comic. Aconsejable asignar un nombre que sea representativo

  si la cagamos nos dará un error, pero no nos dirá donde está el error. Podemos pasar un yaml parser, por si es un error de sintaxis.

systemctl start elasticsearch
Tarda unos segundos en arrancar
Podemos ver el log en
/var/log/elasticsearch/elasticsearch.log

Testear que esta arrancando
curl 127.0.0.1:9200


## Para Debian, con .deb
La instalación la hago sobre Ubuntu 12.10
Necesita java.

apt-get install default-jre
dpkg -i elasticsearch-xxx.deb

vi config/elasticsearch.yml
  cluster.name: loquequeramos <- por si tenemos varios elasticsearch, decidir cuales deben unirse entre ellos
  node.name: "blabla" <- si no le damos, le asignará uno aleatorio de comic. Aconsejable asignar un nombre que sea representativo
update-rc.d elasticsearch defaults 95 10 <- para que arranque al inicio
service elasticsearch start
tail -200f /var/log/elasticsearch/elasticsearch.log


## Desde el tar.gz
apt-get install default-jre
tar zxvf elasticsearch-xxx.tar.gz
cd elasticsearch-xxx
vi config/elasticsearch.yml
  cluster.name: loquequeramos <- por si tenemos varios elasticsearch, decidir cuales deben unirse entre ellos
  node.name: "blabla" <- si no le damos, le asignará uno aleatorio de comic. Aconsejable asignar un nombre que sea representativo
  network.host: 0.0.0.0

bin/elasticsearch -d <- para correrlo como daemon
tail -f logs/loquequeramos.log

Mirar plugins.md para aplicaciones útiles que querremos tener.


# Config
Fichero en el dir config/

elasticsearch.yml
  por defecto buenas defaults
  configuración de ES

  https://www.elastic.co/guide/en/elasticsearch/reference/6.3/path-settings.html
  Típicamente cambiaremos el path.data (donde se almacena los datos). Podemos configurar varios paths

  Tambien el node.name podemos definirlo en cada node. Podemos el hostname
  node.name ${HOSTNAME}

  network.host, especial values:
    _[networkInterface]_ Addresses of a network interface, for example _en0_.
    _local_ Any loopback addresses on the system, for example 127.0.0.1.
    _site_ Any site-local addresses on the system, for example 192.168.0.1.
    _global_ Any globally-scoped addresses on the system, for example 8.8.8.8.

jvm.options
  opciones de java, por defecto solo 1 GB de memoria

log4j2.properties
  configuración de logging


## Preferencias de las configuraciones
1- Transient settings
2- Persistent settings
3- Command line settings
4- Config file settings


## Update config
Ciertas configuraciones (dynamic settings) pueden ser modificadas con la cluster update API



## Configuración de memoria
https://www.elastic.co/guide/en/elasticsearch/guide/current/heap-sizing.html#_give_half_your_memory_to_lucene
Configurar el HEAP de ES al 50% de la memoria disponible (el otro 50% ira en cacheos del SO usados por Lucene)
vi /etc/sysconfig/elasticsearch
ES_JAVA_OPTS="-Xms15g -Xmx15g" # para una maquina un 30GB de memoria
  Xms represents the initial size of total heap space
  Xmx represents the maximum size of total heap space

No poner más de 31GB para el heap

mirar production.md

mirar cluster.md si queremos formar un cluster
