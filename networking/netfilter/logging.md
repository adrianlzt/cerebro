http://www.toastresearch.com/2011/04/09/packet-logging-with-iptables/

La cadena LOG envia las trazas al logging del sistema.
Si tenemos systemctl veremos estos logs en:
journalctl -t kernel -f


iptables -t nat -I PREROUTING 1 -p tcp --dport 443 -j LOG

Loguea los paquetes hacia la ip 192.168.157.3
iptables -I OUTPUT -p tcp -d 192.168.157.3 -j LOG

Loguea los paquetes de reset (tienen flags RST,ACK) que vienen de 192.168.157.3
iptables -I INPUT -p tcp --tcp-flags ALL RST,ACK -s 192.168.157.3 -j LOG

Podemos poner un prefijo:
--log-prefix "iptables accept "

Más opciones para sacar por el log:
--log-uid
--log-tcp-sequence
--log-tcp-options
--log-ip-options 


--limit 5/min
  sets the number of times to log the same rule to syslog

--log-prefix "Denied..."
  adds a prefix to make finding in the syslog easier

--log-level 7
sets the syslog level to informational (see man syslog for more detail, but you can probably leave this)


Today I was trying to track down some processes that were making very odd DNS lookups. I isolated the user ID making these calls via iptables logging:
iptables -I OUTPUT 1 -m string --string "BADZONE" -d 127.0.0.1 -p udp --destination-port 53 --algo bm -j LOG --log-uid --log-prefix "BADZONE: "



Mirar que paquetes estan cruzando la regla:
iptables -L -v
iptables -L -v -Z -n -x
  -Z: muestra el número de paquetes y luego resetea el contador a 0
  -n: no hace resolución inversa de dns
  -x: muestra el tamaño de los paquetes que han atravesado la regla



Trazas de ejemplo

nat-PREROUTING
IN=eno1 OUT= MAC=ec:9a:74:f7:ac:f1:00:15:c7:8b:b4:00:08:00 SRC=158.85.224.176 DST=10.95.194.221 LEN=95 TOS=0x00 PREC=0x20 TTL=43 ID=34216 DF PROTO=TCP SPT=443 DPT=47998 WINDOW=16386 RES=0x00 ACK PSH URGP=0 

