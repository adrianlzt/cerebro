mirar performance.md

docker daemon -D


https://developers.redhat.com/blog/2015/02/25/inspecting-docker-activity-with-socat/
$ socat -v UNIX-LISTEN:/tmp/fake,fork UNIX-CONNECT:/var/run/docker.sock

$ export DOCKER_HOST=unix:///tmp/fake
$ docker images

Veremos los comandos donde hayamos arrancado el socat



# Jugando con los namespaces

nsenter -t 1010 -u hostname
hostname del container. Nos sirve para saber a quien pertence el PID 1010


nsenter -t 1010 -n dig analisis @127.0.0.11
ejecutar dig como si estuviesemos dentro del container (sin tener dig en el container)
Lo que hacemos es que nos metemos en el namespace de red del container.


nsenter -t 1010 -n ip -4 -o a
consultar ips del container

