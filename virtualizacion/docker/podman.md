Correr containers sin necesidad de el demonio de docker.

Ejecuta containers OCI en runc sin necesidad de ningún demonio.

Usa la misma sintaxis que la cli de docker

Permite rootless containers

Usa conmon??
runc


# Install

## Ubuntu
Aún no hay paquetes oficiales (28/3/2020)
https://podman.io/getting-started/installation.html


# Configurar para poder correr como user
Necesitamos los binarios
newuidmap newgidmap
  en rhel shadow-utils

También hace falta, en rhel, para la network:
slirp4netns

Crear /etc/subuid y /etc/subgid
Formato de los ficheros: user:init_uid:number
Nos dice para cada usuario que rango de UIDs puede usar
En RHEL7.7 el nuevo shadow-utils/useradd ya mete las lineas en /etc/sub*id
Parece que todos los uids dentro del container se mapean externamente al init_uid + uid_interno
Root dentro del container será el usuario que ejecuta podman desde fuera.
El resto de users, desde fuera, serán init_uid + uid_interno

En centos7:
echo "user.max_user_namespaces=28633" > /etc/sysctl.d/userns.conf
sysctl -p /etc/sysctl.d/userns.conf
echo "testuser:100000:65536" > /etc/subuid
echo "testuser:100000:65536" > /etc/subgid

El valor máximo soportado de uid es 4294967295 (2^32-1, 32 bits), al menos en RHEL: https://access.redhat.com/solutions/25404
Parece que la manera correcta de meter cosas en los /etc/sub*id es (en versiones recientes de usermod):
sudo usermod --add-subuids 10000-75535 $(whoami)

Se suele poner 65536 porque parece que es lo que necesita podman
https://github.com/containers/libpod/issues/2542#issuecomment-469730746

Parece que despues hace falta correr:
https://github.com/containers/libpod/issues/3421#issuecomment-544455837
podman system migrate

Para comprobar que pilla los uids ejecutar este comando y ver que recibimos esa respuesta:
$ podman unshare cat /proc/self/uid_map
         0       1000          1
         1     100000      65536

Si seguimos teniendo problemas:
sudo touch /etc/sub{u,g}id
sudo usermod --add-subuids 10000-75535 $(whoami)
sudo usermod --add-subgids 10000-75535 $(whoami)
rm /run/user/$(id -u)/libpod/pause.pid



# Uso de disco
podman system df


# Images
podman images
  listar imágenes

podman pull --tls-verify=false registr/imagen
  bajar sin verificar cert del registry


# Isolation / namespaces
podman ps --ns
  listar los ns usados en cada container

## pid
--pid=host

Usar un container con el pid ns de otro container
--pid container:NOMBREOTROCONTAINER


# Pod
Tenemos también el concepto de pods
Cremos un pod (que crea un container de "infra")
Luego podemo ir metiendo containers en el pod.

TERMINAR ESTAS NOTAS

podman pod ps
  mostrar pods

Creamos un pod y le vamos agregando containers (podman run):
podman pod create --name mypod
  los "--publish/-p" deberemos hacerlos aqui
podman run --pod NOMBRE ...


# Generar manifest de k8s a partir de un pod
podman generate kube POD/container -s -f out.yaml

-s nos generará también el service
Los volume mounts los generará como
volumes:
  - hostPath:
      path: /home/adrian/Documentos/arduino/medidor_fuerza/var/lib/influxdb
      type: Directory



podman play kube pod.yml


# Mount
podman mount
  para montar el working dir de un container
  no me funciona
  en rootless no funciona



# Live migration
Permite parar un container en su estado actual, reiniciar y seguir desde donde estaba?

Se puede migrar un container de un podman a otro server?

podman container checkpoint -l -R --export=/tmp/cr.tgz
El container no se para, solo se hace un checkpoint en ese momento en el tiempo

Restore:
En otro nodo
podman container restore --import=/tmp/cr.tgz


# Network
https://www.redhat.com/sysadmin/container-networking-podman

No existe --link
Podemos meter todos los containers en el mismo pod para que compartan la red.
Me da algunos problemas, algunas veces pierdo el acceso a los puertos expuestos.

Si queremos comunicarnos entre pods rootless, tendremos que exponer los puertos en el host y atacar a la ip del host.


## Root
Crea una interfaz "cni0" y pincha a los containers a esa red.
Cada pod tendrá una ip de esa red donde el host será la .1
Atacando a la .1 desde los containers llegamos al host.

## Rootless
Usa slirp4netns
Es como veth pero para rootless

A partir de la version 1.8.0 se usa RootLessKit para el port forwarding
https://github.com/containers/libpod/blob/master/RELEASE_NOTES.md#180



# Systemd
Si queremos generar una unit para un pod

podman generate systemd nombrePod > mi.unit



# Build
https://github.com/containers/libpod/blob/master/docs/source/markdown/podman-build.1.md#examples
podman build -f Dockerfile -t imageName .


# Internal
Parece que almacena en /home/adrian/.local/share/containers

Modificar donde almacena: https://github.com/containers/libpod/issues/1916


## runc
Por debajo corre los pods con runc
mirar runc.md para ver como usarlo


## flow
Cuando llamamos a podman este llama a conmon, que es quien se comunica con runc.
Conmon deja un socket abierto para que podman pueda hablar con los containers arrancados.

Cuando se para un container, conmon llama a podman para terminar y limpiar la ejecucción, ejemplo de llamada al parar un container:
/usr/bin/podman --root /var/lib/zabbix/.local/share/containers/storage --runroot /tmp/run-776 --log-level error --cgroup-manager cgroupfs --tmpdir /tmp/run-776/libpod/tmp --runtime runc --storage-driver overlay --storage-opt overlay.mount_program=/usr/bin/fuse-overlayfs --events-backend journald container cleanup 1afa4381c48bd0ec17f35709199378aa2992ea99fe8d5fe324b3d7271e0e94d8


# Seccomp
Poner políticas de seguridad con seccomp

https://podman.io/blogs/2019/10/15/generate-seccomp-profiles.html

Política por defecto de docker: https://github.com/moby/moby/blob/master/profiles/seccomp/default.json
Lab sobre el uso de seccomp en docker: https://github.com/docker/labs/tree/master/security/seccomp

Formato:
https://github.com/docker/engine-api/blob/c15549e10366236b069e50ef26562fb24f5911d4/types/seccomp.go
https://github.com/opencontainers/runtime-spec/blob/master/specs-go/config.go#L357


Una ejecucción para generar un perfil de seccomp de lo que ha usado:
sudo podman run --rm -it --annotation io.containers.trace-syscall=of:/var/tmp/tmp.iryapUSY7x/ls.json archlinux ls /

El json que genera:
{
  "defaultAction": "SCMP_ACT_ERRNO",
  "syscalls": [
    {
      "names": [
        "access",
        "arch_prctl",
        "brk",
        "capget",
        "capset",
        "chdir",
        "close",
        "epoll_ctl",
        "epoll_pwait",
        "execve",
        "exit_group",
        "fchown",
        "fcntl",
        "fstat",
        "fstatfs",
        "futex",
        "getdents64",
        "getppid",
        "ioctl",
        "mmap",
        "mount",
        "mprotect",
        "munmap",
        "nanosleep",
        "newfstatat",
        "openat",
        "prctl",
        "pread64",
        "read",
        "rt_sigreturn",
        "seccomp",
        "setgid",
        "setgroups",
        "setuid",
        "stat",
        "write"
      ],
      "action": "SCMP_ACT_ALLOW",
      "args": [],
      "comment": "",
      "includes": {},
      "excludes": {}
    }
  ]
}


Ejecutar un pod con unas políticas (si ponemos --privileged ignora el filtrado de seccomp):
sudo podman run --security-opt seccomp=/tmp/ls.json fedora:30 ls -l / > /dev/null



Para meter args:
index is the index of the system call argument
op is the operation to perform on the argument. It can be one of:
SCMP_CMP_NE - not equal
SCMP_CMP_LT - less than
SCMP_CMP_LE - less than or equal to
SCMP_CMP_EQ - equal to
SCMP_CMP_GE - greater than
SCMP_CMP_GT - greater or equal to
SCMP_CMP_MASKED_EQ - masked equal: true if (value & arg == valueTwo)
value is a parameter for the operation (uint64), no vale hex
valueTwo is used only for SCMP_CMP_MASKED_EQ

Ejemplo:
"name": "accept",
"action": "SCMP_ACT_ALLOW",
"args": [
  {
    "index": 0,
    "op": "SCMP_CMP_MASKED_EQ",
    "value": 2080505856,
    "valueTwo": 0
  }

No podemos devolver errores distintos de 1 ni realizar modificaciones.


https://google.github.io/kafel/ es un lenguaje para definir reglas de seccomp usado por nsjail (buscar nsjail.md)




# Errores
chown: changing ownership of ‘/var/lib/zabbix/.local/share/containers/storage/overlay/l’: Operation not permitted
Parece que me daba si intentaba ejecutar "podman info" (o cualquier cosa) en un dir donde no tenía permisos.


error configuring CNI network plugin: failed to add watch on "/etc/cni/net.d/": no space left on device
https://github.com/containers/libpod/issues/1566
Arreglado con:
sysctl -w fs.inotify.max_user_instances=4096
sysctl -w fs.inotify.max_user_watches=65536
