http://linux-ip.net/html/tools-ip-route.html

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
  Mirar porque ruta salimos a una determinada IP:
    ip route get <ip>
  
  Añadir ruta
    ip route add {NETWORK/MASK} via {GATEWAYIP}
    ip route add {NETWORK/MASK} dev {DEVICE}
    ip route add default dev {DEVICE}
    ip route add default via {GATEWAYIP}

  Cambiar ruta por defecto:
    ip r change default via 192.168.1.1 dev wlan1

  Salir por un alias determinado:
    ip addr add 192.168.198.228/21 dev eth1
    ip route add 192.168.251.51/32 dev eth1 src 192.168.198.228
    ip route add 81.45.59.58/32 via 192.168.1.1 dev wlan1
      ir a la ip 81.45.59.58 a través de la puerta de enlace 192.168.1.1 a la que llegamos a través de la interfaz wlan1
    ip route change default via 192.168.2.1 via eth1

  Mostrar por que ruta vamos a salir
    ip route get 10.4.5.2
    ip -s route get 127.0.0.1/32
      esto es un "truco" para actualizar las rutas para una subred entera

  Mostrar rutas locales:
    ip route show table local

  Mostrar cache de rutas
    ip route show cache
    ip route show cache 10.4.5.2

  Borrar rutas:
    ip r del 10.6.0.0/16 dev tun0  scope link

  Prohibir ruta:
    ip route add prohibit 209.10.26.51

  Rutas con tablas:
    crear tabla 'hof'
      echo 1 hof >> /etc/iproute2/rt_tables

    meter una ruta
      ip route add default via 192.168.1.1 dev wlo1 table hof

    mostrar rutas
      ip route list table hof

Ver estadísticas paquetes (sent, dropped, etc)
ip -s link show



Ver cache de ip-mac
ip neigh
         STALE - The neighbour is valid, but is probably already unreachable, so the kernel will try to check it at the first transmission.
         DELAY - A packet has been sent to the stale neighbour and the kernel is waiting for confirmation.
         REACHABLE - The neighbour is valid and apparently reachable.
         FAILED - No consigue la MAC, o la hemos marcado para flush

Meter entrada ARP
ip n add {IP-HERE} lladdr {MAC/LLADDRESS} dev {DEVICE} nud {STATE}

   neighbour state (nud)	meaning
   permanent			The neighbour entry is valid forever and can be only be removed administratively
   noarp			The neighbour entry is valid. No attempts to validate this entry will be made but it can be removed when its lifetime expires.
   stale			The neighbour entry is valid but suspicious. 
   				This option to ip neigh does not change the neighbour state if it was valid and the address is not changed by this command.
   reachable			The neighbour entry is valid until the reachability timeout expires.

Borrar una entrada:
ip n del {IPAddress} dev {DEVICE}

Borra cache:
ip n flush dev eth0

ip n flush 10.95.168.220 dev eth0


Definir IP / Agregar ip alias:
ip a a 10.0.2.16/24 dev enp5s0f1 label enp5s0f1:1

Otro ejemplo:
ip addr add 192.168.198.228/32 dev eth1
ip addr add 192.168.0.1/255.255.255.0 dev eth1
ip addr add 192.168.56.151/24 broadcast 192.168.56.255 dev eth0 label eth0:1


Crear una interfaz virtual con diferente MAC (MAC-VLAN virtual interface), backed by eth0:
ip link add dev macvlan0 link eth0 type macvlan

Borrarla:
ip link delete dev macvlan0


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
ip l set eth1 down

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


# Tun / Tap
Mirar tap.md


# Namespaces
Una interfaz de red solo puede estar en un Namespace al mismo tiempo

lsns -t net
sudo lsns -t net --output-all

ip netns list
  listar namespaces, no me saca nada (arch dic'2020)

ip netns add NOMBRE
  crear namespace

ip netns exec NOMBRE COMANDO
  ejecutar comando como si estuviesemos en el NS NOMBRE
  ej.: ip netns exec virtual1 ip a

ip link add eth1 type veth peer name veth1
  creamos dos interfaces virtuales conectadas entre si (como si estuviesen unidas por un cable directo)

ip link set eth1 netns NOMBRE
  movemos una de las dos interfaces creadas antes al nuevo namespace

ip l set veth2 up
  activamos la interfaz creada


# Errores

Añadiendo una nueva ruta
RTNETLINK answers: Invalid argument
Mirar que estamos metiendo correctamente la network. Usar ipcal.
https://access.redhat.com/solutions/37921


# Monitor
ip -o monitor address
Nos saca trazas cada vez que se produce un cambio de las addresses.
Ejemplo:
Deleted 3: wlo1    inet6 fe80::76de:2bff:feef:5b71/64 scope link \       valid_lft forever preferred_lft forever
Deleted 3: wlo1    inet 192.168.1.128/24 brd 192.168.1.255 scope global dynamic wlo1\       valid_lft 59961sec preferred_lft 59961sec


Con timestamp:
$ ip -o -t monitor a
Timestamp: Mon Nov  2 16:13:33 2015 307215 usec
3: wlo1    inet 10.95.228.89/22 brd 10.95.231.255 scope global dynamic wlo1\       valid_lft 3605sec preferred_lft 3605sec
Timestamp: Mon Nov  2 16:13:33 2015 702189 usec
3: wlo1    inet6 fe80::76de:2bff:feef:5b71/64 scope link \       valid_lft forever preferred_lft forever
Timestamp: Mon Nov  2 16:13:33 2015 705077 usec
3: wlo1    inet6 fe80::76de:2bff:feef:5b71/64 scope link \       valid_lft forever preferred_lft forever


# Blackhole
Crear rutas blackhole para dropear ciertas IPs:
http://www.cyberciti.biz/tips/how-do-i-drop-or-block-attackers-ip-with-null-routes.html
ip route add blackhole 202.54.5.2/29
ip route add blackhole from 202.54.1.2
ip rule add blackhole to 10.18.16.1/29
ip route
