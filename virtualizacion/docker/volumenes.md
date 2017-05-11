http://docs.docker.com/userguide/dockervolumes/
http://crosbymichael.com/advanced-docker-volumes.html

-v HOST_PATH:CONTAINER_PATH

Directorios compartidos entre el container y el host:
docker run -v /host/logs:/container/logs ubuntu echo momma

El contenido del directorio local /host/logs aparecerá como un nuevo disco en el container bajo /container/logs

El directorio local no se creará si ejecutamos la instrucción desde CLI, pero si cuando se lance desde la API (me lo contestaron en el Google Groups de Docker)


Si pasamos únicamente un valor: docker run -v /www ubuntu echo hola
Se creará un directorio bajo (ver con docker inspect) y en el container estará en /www

Podemos configurar un container para que también monte los volumenes de otro container:
docker run -volumes-from containerA containerB command


Tambien se pueden especificar ficheros:
$ sudo docker run --rm -it -v ~/.bash_history:/.bash_history ubuntu /bin/bash


En un dockerfile (se puede poner como array json, o simplemente separado por espacios):
VOLUME ["/var/log/", "/opt/bla"]
VOLUME "/var/log/" "/opt/bla"

Si usamos un driver para el storage usaremos:
docker volume create --driver=rexray --name=pepe --opt=size=1
docker run -d --volume-driver=rexray -v pepe:/data redis

No podemos montar el mismo volumen en dos nodos distintos de un swarm. No se si esto es limitacion de rexray o docker.


# Persistencia
Podemos usar plugins de storage para docker para tener almacenamiento persistente.

# REX-Ray
mirar storage/rex-ray.md
Parece el mejor. Desarrollo continuado soportado por EMC.
Soporta ceph, virtualbox, cabinas...



# Infinit
En alpha (8/4/2017)
Mirar storage/infinit.md


# Flocker
https://clusterhq.com/flocker/introduction/

Almacena en un storage block-based los volumes y se encarga de moverlos a donde los necesite el container.

Ceph esta disponible como storage de manera experimental.


# RancherOS Convoy
Otro storage driver para volumenes persistentes.
Backends soportados: device mapper, VFS/NFS, EBS


# fuxi
https://github.com/openstack/fuxi
Montado encima de Cinder (que a su vez tiene soporte para muchos backends, entre ellos ceph: https://wiki.openstack.org/wiki/CinderSupportMatrix)
Aun muy pronto para usarlo (10/5/2017)


# contiv
https://github.com/contiv/volplugin
Soporta ceph o nfs


# horcrux
https://github.com/muthu-r/horcrux
Soporta minio como backend
Version 00.02 y parece que desarrollo parado desde feb'16
