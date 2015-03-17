mirar backlog.md
mirar syn_cookies.md
mirar syn_cookies-exploration-lab.html


Cuando un cliente manda un SYN al server, este reserva un poco de memoria para almacenar información sobre este paquete SYN, contesta con un paquete SYN+ACK y se pone a la espera de un paquete ACK del cliente. Si no recibe ACK reintenta enviando SYN+ACK un número de veces para finalmente desistir y borrar la información sobre el paquete SYN.

El ataque se basa en hacer miles de peticiones SYN, llenando la cola que el sistema dispone para ese puerto y rechazando cualquier intento de conexión legítimo.


Realizar ataque:
http://lamiradadelreplicante.com/2012/01/24/ataque-ddos-syn-flood-con-hping3/

Necesario bloquear el envio de paquetes RST por parte del sistema operativo (lo hace al haber enviando hping paquetes SYN y cerrar el socket)
sudo iptables -A OUTPUT -p tcp --tcp-flags ALL RST -d 192.168.33.10 --dport 9999 -j DROP

sudo hping3 -p 9999 -S --fast 192.168.33.10



Simulacion de un ataque sin syn cookies:

# sysctl -a | grep -e max_syn -e cook
net.ipv4.tcp_syncookies = 0
net.ipv4.tcp_max_syn_backlog = 1

Si enviamos dos peticiones SYN, pero no contestamos con ACK, llenamos la cola.
Una tercera petición se quedará en estado SYN_SENT (en el lado cliente). En el lado servidor no llegará nada.



Simulación de ataque con syn cookies:

# sysctl -a | grep -e max_syn -e cook
net.ipv4.tcp_syncookies = 1
net.ipv4.tcp_max_syn_backlog = 1

Conectamos 4 atacantes, que han enviando un paquete SYN sin enviar ACK.
ss nos muestra cuatro conexiones en la cola SYN-RECV
La DIFERENCIA es que ahora si conectamos un cliente, este llegará a la cola ESTAB sin problemas y podrá ser procesado por el servidor.
