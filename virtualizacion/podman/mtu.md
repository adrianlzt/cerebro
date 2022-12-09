mirar docker/mtu.md

Podman por defecto usa MTU 1500.
Si la interfaz de nuestra máquina es menor (por ejemplo, VMs de openstack), veremos fallos aleatorios en conexiones TLS.

Podemos modificar el MTU de las redes, la forma dependerá del backend de network que usemos.

# Netavark

https://github.com/containers/netavark/blob/f7ecf5695f0707817dfb211d490ec37da0fd253e/test/testfiles/macvlan-mtu.json#L31

Para redes que no sean la default:
Con modificar el fichero /etc/containers/networks/podman-dns.json es suficiente.


Para la red default, primero crearemos su fichero a partir del json:
podman network inspect podman  | jq '.[]' > /etc/containers/networks/podman.json

Luego añadiremos el options.mtu y reiniciaremos los contenedores que estaban unidos a esa network.
