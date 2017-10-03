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


https://developers.redhat.com/blog/2015/02/25/inspecting-docker-activity-with-socat/
$ socat -v UNIX-LISTEN:/tmp/fake,fork UNIX-CONNECT:/var/run/docker.sock

$ export DOCKER_HOST=unix:///tmp/fake
$ docker images

Veremos los comandos donde hayamos arrancado el socat



# Jugando con los namespaces

nsenter -t 1010 -u hostname
hostname del container. Nos sirve para saber a quien pertence el PID 1010
CUIDADO! el pid debe ser de un proceso corriendo dentro de docker, no del proceso docker-containerd


nsenter -t 1010 -n dig analisis @127.0.0.11
ejecutar dig como si estuviesemos dentro del container (sin tener dig en el container)
Lo que hacemos es que nos metemos en el namespace de red del container.


nsenter -t 1010 -n ip -4 -o a
consultar ips del container


-m, --mount[=file]
       Enter the mount namespace.  If no file is specified, enter the mount namespace of the target process.  If file is specified, enter the mount namespace specified by file.

-u, --uts[=file]
       Enter the UTS namespace.  If no file is specified, enter the UTS namespace of the target process.  If file is specified, enter the UTS namespace specified by file.

-i, --ipc[=file]
       Enter the IPC namespace.  If no file is specified, enter the IPC namespace of the target process.  If file is specified, enter the IPC namespace specified by file.

-n, --net[=file]
       Enter the network namespace.  If no file is specified, enter the network namespace of the target process.  If file is specified, enter the network namespace specified by file.

-p, --pid[=file]
       Enter the PID namespace.  If no file is specified, enter the PID namespace of the target process.  If file is specified, enter the PID namespace specified by file.

-U, --user[=file]
       Enter  the  user namespace.  If no file is specified, enter the user namespace of the target process.  If file is specified, enter the user namespace specified by file.  See also the --setuid
       and --setgid options.



# Ver info de containers sin poder usar el client
/run/docker/libcontainerd/IDCONTAINER
Ahi podemos encontrar config.json con información del container (la que nos daria docker inspect)

Sacar los hostnames de los containers que estan corriendo:
grep -o 'hostname":"[^"]*' /run/docker/libcontainerd/*/config.json
