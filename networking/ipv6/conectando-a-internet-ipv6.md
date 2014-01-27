http://www.tunnelbroker.net/

En esa web me ofrecen un tunel gratuito para salir a la internet ipv6.

Al tener una ip dinámica no se que pasara :/

Comandos en mi ordenador:
modprobe ipv6
ip tunnel add he-ipv6 mode sit remote 216.66.84.42 local 83.35.58.78 ttl 255
ip link set he-ipv6 up
ip addr add 2001:470:1f12:1160::2/64 dev he-ipv6
ip route add ::/0 dev he-ipv6
ip -f inet6 addr


Al estar tras el NAT, cambiar la ip 83... por mi ip local.
