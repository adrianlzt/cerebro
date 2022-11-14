# Network
https://www.redhat.com/sysadmin/container-networking-podman

No existe --link
Podemos meter todos los containers en el mismo pod para que compartan la red.
Me da algunos problemas, algunas veces pierdo el acceso a los puertos expuestos.

Si queremos comunicarnos entre pods rootless, tendremos que exponer los puertos en el host y atacar a la ip del host.


## Root
Crea una interfaz "cni0" y pincha a los containers a esa red.
Cada pod tendrá una ip de esa red donde el host será la .1
Atacando a la .1 desde los containers llegamos al host.

## Rootless
Usa slirp4netns
Es como veth pero para rootless

A partir de la version 1.8.0 se usa RootLessKit para el port forwarding
https://github.com/containers/libpod/blob/master/RELEASE_NOTES.md#180


## DNS
Por defecto los contenedores no tiene resolución DNS, tenemos que activar el plugin
https://www.itix.fr/blog/consistent-dns-name-resolution-for-virtual-machines-and-containers/

El plugin de dnsname no viene instalado por defecto con el paquete cni-plugins de pacman.

Parece que otra opción puede ser instalar aardvark-dns.
https://github.com/containers/aardvark-dns
