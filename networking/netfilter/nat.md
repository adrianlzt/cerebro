http://www.revsys.com/writings/quicktips/nat.html

Source NAT translates the source IP address, usually when connecting from a private IP address to a public one ("LAN to Internet").

Destination NAT translates the destination IP address, usually when connecting from a public IP to a private IP (aka port-forwarding, reverse NAT, expose host, "public server in LAN").



sysctl -w net.ipv4.ip_forward=1

Para hacerlo permanente:
/etc/sysctl.conf
net.ipv4.ip_forward = 1


internal network -> eth1
external network -> eth0

/sbin/iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
  todo lo que salga por eth0 va "enmascarado" (nateado)

/sbin/iptables -A FORWARD -i eth0 -o eth1 -m state --state RELATED,ESTABLISHED -j ACCEPT
  lo que entre desde la red externa hacia la red interna se acepta si la conexión ya estaba establecida

/sbin/iptables -A FORWARD -i eth1 -o eth0 -j ACCEPT
  aceptar todo desde la red interna hacia la red externa


http://linux-ip.net/html/nat-dnat.html
DNAT destination NAT

/sbin/iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
iptables -t nat -A PREROUTING -p tcp -i eth0 --dport 6378 -j DNAT --to-destination 10.0.0.235:6378
