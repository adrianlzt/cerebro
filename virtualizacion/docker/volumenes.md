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

Estos containers permaneceran cuando hagamos stop al container. Por ejemplo, si en un container de mongo ponemos "VOLUME /data/db", podremos parar el container, volverlo a arrancar y mantendremos los datos.



# Persistencia
Podemos usar plugins de storage para docker para tener almacenamiento persistente.

# REX-Ray
https://github.com/codedellemc/rexray

Hace de intermediario entre Docker y sistemas de almacenamiento (CEPH, cabinas, Amazon S3, etc)


# Infinit
En alpha (8/4/2017)
Mirar storage/intinit.md


# Flocker
https://clusterhq.com/flocker/introduction/

Almacena en un storage block-based los volumes y se encarga de moverlos a donde los necesite el container.

Ceph esta disponible como storage de manera experimental.


# RancherOS Convoy
Otro storage driver para volumenes persistentes.
Backends soportados: device mapper, VFS/NFS, EBS
