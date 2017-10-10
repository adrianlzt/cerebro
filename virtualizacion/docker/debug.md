# Cambiar a modo debug en caliente
https://docs.docker.com/engine/admin/#enable-debugging
https://success.docker.com/KBase/How_do_I_enable_%22debug%22_logging_of_the_Docker_daemon%3F
/etc/docker/daemon.json:
{
    "debug": true
}

sudo kill -SIGHUP $(pidof dockerd)





mirar performance.md

docker daemon -D


Con sysdig podemos escuchar que está pasando por el unix socket:
sysdig fd.name contains /var/run/docker.sock -c echo_fds
sysdig fd.name contains /var/run/docker.sock and \( proc.name=docker or proc.name=dockerd-current \) and evt.type=write -c echo_fds


https://developers.redhat.com/blog/2015/02/25/inspecting-docker-activity-with-socat/
$ socat -v UNIX-LISTEN:/tmp/fake,fork UNIX-CONNECT:/var/run/docker.sock

$ export DOCKER_HOST=unix:///tmp/fake
$ docker images

Veremos los comandos donde hayamos arrancado el socat



# Jugando con los namespaces
mirar linux/namespaces.md (nsenter, unshare)



# Ver info de containers sin poder usar el client
/run/docker/libcontainerd/IDCONTAINER
Ahi podemos encontrar config.json con información del container (la que nos daria docker inspect)

Sacar los hostnames de los containers que estan corriendo:
grep -o 'hostname":"[^"]*' /run/docker/libcontainerd/*/config.json
