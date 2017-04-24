https://www.elastic.co/guide/en/elasticsearch/reference/5.0/install-elasticsearch.html#install-elasticsearch

# CentOS / RedHat
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
bin/elasticsearch -d <- para correrlo como daemon
tail -f logs/loquequeramos.log

Mirar plugins.md para aplicaciones útiles que querremos tener.

