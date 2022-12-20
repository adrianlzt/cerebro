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


## bbdd donde almacena los datos
~/.local/share/containers/storage/libpod/bolt_state.db

Podemos leer/editar con boltbrowser, aunque he probado a parar un pod, modificar su command y volver a arrancar y no ha funcionado, pero tal vez no he modificado la parte correcta.
Parece que aquí hablan del tema: https://github.com/containers/podman/issues/376
