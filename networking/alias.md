# http://www.faqs.org/docs/Linux-mini/IP-Alias.html

Para tener varias ips asignadas a un mismo interfaz:
IPs virtuales

ifconfig eth0:0 10.0.0.3
ifconfig eth0:1 192.168.0.130
...

ip addr add 192.168.198.228 dev eth1:1

Para borrar:
ip addr del 192.168.198.228/32 dev eth1:1
