https://www.elastic.co/guide/en/kibana/current/_configuring_kibana_on_docker.html
https://www.docker.elastic.co/

kibana a secas viene con X-Pack (por defecto intenta conectarse con elastic:changeme)
kibana-oss en la open source sin X-Pack

docker run -d -p 5601:5601 --name kibana --link elastic:elasticsearch docker.elastic.co/kibana/kibana-oss:6.2.2

Ideally, you should be running Elasticsearch and Kibana with matching version numbers. If your Elasticsearch has an older version number or a newer _major_ number than Kibana, then Kibana will fail to run. If Elasticsearch has a newer minor or patch number than Kibana, then the Kibana Server will log a warning.

Acceso con
kibana:changeme
