http://linux-audit.com/filtering-arp-traffic-with-linux-arptables/

yum install arptables


Como iptables pero para tráfico arp

Bloquear todo el trafico entrante proveniente de la MAC 00:50:56:a2:4f:4f
arptables -A INPUT -z 00:50:56:a2:4f:4f -j DROP

Bloquear las peticiones de una interfaz hacia una IP determinada (no me ha funcionado):
arptables -A INPUT -i enp1s0 -d 10.0.20.0/24 -j DROP


Parece que iptables tambien puede hacer algo, pero tiene menos opciones:
Creo que esto filtra por mac, pero no tiene pinta de filtrar arp.
iptables -A INPUT -m mac --mac-source 00:50:56:a2:4f:4f -j DROP
