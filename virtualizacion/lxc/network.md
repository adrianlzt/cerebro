http://containerops.org/2013/11/19/lxc-networking/

Cuatro tipos de interfaces de red:
  empty
  veth
  macvlan
  vlan
  phys

empty: crea solo el interfaz de loopback

veth: crea un par de interfaces falsas de ethernet, una unida con el contenedor y otra con un bridge en el host.
      Se pasa el tráfico entre ambas como si fuese un pipe. Se puede usar cualquier protocolo que vaya sobre ethenet.

Si terminar...
