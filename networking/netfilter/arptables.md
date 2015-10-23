http://linux-audit.com/filtering-arp-traffic-with-linux-arptables/

yum install arptables_jf


Como iptables pero para tráfico arp

Bloquear todo el trafico entrante proveniente de la MAC 00:50:56:a2:4f:4f
arptables -A IN -z 00:50:56:a2:4f:4f -j DROP

Parece que iptables tambien puede hacer algo, pero tiene menos opciones:
iptables -A INPUT -m mac --mac-source 00:50:56:a2:4f:4f -j DROP
