https://serverfault.com/a/823145

Redireccionar tráfico saliente a otro sitio

iptables -t nat -A OUTPUT -m addrtype --src-type LOCAL --dst-type LOCAL -p tcp --dport 3306 -j DNAT --to-destination ip.ip.ip.ip
iptables -t nat -A POSTROUTING -m addrtype --src-type LOCAL --dst-type UNICAST -j MASQUERADE

sysctl -w net.ipv4.conf.all.route_localnet=1


Ejemplo:
Si ponemos el puerto a 80 y la ip a 1.1.1.1, cuando hagamos "curl localhost" enviará la petición a 1.1.1.1
