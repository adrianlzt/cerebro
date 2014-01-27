iptables -t nat -I PREROUTING 1 -p tcp --dport 443 -j LOG

Loguea los paquetes hacia la ip 192.168.157.3
iptables -I OUTPUT -p tcp -d 192.168.157.3 -j LOG

Loguea los paquetes de reset (tienen flags RST,ACK) que vienen de 192.168.157.3
iptables -I INPUT -p tcp --tcp-flags ALL RST,ACK -s 192.168.157.3 -j LOG


Today I was trying to track down some processes that were making very odd DNS lookups. I isolated the user ID making these calls via iptables logging:
iptables -I OUTPUT 1 -m string --string "BADZONE" -d 127.0.0.1 -p udp --destination-port 53 --algo bm -j LOG --log-uid --log-prefix "BADZONE: "


Mirar que paquetes estan cruzando la regla:
iptables -L -v
iptables -L -v -Z -n -x
  -Z: muestra el número de paquetes y luego resetea el contador a 0
  -n: no hace resolución inversa de dns
  -x: muestra el tamaño de los paquetes que han atravesado la regla
