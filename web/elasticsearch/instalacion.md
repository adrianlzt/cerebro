Bajar el paquete de http://www.elasticsearch.org/download/

## Para Debian, con .deb ##
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


## Desde el tar.gz ##
apt-get install default-jre
tar zxvf elasticsearch-xxx.tar.gz
cd elasticsearch-xxx
vi config/elasticsearch.yml
  cluster.name: loquequeramos <- por si tenemos varios elasticsearch, decidir cuales deben unirse entre ellos
  node.name: "blabla" <- si no le damos, le asignará uno aleatorio de comic. Aconsejable asignar un nombre que sea representativo
bin/elasticsearch -d <- para correrlo como daemon
tail -f logs/loquequeramos.log

Mirar plugins.md para aplicaciones útiles que querremos tener.

