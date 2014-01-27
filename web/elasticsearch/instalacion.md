Bajar el paquete de http://www.elasticsearch.org/download/

La instalación la hago sobre Ubuntu 12.10
Necesita java.

apt-get install default-jre
dpkg -i elasticsearch-0.90.5.deb
service elasticsearch start
tail -200f /var/log/elasticsearch/elasticsearch.log

