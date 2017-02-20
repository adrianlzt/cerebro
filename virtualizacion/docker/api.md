https://docs.docker.com/engine/api/v1.26/
https://docs.docker.com/engine/api/
Podemos atacar la api con curl --unix-socket

curl --unix-socket /var/run/docker.sock http:/v1.22/containers/json

O si tenemos ip:
curl 172.16.1.24:2376/containers/json


Lib para python
https://github.com/dotcloud/docker-py
