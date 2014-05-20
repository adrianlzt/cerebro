Direcciones ip y MACs de las interfaces:
ip addr
ip a
  Info
    ip -4 -o a s eth1 <- nos muestra la IPv4 de la interfaz en una única linea junto más información
    ip -6 a <- IPv6

  Cambiar ip
    ip addr change 192.168.51.10 dev eth1

Rutas:
ip route
ip r
  Añadir ruta
    ip route add {NETWORK/MASK} via {GATEWAYIP}
    ip route add {NETWORK/MASK} dev {DEVICE}
    ip route add default {NETWORK/MASK} dev {DEVICE}
    ip route add default {NETWORK/MASK} via {GATEWAYIP}

  Cambiar ruta por defecto:
    ip r change default via 192.168.1.1 dev wlan1

  Salir por un alias determinado:
    ip addr add 192.168.198.228/21 dev eth1
    ip route add 192.168.251.51/32 dev eth1 src 192.168.198.228

  Mostrar rutas locales:
    ip route show table local

  Borrar rutas:
    ip r del 10.6.0.0/16 dev tun0  scope link


Ver cache de ip-mac
ip neigh
         STALE - The neighbour is valid, but is probably already unreachable, so the kernel will try to check it at the first transmission.
         DELAY - A packet has been sent to the stale neighbour and the kernel is waiting for confirmation.
         REACHABLE - The neighbour is valid and apparently reachable.

Meter entrada ARP
ip neigh add {IP-HERE} lladdr {MAC/LLADDRESS} dev {DEVICE} nud {STATE}

   neighbour state (nud)	meaning
   permanent			The neighbour entry is valid forever and can be only be removed administratively
   noarp			The neighbour entry is valid. No attempts to validate this entry will be made but it can be removed when its lifetime expires.
   stale			The neighbour entry is valid but suspicious. 
   				This option to ip neigh does not change the neighbour state if it was valid and the address is not changed by this command.
   reachable			The neighbour entry is valid until the reachability timeout expires.

Borrar una entrada:
ip neigh del {IPAddress} dev {DEVICE}

Borra cache:
ip neigh flush eth0


Definir IP / Agregar ip alias:
ip addr add 192.168.198.228/32 dev eth1
ip addr add 192.168.0.1/255.255.255.0 dev eth1

Asignar IP de broadcast (por defecto, ninguna)
ip addr add brd {ADDDRESS-HERE} dev {interface}

Para asignar la direc de brodcast, por defecto, en la misma linea:
ip addr add 192.168.1.50/24 brd + dev eth0 label eth0Home


Borrar ip/alias:
ip addr del 192.168.198.228/32 dev eth1

Borrar todas las ips de un rango de todas las interfaces
ip -s -s a f to 192.168.2.0/24
ip -4 addr flush label "ppp*"


Poner a up o down
ip link set dev {DEVICE} {up|down}
Mejor usar ifup o ifdown, que ejecutaran los scripts de red que tenga el SO


Transmission queue / http://www.cyberciti.biz/faq/gentoo-centos-rhel-debian-fedora-increasing-txqueuelen/
ip link set txqueuelen {NUMBER} dev {DEVICE}

MTU / http://www.cyberciti.biz/faq/centos-rhel-redhat-fedora-debian-linux-mtu-size/
ip link set mtu {NUMBER} dev {DEVICE}




Interfaces 
ip link / ip l
ip link ls up <- interfaces lenvantadas

# http://www.cyberciti.biz/faq/linux-ip-command-examples-usage-syntax/ #
ip OBJECT help

ip -s -s ... <- muestra más información


Object		Abbreviated form	Purpose
link		l			Network device.
address		a addr			Protocol (IP or IPv6) address on a device.
addrlabel	addrl			Label configuration for protocol address selection.
neighbour	n neigh			ARP or NDISC cache entry.
route		r			Routing table entry.
rule		ru			Rule in routing policy database.
maddress	m maddr			Multicast address.
mroute		mr			Multicast routing cache entry.
tunnel		t			Tunnel over IP.
xfrm		x			Framework for IPsec protocol.
