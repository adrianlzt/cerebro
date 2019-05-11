https://github.com/codedellemc/rexray

Hace de intermediario entre Docker y sistemas de almacenamiento (CEPH, cabinas, Amazon S3, etc)


# Usandolo como plugin de docker
Mirar ceph/rbd.md para ver como crear el pool para almacenar el rbd y el usuario para acceder

Instalar ceph client, mirar como desplegar el agente con la instalación de ansible (usar sección [clients])

Tenemos que tener cargado el modulo rdb
  modprobe rbd
  Para que cargue en el arranque:
  echo "rbd" > /etc/modules-load.d/ceph-rbd.conf

Comprobar que podemos administrar rdb:
rbd --user NOMBREUSER --pool NOMBREPOOL ls


Instalar el plugin (ejemplo con user dockerswarm y pool dockerswarm):
docker plugin install rexray/rbd RBD_DEFAULTPOOL=dockerswarm RBD_CEPHARGS="--user dockerswarm"
  nos pedirá confirmación tras mostrar los permisos que solicita

Crear volumen (visible por todo el docker swarm, si estamos usando swarm):
docker volume create --driver rexray/rbd prueba





RESTO DE INSTRUCCIONES PARA USAR REXRAY COMO NO PLUGIN

# Instalar
curl -sSL https://dl.bintray.com/emccode/rexray/install | sh
RPMs y DEBs: https://emccode.bintray.com/rexray/stable/
Para CentOS y version 0.9.0 instala: https://dl.bintray.com/emccode/rexray/stable/0.9.0/rexray-0.9.0-1.x86_64.rpm



# Config
Generar config y meter en /etc/rexray/config.yml
http://rexrayconfig.codedellemc.com/

Para ceph:
/etc/rexray/config.yml
libstorage:
  service: rbd
rbd:
  defaultPool: docker

Mirar como instalar ceph para que este disponible: storage/ceph/install.md (Instalar un cliente)
Podemos tambien usar la instalación con ansible usando [clients]

Crear un pool, de nombre docker, para rexray:
ceph osd pool create docker 16


# Run
Arrancar rexray
rexray start

Mete un unit en systemd.
Ver logs:
journalctl -u rexray


# Administrar
Ver volumenes (size en GB)
rexray volume ls


# Docker
Una vez arrancado rexray parece que ya tenemos el backend disponible en docker
Podemos verlo con:
docker volume ls

Crear un volumen:
docker volume create --driver=rexray --name=psql --opt=size=2

Usando volumen:
docker run --rm -it -v "prueba:/mnt" alpine

No se puede montar el mismo volumen en dos containers simultáneamente


Ejemplo usando un volumen persistente
http://rexray.readthedocs.io/en/stable/user-guide/applications/
