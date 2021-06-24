https://hub.docker.com/r/opensearchproject/opensearch
https://hub.docker.com/r/opensearchproject/opensearch-dashboards


# ES
docker run -p 9200:9200 -p 9600:9600 -e "discovery.type=single-node" opensearch/opensearch
curl https://localhost:9200 -k -u admin:admin

# Kibana
docker run --net host -d --name opendistro-kibana-skydive opensearch/opensearch-dashboards
  suponiendo que tenemos un ES escuchando en 9200

Entrar con
http://localhost:5601
User: admin
Pass: admin
