DEPRECATED: ifconfig y /etc/sysconfig/network 

networkd funcionará como rescate en caso de que NetworkManager no funcione.

Toda la configuración se hace con NetworkManager:
nmcli
nmtui (ncurses)

Facilidad para manejar redes que puedan cambiar.
Sencillez para bond y bridge.
Para servidores tiene sentido por las facilidades que nos da para bond, bridge, etc.


Team-driver, el nuevo bonding.
  - implementado en user-space

Mejoras NTP
  - ahora se usa chrony en vez de cliente ntp

Optimización TCP


# NetworkManager
mirar linux/NetworkManager.md


# Rutas estaticas
https://linuxconfig.org/how-to-add-new-static-route-on-rhel7-linux

/etc/sysconfig/network-scripts/route-enp0s3
15.15.0.0/24 via 10.1.1.110 dev enp0s3

