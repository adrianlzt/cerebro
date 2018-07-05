https://www.elastic.co/solutions/apm
https://www.elastic.co/blog/elastic-apm-beta-released

Cargar una libreria en nuestro código que enviará métricas a ES (pasando primero por el apm server) por donde vaya yendo el código, tiempos, etc

Soporta Node.js y python (ruby, javascript, java y go en un futuro)


# Server
docker run --rm -d -v "$PWD/apm-server.yml:/usr/share/apm-server/apm-server.yml" -p 8200:8200 docker.elastic.co/apm/apm-server:6.3.0

Ejemplo de config corriendo como container (referencia https://github.com/elastic/apm-server/blob/6.3/apm-server.reference.yml):
apm-server.host: "0.0.0.0:8200"
output.elasticsearch.hosts: ["http://172.17.0.1:9200"]
setup.kibana.host: "172.17.0.1:5601"
setup.dashboards.enabled: true
frontend.enabled: true


# Client
## Python
pip install elastic-apm[flask]

