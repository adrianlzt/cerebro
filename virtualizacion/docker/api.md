https://docs.docker.com/engine/api/v1.26/
https://docs.docker.com/engine/api/
Podemos atacar la api con curl --unix-socket

curl --unix-socket /var/run/docker.sock http:/v1.22/containers/json

O si tenemos ip:
curl 172.16.1.24:2376/containers/json


# Python
Lib para python
https://github.com/dotcloud/docker-py

pip install docker-py
import docker

Docker local:
client = docker.from_env()

Si accedemos a un docker remoto:
dockercli = docker.DockerClient(base_url="http://127.0.0.1:12376", version="auto")
