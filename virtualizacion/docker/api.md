https://docs.docker.com/engine/api/v1.26/
https://docs.docker.com/engine/api/
Podemos atacar la api con curl --unix-socket

Si queremos ver que hace la cli por debajo mirar debug.md

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


# Activar API via HTTP
systemctl edit docker

Para centos (mirar con "systemctl cat docker" el ExecStart y añadir el -H tcp...):
[Service]
ExecStart=
ExecStart=/usr/bin/dockerd -H fd:// -H tcp://0.0.0.0:2375 --containerd=/run/containerd/containerd.sock

systemctl daemon-reload
systemctl restart docker.service


## HTTPS
https://docs.docker.com/engine/security/https/
Si abrimos la api HTTP por defecto no tiene seguridad y todo el mundo puede conectarse.

Script para generar certificados que aceptan cualquier CN
https://gist.github.com/bradrydzewski/a6090115b3fecfc25280

bash generate_docker_cert.sh
mv server-cert.pem /etc/pki/tls/certs/docker.pem
chmod 400 server-key.pem
mv server-key.pem /etc/pki/tls/private/docker.key
cp ca.pem /etc/pki/CA/certs/docker-ca.pem

mv key.pem docker-client.key
mv cert.pem docker-client.pem
mv ca.pem docker-client-ca.pem
Llevarnos estos ficheros al cliente para poder conectar

systemctl edit docker

[Service]
ExecStart=
ExecStart=/usr/bin/dockerd -H fd:// -H tcp://0.0.0.0:2376 --containerd=/run/containerd/containerd.sock --tlsverify --tlscacert=/etc/pki/CA/certs/docker-ca.pem --tlscert=/etc/pki/tls/certs/docker.pem --tlskey=/etc/pki/tls/private/docker.key

systemctl daemon-reload
systemctl restart docker.service


Cliente:
docker --tls --tlscacert=docker-client-ca.pem --tlscert=docker-client.pem --tlskey=docker-client.key -H=10.0.1.139:2376 version

O con hostname:
docker --tlsverify --tlscacert=docker-client-ca.pem --tlscert=docker-client.pem --tlskey=docker-client.key -H=NOMBREHOST:2376 version

