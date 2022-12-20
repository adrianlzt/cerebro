# Live migration
Permite parar un container en su estado actual, reiniciar y seguir desde donde estaba?

Se puede migrar un container de un podman a otro server?

podman container checkpoint -l -R --export=/tmp/cr.tgz
El container no se para, solo se hace un checkpoint en ese momento en el tiempo

Restore:
En otro nodo
podman container restore --import=/tmp/cr.tgz
