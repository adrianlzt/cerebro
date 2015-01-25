Tirar paquetes entrantes al puerto 80/TCP
iptables -A INPUT -p tcp --dport 80 -j DROP

Tirar paquetes entrantes al puerto 53/UDP de la IP 192.168.0.5 por la interfaz eth0
iptables -A INPUT -i eth0 -p udp --dport 53 -s 192.168.0.5 -j DROP


Source port
--sport

Destination ip
-d IP
