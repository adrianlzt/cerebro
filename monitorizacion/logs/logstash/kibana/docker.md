https://www.elastic.co/guide/en/kibana/current/_configuring_kibana_on_docker.html
https://www.docker.elastic.co/

Generar password, dentro del contenedor de elastic:
bin/elasticsearch-reset-password -u kibana_system

podman run --name kibana -d --net host \
 -e "ELASTICSEARCH_HOSTS=http://localhost:9200" \
 -e "ELASTICSEARCH_USERNAME=kibana_system" \
 -e "ELASTICSEARCH_PASSWORD=PG1eKTmxKa2tD7=Rhh0h" \
kibana:8.1.3

Antiguo:
docker run --name kibana --rm -d -p 5601:5601 --link elastic:elasticsearch docker.elastic.co/kibana/kibana:6.3.0

docker run --link YOUR_ELASTICSEARCH_CONTAINER_NAME_OR_ID:elasticsearch -p 5601:5601 docker.elastic.co/kibana/kibana:7.10.1

docker run -e ELASTICSEARCH_HOSTS=http://elasticsearch.example.org -p 5601:5601 docker.elastic.co/kibana/kibana:7.10.1



Ideally, you should be running Elasticsearch and Kibana with matching version numbers. If your Elasticsearch has an older version number or a newer _major_ number than Kibana, then Kibana will fail to run. If Elasticsearch has a newer minor or patch number than Kibana, then the Kibana Server will log a warning.
