http://www.wains.be/pub/networking/tcpdump_advanced_filters.txt

Mostrar a que interfaz pertenece cada paquete
http://serverfault.com/questions/224698/how-to-display-interface-in-tcpdump-output-flow
Mirar anydump.sh


### USAR TSHARK ###

Tipica instruccion para escuchar en todas las interfaces quitando ssh, dns, arp y ntp
# tcpdump -nn -i any not port 22 and not arp and not port 53 and not port 123

No traducir hosts
# tcpdump -n ...

No traducir hosts y puertos (los puertos los sigue traduciendo)
# tcpdump -nn ...

Mostrar más información (TCP/UDP, flafs, checksum, etc)
# tcpdump -v ...

Muestra el tráfico en ASCII
# tcpdump -A port 80 

Por defecto se usa la interfaz eth0, para cambiarla:
# tcpdump -i wlan0 -A host 80.23.224.121

Filtrar por tcp flag (tcp-fin, tcp-syn, tcp-rst, tcp-push, tcp-act, tcp-urg):
'tcp[tcpflags] & tcp-push != 0'

Escuchar solo las peticiones entrantes al puerto 9080 en ascii, con ips y puertos con numeros y solo los paquetes PUSH (los que tienen datos):
tcpdump -Ann -i any 'dst port 9080 and tcp[tcpflags] & tcp-push != 0' 

Guardar la salida a un fichero
# tcpdump -w fichero

Guardar a fichero sin buffer, para poder ir leyéndolo con el wireshark en tiempo real
# tcpdump -w fichero -U

Leer de un fichero previamente guardado:
# tcpdump -r fichero host 1.2.3.4

# Ejemplo con logica
tcpdump 'gateway snup and (port ftp or ftp-data)'

Ver y guardar a fichero al mismo tiempo
# tcpdump -l | tee dat

Paquetes que entran/salen por eth1, por el puerto 4730 y desde la red 192.168/16
# tcpdump -i eth1 'dst port 4730 and src net 192.168'

# Puerto 4730, y que no sean de las maquinas HOST1 y HOST2
tcpdump 'dst port 4730 and not ((src host HOST1) or (src host HOST2))'

# Paquetes con destino UDP:68 en la interfaz eth1. Mostrando contenido
sudo tcpdump -i eth1 -A udp dst port 68

# Paquetes TFTP, mostrando contenido
sudo tcpdump -A udp port 69

# Filtrar por tráfico de salida, entrada o ambos (por defecto)
-Q in/out/inout
-P in/out/inout (versiones viejas)




Permitir a un no root ejecutar tcpdump:
http://www.stev.org/post/2012/01/19/Getting-tcpdump-to-run-as-non-root.aspx
setfacl -m u:adrian:rx /usr/sbin/tcpdump
setcap "CAP_NET_RAW+eip" /usr/sbin/tcpdump


Valores de los flags:
Flags [S.] -> SYN + ACK
P -> PSH
F -> FIN
S -> SYN
. -> ACK
