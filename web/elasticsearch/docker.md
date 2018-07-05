https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html
https://www.docker.elastic.co/

docker run -d -p 9200:9200 --name elastic -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch-oss:6.2.2
docker run -d -p 9200:9200 --name elastic -e ELASTIC_PASSWORD=changeme -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:6.3.0
  la pass changeme es la que usa por defecto la imagen de kibana para conectar con ES

docker pull docker.elastic.co/elasticsearch/elasticsearch:6.2.2
docker pull docker.elastic.co/elasticsearch/elasticsearch-platinum:6.2.2
docker pull docker.elastic.co/elasticsearch/elasticsearch-oss:6.2.2

The images are available in three different configurations or "flavors". The basic flavor, which is the default, ships with X-Pack Basic features pre-installed and automatically activated with a free licence. The platinum flavor features all X-Pack functionally under a 30-day trial licence. The oss flavor does not include X-Pack, and contains only open-source Elasticsearch.

Esto de los distintos sabores solo aplica a imágenes 6.x

docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:5.6.2
  consultar cual es la ultima versión
  No hay tag latest

Si queremos quitar el xpack de las imagenes 5.x:
-e "xpack.security.enabled=false"

docker run --name elastic -v "$PWD/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml" -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:5.6.2


user: elastic
pass: changeme


Volumenes de config, datos y logs:
-v "$PWD/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml"
-v "$PWD/data:/usr/share/elasticsearch/data"
-v "$PWD/logs:/usr/share/elasticsearch/logs"


# Prod
Para correr las imagenes en producción poner:
sysctl -w vm.max_map_count=262144
echo "vm.max_map_count = 262144" > /etc/sysctl.d/elastic.conf
echo "* soft memlock unlimited" >> /etc/security/limits.conf
echo "* hard memlock unlimited" >> /etc/security/limits.conf
groupadd -g 1000 elasticsearch
adduser -u 1000 -g 1000 -d /data/elasticsearch -NM elasticsearch
mkdir -p /data/elasticsearch/{data,logs,etc}
chown -R elasticsearch:elasticsearch /data/elasticsearch/
vi /data/elasticsearch/etc/elasticsearch.yml
    cluster.name: "elasticsearch"
    node.name: nodeA
    node.master: true
    node.data: true
    network.host: 0.0.0.0
    discovery.zen.ping.unicast.hosts: nodeA,nodeB,nodeC
    discovery.zen.minimum_master_nodes: 2
    http.cors.enabled: true
    http.cors.allow-origin: "*"

Cambien en los nodos el name, unicast.hosts (para no mostrar el propio)



docker run --name elasticsearch -d -v "/data/elasticsearch/etc/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml" -v "/data/elasticsearch/data:/usr/share/elasticsearch/data" -v "/data/elasticsearch/logs:/usr/share/elasticsearch/logs" -v "/etc/security/limits.conf:/etc/security/limits.conf" --restart=unless-stopped --net=host docker.elastic.co/elasticsearch/elasticsearch-oss:6.1.2


Montar etc/ ?


