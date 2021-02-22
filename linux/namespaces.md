http://man7.org/linux/man-pages/man7/namespaces.7.html
network/namespace.md
linux/filesystems/namespace.md
https://success.docker.com/KBase/Introduction_to_User_Namespaces_in_Docker_Engine

Concepto para aislar recursos.
Se esperan tener 10 (escuchado en la charla de http://www.slideshare.net/joshuasoundcloud/linux-containers-from-scratch-velocity-barcelona-2014).
Ahora mismo hay 6 implementados:


       Namespace   Constant        Isolates
       IPC         CLONE_NEWIPC    System V IPC, POSIX message queues
       Network     CLONE_NEWNET    Network devices, stacks, ports, etc.
       Mount       CLONE_NEWNS     Mount points
       PID         CLONE_NEWPID    Process IDs
       User        CLONE_NEWUSER   User and group IDs
       UTS         CLONE_NEWUTS    Hostname and NIS domain name

Una idea es como si tuviesemos distintas dimensiones. Y las cosas que están en una dimensión no se puede comunicar, ni saber que existen, cosas en las otras dimensiones.
Un ejemplo fácil es con las redes. Podemos tener un namespace donde tengamos una interfaz configurada con una red, y otro namespace con otra interfaz distinta que esté configurada para una red completamente distinta.
La interfaz física solo puede vivir en uno de los namespaces.

/proc/[pid]/ns/
  no se para que puede servir. Siempre aparecen los mismos ficheros


# PID
Con este aislamiento conseguimos que los procesos del namespace no vean los PID de los otros namespaces.
El valor PID que puede tener un proceso visto desde el host es distinto que el valor que tiene dentro del namespace (de un container donde esté corriendo).


# Mount
https://lwn.net/Articles/689856/
https://stackoverflow.com/a/22889401

Leer un fichero de otro mount NS
Lo hacemos a través de /proc/PID/root/path/al/fichero

Ejemplo:
➜ docker run --rm -it alpine sleep infinity
➜ sudo cat /proc/$(pgrep sleep)/root/etc/alpine-release
3.13.0



# Containers from scratch
https://ericchiang.github.io/post/containers-from-scratch/

## unshared
run program with some namespaces unshared from parent

sudo unshare -p -f --mount-proc=$PWD/rootfs/proc chroot rootfs /bin/bash
crear un chroot sobre el directorio $PWD/rootfs/proc con un namespace de PID distinto al host



## nsenter
run program with namespaces of other processes

sudo nsenter --pid=/proc/29840/ns/pid unshare -f --mount-proc=$PWD/rootfs/proc chroot rootfs /bin/bash
creamos un chroot y usamos el namespace de PID ya existente que está usando el proceso 29840


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
