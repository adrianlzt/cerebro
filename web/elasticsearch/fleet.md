Me pide licencia al intentar hacer estas pruebas

podman run -d -p 9200:9200 -e xpack.security.enabled=true -e xpack.security.authc.api_key.enabled=true -e discovery.type=single-node -e ELASTIC_PASSWORD=changeme --name elastic-skydive docker.elastic.co/elasticsearch/elasticsearch:7.11.1

podman run -d -e ELASTICSEARCH_HOSTS=http://127.0.0.1:9200 --net host --name kibana-skydive -e XPACK_SECURITY_ENABLED=TRUE -e XPACK_FLEET_AGENTS_TLSCHECKDISABLED=TRUE -e XPACK_ENCRYPTEDSAVEDOBJECTS_ENCRYPTIONKEY=123456789012345678901234567890QWERTYUIO -e ELASTICSEARCH_USERNAME=elastic -e ELASTICSEARCH_PASSWORD=changeme docker.elastic.co/kibana/kibana:7.11.1


http://localhost:5601/app/fleet#/

Agentes: https://www.elastic.co/es/downloads/elastic-agent

En la web de kibana nos dará el comando a ejecutar, algo tipo:
./elastic-agent install -f --kibana-url=http://127.0.0.1:5601 --enrollment-token=S0ZFZ3luY0JwOXljREh1Z1E3LXo6QUdDUDJ2ZEdUNGFnS0o1dXBKYjh3dw==
Neceista permisos de root. Que intenta hacer?

También podemos configurar el fichero elastic-agent.yaml a mano y hacer:
./elastic-agent run
