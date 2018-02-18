https://github.com/codedellemc/rexray

Hace de intermediario entre Docker y sistemas de almacenamiento (CEPH, cabinas, Amazon S3, etc)


# Usandolo como plugin de docker
docker plugin install rexray/rbd RBD_DEFAULTPOOL=docker RBD_CEPHARGS="-n client.docker"
  previamente hemos instalado ceph client y creado un user "client.docker" y puesto sy keyring en /etc/ceph/ceph.client.docker.keyring
    no tengo claro que permisos necesito, al final he terminado usando el client.admin y el pool por defecto rbd
      docker plugin install rexray/rbd
  mirar como desplegar el agente con la instalación de ansible (usar sección [clients])
  mirar /home/adrian/adrianRepo/storage/ceph/auth.md

  Tenemos que tener cargado el modulo rdb
	modprobe rbd

  Comprobar que podemos administrar rdb:
  CEPH_ARGS="-n client.docker" rbd ls

Crear volumen:
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
