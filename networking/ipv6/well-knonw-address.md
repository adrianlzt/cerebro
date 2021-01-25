::/128: Es una dirección con todos los bits a 0. Es la dirección IPv6 indefinida.

::/0: Es la dirección de red IPv6 para describir la ruta por defecto en una tabla de enrutamiento. Es equivalente a la dirección IPv4 0.0.0.0.

::1/128: Localhost en IPv6. Equivalente a 127.0.0.1 (IPv4).

fe80::/10: Direcciones de vínculo o enlace local. No son enrutables pero generan una red local efectiva en el rango fe80::/64. La parte de Host se suele calcular a partir de la dirección MAC de la tarjeta. Valen para hablar por red local si no tenemos DHCP, los routers no las enrutan. En IPv4 es 169.254.0.0/16


ff02::/16: Direcciones de redes IPv6 Multicast. Equivalentes a las  (224.X) en redes IPv4.
ff02::2 -> all router multicast

fc00::/7: Son las direcciones para redes IPv6 privadas. Estas direcciones tampoco son enrutables en Internet y son equivalentes a 10.X, 172.16.X y 192.168.X en redes IPv4

::ffff:0:0/96: Direcciones IPv4 mapeadas en IPv6. Se utilizan para conversiones e interconexiones de protocolos IPv4 e IPv6.

64:ff9b::/96: Direcciones IPv6 generadas automáticamente a partir de IPv4. Se utilizan para cuando sea necesario hacer nuevas direcciones IPv6 y se quiera generar a partir de la dirección IPv4 de la máquina.

2002::/16: Indica que es una red 6 to 4 mapeada y utilizará la dirección IPv4 192.88.99.X como gateway para la interconexión.

2001::/32: Usado por el protocolo de túneles Teredo que permite hacer tunneling IPv6 sobre redes IPv4 en Internet. Este sistema es el que se utiliza a la hora de implementar Direct Access en Windows Server 2008 R2 y Windows 7.

2001:2::/48: Asignado a Benchmarking Methodology Working Group (BMWG) para comparativas (benchmarking) en IPv6 (similar a la red 198.18.0.0/15 para comparativas en IPv4). 

2001:10::/28: ORCHID (Overlay Routable Cryptographic Hash Identifiers). Direcciones IPv6 no-enrutables usadas para identificadores criptográficos Hash. 

2001:db8::/32: Direcciones utilizadas para documentación o ejemplos IPv6. Similar a las redes 192.0.2.0/24, 198.51.100.0/24 y 203.0.113.0/24 en IPv4.
