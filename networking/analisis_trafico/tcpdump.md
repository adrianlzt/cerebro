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



Permitir a un no root ejecutar tcpdump:
http://www.stev.org/post/2012/01/19/Getting-tcpdump-to-run-as-non-root.aspx
groupadd tcpdump
addgroup <username> tcpdump // usermod -a -G tcpdump <username>
chown root.tcpdump /usr/sbin/tcpdump
chmod 0750 tcpdump
setcap "CAP_NET_RAW+eip" /usr/sbin/tcpdump
