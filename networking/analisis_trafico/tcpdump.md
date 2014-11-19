http://www.wains.be/pub/networking/tcpdump_advanced_filters.txt

### USAR TSHARK ###


Muestra el tráfico en ASCII
# tcpdump -A port 80 

Por defecto se usa la interfaz eth0, para cambiarla:
# tcpdump -i wlan0 -A host 80.23.224.121

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




Permitir a un no root ejecutar tcpdump:
http://www.stev.org/post/2012/01/19/Getting-tcpdump-to-run-as-non-root.aspx
groupadd tcpdump
addgroup <username> tcpdump // usermod -a -G tcpdump <username>
chown root.tcpdump /usr/sbin/tcpdump
chmod 0750 tcpdump
setcap "CAP_NET_RAW+eip" /usr/sbin/tcpdump


Valores de los flags:
Flags [S.] -> SYN + ACK
P -> PSH
F -> FIN
S -> SYN
. -> ACK
