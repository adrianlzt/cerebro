# VPN con docker
http://www.jorgefaba.com/2016/08/montar-una-vpn-en-tu-servidor-usando-un.html
https://hub.docker.com/r/kylemanna/openvpn/~/dockerfile/




Si tengo problemas con la VPN, que se cae al transferir algún fichero (scp o sftp) cambiar el MTU.
ifconfig vpn0 mtu 600

Explicación del problema: http://serverfault.com/questions/376752/what-exactly-is-the-mtu-mru-issue-what-it-is-caused-by-and-how-to-fix-it

MTU es la unidad máxima de transferencia que puede transportar un protocolo.
En el caso de Ethernet, la configuración típica es de 1500 bytes. (http://wiki.wireshark.org/Ethernet?action=show&redirect=Protocols%2Feth)
El paquete Ethernet más grande completo son 1500 + 14 bytes de cabecera.
IP, 1480 + 20 bytes de cabecera.
ICMP, 1472 + 8 de cabecera (el tiemstamp se cuenta dentro del payload de ICMP).
Cuando definimos el tamaño de un paquete de ping (-s), estamos definiendo el tamaño del paquete ICMP (le sumaremos 28 para conocer el payload de ethernet)

Diagnosticando el problema:

1.- Hacer ping -c 2 -s 1472 -D google.com
Debe funcionar correctamente, o devolver un mensaje de necesidad de fragmentar, y el segundo paquete contestar correctamente.
[1365459336.334162] From 87.Red-83-32-31.dynamicIP.rima-tde.net (83.32.31.87) icmp_seq=1 Frag needed and DF set (mtu = 1492)

El nodo que no pueda transmitir ese paquete tan grande nos dice cual es el máximo mtu con el que podemos transmitir.

2.- Miramos a ver que salto es el que da problemas: traceroute -F google.es 1500
En este caso, el paquete que definamos a traceroute será el tamaño del paquete IP, por lo tanto el MTU de ethernet.

