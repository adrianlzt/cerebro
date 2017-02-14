Error response from daemon: client is newer than server (client API version: 1.20, server API version: 1.19)
Actualizamos docker pero no reiniciamos el servicio.


Problemas con los permisos? Los ficheros aparecen sin permisos:
?---------   ? ?  ?     ?            ? README.md
Mirar que no tengamos el selinux activado
http://stackoverflow.com/questions/24288616/permission-denied-on-accessing-host-directory-in-docker



Problemas con la red. Paquetes que no entran al docker
Diferencias en la MTU del host y la interfaz de docker? Parece que si es más grande la de docker no tira
https://docs.docker.com/engine/userguide/networking/default_network/custom-docker0/
vi /etc/sysconfig/docker-network
DOCKER_NETWORK_OPTIONS=--mtu=1400

systemctl restart docker
