http://www.revsys.com/writings/quicktips/nat.html

echo 1 > /proc/sys/net/ipv4/ip_forward

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
