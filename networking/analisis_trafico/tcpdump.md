http://www.wains.be/pub/networking/tcpdump_advanced_filters.txt

Mirar ngrep para filtrar buscando cadenas de texto (en general, como un grep para network).

CUIDADO con ejecutarlo sobre interfaces 10GbE+, causa mucho overhead.
BPF puede hacerlo más eficientemente. Hay ejemplos para analizar casos particulares (como retransmisiones TCP)

Si queremos mapear a que PID pertenece una conexión seguramente podamos hacerlo con iptables.

Mostrar a que interfaz pertenece cada paquete
http://serverfault.com/questions/224698/how-to-display-interface-in-tcpdump-output-flow
Mirar anydump.sh


Otra opcion a tcpdump es tshark

Cotainer en docker que captura todo el trafico:
docker run --rm --net=host crccheck/tcpdump -lnni any
docker run -v ~/pcap:/pcap --net=host -d jgamblin/tcpdump


Si queremos filtrar de una forma más extensa mirar ngrep.md

Capturar todo el tráfico en ficheros, cada uno almacenando 15':
tcpdump -G 900 -w '%Y-%m-%d_%H:%M:%S.pcap' -W 96
  -W cuantos ficheros en total rotaremos
  Solo se rotan ficheros cuando hay tráfico
  No quiere decir que tcpdump solo vaya a estar ejecutándose 96 * 15'
  Quiere decir, que si recibimos un paquete cada 15', cuando lo haya hecho 96 veces se detendrá
  CUIDADO parece que en RHEL/Fedora bajo ciertas circunstancias los ficheros pcap al usar esto se escriben con tcpdump, por lo que tal vez no tengamos permisos. Chequear antes de dejar corriendo que es capaz de generar ficheros rotados
  https://github.com/the-tcpdump-group/tcpdump/issues/448


Tipica instruccion para escuchar en todas las interfaces quitando ssh, dns, arp y ntp
# tcpdump -nn -i any not port 22 and not arp and not port 53 and not port 123

No traducir hosts
# tcpdump -n ...

No traducir hosts y puertos (los puertos los sigue traduciendo)
# tcpdump -nn ...

Mostrar más información (TCP/UDP, flafs, checksum, etc)
# tcpdump -v ...

Mostrar las direcciones mac
tcpdump -e

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

# Mostrar la captura mientras la almacenamos en un fichero binario
tcpdump -i eth0 -U -w - port 4739 | tee ipfix.cap | tcpdump -r - -nn

Leer de un fichero previamente guardado:
# tcpdump -r fichero host 1.2.3.4

# Ejemplo con logica
tcpdump 'gateway snup and (port ftp or ftp-data)'

Ver y guardar a fichero al mismo tiempo (pero no el formato bueno, solo el texto)
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
  dar permisos de ejecución a un usuario en particular (no necesario si others ya tiene +x)
setcap "CAP_NET_RAW+eip" /usr/sbin/tcpdump
  permitimos al binario leer los paquetes de red, sin verificar el usuario que lo ejecuta

Para quitar la capability:
setcap -r /usr/sbin/tcpdump


Valores de los flags:
Flags [S.] -> SYN + ACK
P -> PSH
F -> FIN
S -> SYN
. -> ACK



# Replay un paquete .cap
https://tcpreplay.appneta.com/
pacman -Ss tcpreplay

Parece que esta app está más pensada para que el tráfico recorra routers, switches, firewalls, etc.
Pero no para servidores y apps finales.

tcpliveplay to replay TCP pcap files directly to servers. Use this utility if you want to test the entire network stack and into the application.
Tampoco consigo que me funcione, envía un RST tras SYN + SYN/ACK

Mirar gor.md


## Capturar el trafico
Para guardar el trafico NO usar "-i any". Esto genera unos paquetes raros a nivel 2 que no son compatibles.
tcpdump -i eth0 -w fichero.cap filtro

## Preparacíón
Generalmente lo primero que haremos será usar tcpprep para distinguir de que tipo es cada paquete (cliente -> servidor o al reves).
Esto luego nos servira para reescribir partes de los paquetes e inteligentemente poner la mac del router siempre en los paquetes del router.

tcpprep -a bridge -i ipfix.cap -o ipfix.cache


## Rewrite
Con tcprewrite podemos modificar los paquetes para modificar, por ejemplo, sus MACs de origen y destino.

Cambiando MAC de origen (smac) y de destino (dmac)
tcprewrite --enet-dmac=00:55:22:AF:C6:37 --enet-smac=00:44:66:FC:29:AF --infile=input.pcap --outfile=output.pcap
  si queremos usar cache (de tcprep): --cachefile=input.cache

Cambiando IPs:
tcprewrite --endpoints=10.10.1.1:10.10.1.2 --cachefile=input.cache --infile=input.pcap --outfile=output.pcap --skipbroadcast
  con el tcpprep (que era solo un cliente enviando paquetes UDP), me ha puesto la ip 10.10.1.2 como origen y la otra como destino




tcpreplay -i INTERFAZ paquete.cap

Parece que cuando se hace un replay tampoco se lleva bien con "tcpdump -i any"


## tcpliveplay
http://tcpreplay.appneta.com/wiki/tcpliveplay
https://tcpreplay.appneta.com/wiki/tcpliveplay-man.html
Replays network traffic stored in a pcap file on live networks using new TCP connections

Hace falta meter una regla de iptables para evitar que se envien unos paquetes RST
sudo iptables -A OUTPUT -p tcp --tcp-flags RST RST -s <your ip> -d <dst ip> --dport <dst port, example 80 or 23 etc.> -j DROP

tcpliveplay eth0 curl.cap 10.20.20.38 fa:16:3e:67:86:23 random
  la ip es la de destino
  la MAC también la de destino
