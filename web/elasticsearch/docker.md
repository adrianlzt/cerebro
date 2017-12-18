https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html
https://www.docker.elastic.co/

docker run -d -p 9200:9200 --name elastic -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch-oss:6.1.0

docker pull docker.elastic.co/elasticsearch/elasticsearch:6.1.0
docker pull docker.elastic.co/elasticsearch/elasticsearch-platinum:6.1.0
docker pull docker.elastic.co/elasticsearch/elasticsearch-oss:6.1.0

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
