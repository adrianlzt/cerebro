https://github.com/codedellemc/rexray

Hace de intermediario entre Docker y sistemas de almacenamiento (CEPH, cabinas, Amazon S3, etc)

# Instalar
curl -sSL https://dl.bintray.com/emccode/rexray/install | sh
RPMs y DEBs: https://dl.bintray.com/emccode/rexray/stable/
Para CentOS y version 0.9.0 instala: https://dl.bintray.com/emccode/rexray/stable/0.9.0/rexray-0.9.0-1.x86_64.rpm



# Config
Generar config y meter en /etc/rexray/config.yml
http://rexrayconfig.codedellemc.com/

Para ceph:
/etc/rexray/config.yml
libstorage:
  service: rbd
rbd:
  defaultPool: rbd

Mirar como instalar ceph para que este disponible: storage/ceph/install.md (Instalar un cliente)


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


Ejemplo usando un volumen persistente
http://rexray.readthedocs.io/en/stable/user-guide/applications/
