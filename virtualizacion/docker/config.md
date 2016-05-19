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
