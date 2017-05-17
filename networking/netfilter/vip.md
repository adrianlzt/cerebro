Como usar iptables para hacer una VIP que haga round-robin sobre una serie de nodos.
Vamos a hacer un ejemplo creando una VIP que enrute las peticiones a 8080/TCP a tres sitios distintos:
 99.73.32.195 (eth0.me) (contesta con nuestra ip)
 93.184.216.34 (example.com) (contesta con un 404)
 50.19.95.187 (httpbin.org) (contesta con un error de heroku)


Muestra redirigiendo a un único nodo:
Creamos una "chain" nueva (VIP):
iptables -t nat -N VIP
Esta chain envía el tráfico a eth0.me:
iptables -t nat -A VIP -p tcp -j DNAT --to-destination 99.73.32.195:80
Si atacamos a la VIP que hemos elegido (172.39.99.111) al puerto 8080, nos envía a la chain VIP, que nos envía a eth0.me
iptables -t nat -A OUTPUT -d 172.39.99.111/32 -p tcp -m tcp --dport 8080 -j VIP



Redirigiendo a los tres nodos:
iptables -t nat -N VIP1
iptables -t nat -A VIP1 -p tcp -j DNAT --to-destination 99.73.32.195:80
iptables -t nat -N VIP2
iptables -t nat -A VIP2 -p tcp -j DNAT --to-destination 93.184.216.34:80
iptables -t nat -N VIP3
iptables -t nat -A VIP3 -p tcp -j DNAT --to-destination 50.19.95.187:80

iptables -t nat -A OUTPUT -d 172.39.99.111/32 -p tcp -m tcp --dport 8080 -m statistic --mode random --probability 0.3333 -j VIP1
iptables -t nat -A OUTPUT -d 172.39.99.111/32 -p tcp -m tcp --dport 8080 -m statistic --mode random --probability 0.5 -j VIP2
iptables -t nat -A OUTPUT -d 172.39.99.111/32 -p tcp -m tcp --dport 8080 -j VIP3


