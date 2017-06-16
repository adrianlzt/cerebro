By default, a unix domain socket (or IPC socket) is created at /var/run/docker.sock, requiring either root permission, or docker group membership.

Si no existe el grupo "docker" se creara con root:root

Para que pille el grupo, lo creamos y reiniciamos el demonio.
