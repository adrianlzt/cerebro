https://www.elastic.co/guide/en/kibana/current/_configuring_kibana_on_docker.html
https://www.docker.elastic.co/

docker run --name kibana --rm -d -p 5601:5601 --link elastic:elasticsearch docker.elastic.co/kibana/kibana:6.3.0

Ideally, you should be running Elasticsearch and Kibana with matching version numbers. If your Elasticsearch has an older version number or a newer _major_ number than Kibana, then Kibana will fail to run. If Elasticsearch has a newer minor or patch number than Kibana, then the Kibana Server will log a warning.
