https://hub.docker.com/r/amazon/opendistro-for-elasticsearch
https://hub.docker.com/r/amazon/opendistro-for-elasticsearch-kibana

https://opendistro.github.io/for-elasticsearch/downloads.html#try

# ES
docker run -p 9200:9200 -p 9600:9600 -e "discovery.type=single-node" amazon/opendistro-for-elasticsearch:latest
curl https://localhost:9200 -k -u admin:admin

# Kibana
docker run --net host -d --name opendistro-kibana-skydive amazon/opendistro-for-elasticsearch-kibana
  suponiendo que tenemos un ES escuchando en 9200

Entrar con
http://localhost:5601
User: admin
Pass: admin
