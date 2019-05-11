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

Openshift tiene una tabla de compatibilidades: https://docs.openshift.com/dedicated/architecture/additional_concepts/storage.html#pv-access-modes
Los únicos que permiten RW de varios containers sobre un mismo volumen son NFS y GlusterFS, los que nativamente lo soportan.


# Templating con volumenes (para swarm services)
docker >= 1.13
docker service create --name myservice --mount type=volume,src="{{.Task.Name}}",dst=/results/ busybox top




# Montar un volumen en un container arrancado
https://jpetazzo.github.io/2015/01/13/docker-mount-dynamic-volumes/
Si tenemos mounts bind o subvolumenes con BTRFS mirar para ver como sacar correctamente el device que necesitamos.

Los pasos esquemáticos:
 - entrar en el contaienr con nsenter con el namespace de mount
 - crear el mknod del dispositivo que contiene el directorio que queremos montar
 - montar ese dispositivo
 - hacer un mount bind del directorio que necesitamos
 - desmontar el dispositivo

Tenemos que saber a que dispositivo físico pertenece el directorio que queremos compartir.
Salvo que tengamos mount binds por enmedio o subvolumes BTRFS podemos sacar el dispositivo con:
df $(realpath directorio)
ls -la /dev/dispositivo
  para sacar el major number y el minor number (en decimal)

nsenter -t PID -m -p -u
$ mknod --mode 0600 /dev/dispositivo b MAJ MIN
$ mkdir /tmpmnt && mount /dev/dispositivo /tmpmnt
$ mount -o bind /tmpmnt/mi/directorio /srv
$ umount /tmpmnt

Si tenemos varios mount bind al mismo dispositivo df solo mostrará uno de ellos
En /proc/self/mountinfo podremos verlos todos



# Persistencia en volumenes compartidos
Podemos usar plugins de storage para docker para tener almacenamiento persistente.
Si solo tenemos un nodo podemos tener volumenes persistentes locales.

## REX-Ray
mirar storage/rex-ray.md
Parece el mejor. Desarrollo continuado soportado por EMC.
Soporta ceph rbd, virtualbox, cabinas...


## CephFS
Si tenemos un cluster de Ceph podemos usar cephfs para montar localmente en cada nodo un directorio compartido donde crear los volumenes.
Si queremos que cada container tenga su propio volumen, podemos, en el arranque del container crear un uuid único y usar ese dir: https://github.com/moby/moby/issues/30008

https://gitlab.com/n0r1sk/docker-volume-cephfs

Por ahora Ceph solo soporta un FS por cluster.


## Infinit
Web ya no funciona (11/5/2019)
En alpha (8/4/2017)
Mirar storage/infinit.md


## Flocker
https://clusterhq.com/flocker/introduction/
Almacena en un storage block-based los volumes y se encarga de moverlos a donde los necesite el container.
Ceph esta disponible como storage de manera experimental.


## RancherOS Convoy
Otro storage driver para volumenes persistentes.
Backends soportados: device mapper, VFS/NFS, EBS


## fuxi
https://github.com/openstack/fuxi
Montado encima de Cinder (que a su vez tiene soporte para muchos backends, entre ellos ceph: https://wiki.openstack.org/wiki/CinderSupportMatrix)
Aun muy pronto para usarlo (10/5/2017)


## contiv
https://github.com/contiv/volplugin
Soporta ceph o nfs
Experimental y desarrollo parado (oct 2016)


## horcrux
https://github.com/muthu-r/horcrux
Soporta s3 como backend
Version 00.02 y parece que desarrollo parado desde feb'16



# NFS
Mountar un volumen NFS en docker swarm
version: "3.4"
networks:
  test:
    driver: "overlay"
services:
  api:
    image: "miimage"
    networks:
      - test
    volumes:
      - type: volume
        source: example
        target: /nfs
        volume:
          nocopy: true
volumes:
  example:
    driver_opts:
      type: "nfs"
      o: "addr=10.0.2.2,nolock,soft,rw"
      device: ":/export/assets"

