Opciones de configuración para el docker daemon:
docker daemon --help

Tambien se puede meter las opciones en un fichero:
https://docs.docker.com/engine/reference/commandline/daemon/#daemon-configuration-file

/etc/docker/daemon.json

This file uses the same flag names as keys, except for flags that allow several entries, where it uses the plural of the flag name, e.g., labels for the label flag

Ejemplo:
{
	"authorization-plugins": [],
	"dns": [],
	"dns-opts": [],
	"dns-search": [],
	"exec-opts": [],
	"exec-root": ""
}

# Centos VIEJO
Cambiar el tipo de almacenamiento
http://www.projectatomic.io/blog/2015/06/notes-on-fedora-centos-and-docker-storage-drivers/

Para montarlo con lvm al final he hecho:
https://access.redhat.com/documentation/en/red-hat-enterprise-linux-atomic-host/version-7/getting-started-with-containers/#changing_docker_storage_configuration

systemctl stop docker docker-storage-setup
echo VG=docker-vg >> /etc/sysconfig/docker-storage-setup
echo "DATA_SIZE=95%FREE" >> /etc/sysconfig/docker-storage-setup
   esto es para que docker ocupe el 95% del volume group
pvcreate /dev/vdb
vgcreate docker-vg /dev/vdb
rm -fr /var/lib/docker
systemctl start docker


# Cambiar el dir de devicemapper
https://github.com/docker/docker/issues/3127
https://forums.docker.com/t/how-do-i-change-the-docker-image-installation-directory/1169

Parar docker daemon
Mover el dir a la nueva localización:
  mv /var/lib/docker /home/docker
Meter el parametro graph en la config de docker: /etc/docker/daemon.json
{
  "graph": "/home/docker"
}

Parece que no es tan sencillo en CentOS:
docker ps -q | xargs docker kill
stop docker
cd /var/lib/docker/devicemapper/mnt
umount ./*
mv /var/lib/docker $dest
ln -s $dest /var/lib/docker
start docker
