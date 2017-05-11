mirar performance.md

docker daemon -D


https://developers.redhat.com/blog/2015/02/25/inspecting-docker-activity-with-socat/
$ socat -v UNIX-LISTEN:/tmp/fake,fork UNIX-CONNECT:/var/run/docker.sock

$ export DOCKER_HOST=unix:///tmp/fake
$ docker images

Veremos los comandos donde hayamos arrancado el socat
