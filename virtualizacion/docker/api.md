https://docs.docker.com/engine/api/v1.26/
https://docs.docker.com/engine/api/
Podemos atacar la api con curl --unix-socket

curl --unix-socket /var/run/docker.sock http:/v1.24/containers/json
Equivalente a "docker ps"

curl --unix-socket /var/run/docker.sock "http:/v1.24/containers/json?limit=5"
Equivalente a "docker ps -n 5"

curl --unix-socket /var/run/docker.sock "http:/v1.24/images/json"
como docker images

Eventos:
curl --unix-socket /var/run/docker.sock -X GET http:/v1.22/events?since=1487864355

Estadisticas de un container (retorna una única vez un json):
curl --unix-socket /var/run/docker.sock -X GET "http:/v1.24/containers/f89b0294c3f7/stats?stream=0"

O si tenemos ip:
curl 172.16.1.24:2376/containers/json


Configurar el cliente con variables de entorno
DOCKER_API_VERSION=1.24 DOCKER_HOST=docker:4243 DOCKER_TLS_VERIFY=true docker


# Python
Lib para python
https://github.com/dotcloud/docker-py

pip install docker-py
import docker

Docker local:
client = docker.from_env()

Si accedemos a un docker remoto:
dockercli = docker.DockerClient(base_url="http://127.0.0.1:12376", version="auto")
