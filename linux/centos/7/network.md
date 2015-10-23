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
