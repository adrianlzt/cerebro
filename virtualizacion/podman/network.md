# Network
https://www.redhat.com/sysadmin/container-networking-podman

No existe --link
Podemos meter todos los containers en el mismo pod para que compartan la red.
Me da algunos problemas, algunas veces pierdo el acceso a los puertos expuestos.

Si queremos comunicarnos entre pods rootless, tendremos que exponer los puertos en el host y atacar a la ip del host.


## Acceder a puertos
Si hemos levantado el contenedor sin puertos pero queremos acceder a ellos, podemos usar nsenter.

Por ejemplo, para levantar un firefox en el namespace de red del contendor:
sudo nsenter -t 1144792 -n bash
sudo -u adrian firefox


## Backend
Soporta dos backend network: cni y netavark (>=v4.0)
Para chequear cual estamos usando:
podman info --format {{.Host.NetworkBackend}}

Podemos forzar cual queremos en /etc/containers/containers.conf
Tras cambiar la network recomiendan
sudo podman system reset

https://docs.oracle.com/en/operating-systems/oracle-linux/podman/podman-ConfiguringNetworkingforPodman.html#podman-network-create:~:text=Reinitialize%20the%20Podman,Copy

### netavark
https://docs.oracle.com/en/operating-systems/oracle-linux/podman/podman-ConfiguringNetworkingforPodman.html#topic_z45_l15_t5b

Netavark is a high-performance network stack that can be used to configure network bridges, firewall rules, and system settings for your containers. Netavark does not use plugins to perform configuration setup. All network set up actions are performed directly by the tool itself, which reduces overhead and improves network setup performance when you run a container. Netavark provides improved handling of IPv6, particularly around Network Address Translation (NAT) and port forwarding. DNS is also automatically configured across networks so that containers with multiple networks can connect to any other container on any other shared network by using the container name as a resolvable DNS reference.

You might prefer to use the Netavark backend if all of your deployments are using Podman version 4.0 or later and you intend only to run containers within Podman. Netavark provides better performance and features that make your containers easily integrate into your existing network infrastructure and improved DNS resolution.


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
Mirar si la red que estamos usando tiene "dns_enabled" con "podman network inspect".

También dependerá del network backend.

### netavark
Usando netavark, y con aardvark-dns instalado, si creamos una red nueva, tendrá activado (crear/mirar con podman network create/inspect): "dns_enabled": true

Automáticamente se levantará un demonio aardvark con un fichero de config donde irá mapeando los nombres a las IPs.

Funciona tanto con root como rootless containers.

Tendremos que crear los containers apuntando a esa nueva red.
Otra opción es modificar la red por defecto que coge podman, en /etc/containers/containers.conf network.default

Afectará a los root containers. No se porque pero los rootless lo ignoran y no cogen esa red por defecto.

### cni
Por defecto los contenedores no tiene resolución DNS, tenemos que activar el plugin
https://www.itix.fr/blog/consistent-dns-name-resolution-for-virtual-machines-and-containers/

El plugin de dnsname no viene instalado por defecto con el paquete cni-plugins de pacman.

