Tirar paquetes entrantes al puerto 80/TCP
iptables -A INPUT -p tcp --dport 80 -j DROP

Tirar paquetes entrantes al puerto 53/UDP de la IP 192.168.0.5 por la interfaz eth0
iptables -A INPUT -i eth0 -p udp --dport 53 -s 192.168.0.5 -j DROP



Source port
--sport

Destination ip
-d IP

Tirar paquetes salientes hacia 104.154.19.111:443
iptables -A OUTPUT -p tcp --dport 443 -d 104.154.19.111 -j DROP


No permitir conexiones desde el host 192.168.0.5:
iptables -A INPUT -s 192.168.0.5 -j DROP


Abrir ssh a una ip y cerrar para el resto (primero se pone el drop, que irá pasando a posiciónes mayores, por lo tanto que se procesen despues)
iptables -I INPUT -p tcp -s 0.0.0.0/0 --dport 22 -j DROP
iptables -I INPUT -p tcp -s 10.1.1.2 --dport 22 -j ACCEPT




-j DROP
-j REJECT
As a general rule, use REJECT when you want the other end to know the port is unreachable' use DROP for connections to hosts you don't want people to see.
http://serverfault.com/questions/157375/reject-vs-drop-when-using-iptables


Si queremos que una máquina (con MAC 00:50:56:a2:4f:4f) ni si quiera pueda obtener nuestra IP mediante una peticion ARP:
arptables -A IN -z 00:50:56:a2:4f:4f -j DROP
