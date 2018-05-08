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

Si usamos docker>=1.17 en OpenStack tenedremos que aumentar la MTU (poner a 1450)

El problema es que la interfaz docker0 tenga un mtu más grande que la interfaz de la máquina. Las conexiones LTS no funcionan.




dockerd-current[3380]: time="2017-05-19T14:50:16.867948483+02:00" level=fatal msg="Error starting daemon: error initializing graphdriver: devmapper: Base Device UUID and Filesystem verification failed: devmapper: Current Base Device UUID:8d5652f9-77b6-4fb7-a47f-e3eae9f14a4c does not match with stored UUID:adaa5863-1f84-4f82-8a66-f8a8d6314089. Possibly using a different thin pool than last invocation"
rm -fr /var/lib/docker
lvremove docker-vg
vgremove docker-vg
rm -fr /etc/sysconfig/docker-storage
fdisk /disco/para/Docker
 borrar particion
wipefs -a /disco/para/docker
docker-storage-setup
systemctl start docker




uniendo un nodo a un docker swarm
Error starting daemon: error initializing graphdriver: devmapper: Device %device% is not a thin pool
mirar si esta abierto el puerto en el server donde estamos intentando ejecutar el comando de join del cluster



https://github.com/docker/distribution/issues/1874
server gave HTTP response to HTTPS client
    Create or modify /etc/docker/daemon.json
    { "insecure-registries":["myregistry.example.com:5000"] }
    Restart docker daemon
    sudo service docker restart

