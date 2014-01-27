cloudshark -> analisis online


Permitir a un no-root capturar

dpkg-reconfigure wireshark-common
Y permitir a non-root capturar paquetes.
Y para definir que usuarios pueden, hay que añadirles al grupo wireshark:
# adduser <usuario> wireshark


dumpcap, similar a tcpdump
dumpcap -f "port 25" -w -


Ver captura remota
http://wiki.wireshark.org/CaptureSetup/Pipes
$ wireshark -k -i <(ssh hostname dumpcap -w -)
Mirar el tcpdump.md para ver como dar permisos a un usuario normal a ejecutar dumpcap

Si no podemos hacer ssh como root tendremos que permitir a un usuario normal tener permisos para capturar con dumpcap


Filtrar por fecha:
frame.time <= "2013-09-11 10:35:20.000697"



## Mate ##
http://wiki.wireshark.org/Mate
MATE's goal is to enable users to filter frames based on information extracted from related frames or information on how frames relate to each other. MATE was written to help troubleshooting gateways and other systems where a "use" involves more protocols. However MATE can be used as well to analyze other issues regarding a interaction between packets like response times, incompleteness of transactions, presence/absence of certain attributes in a group of PDUs and more.

Para cargar un fichero de configuración de MATE: Edit -> Preferences -> Protocols -> MATE -> Configuration filename

Usamos por ejemplo el de ejemplo para sesiones TCP: http://wiki.wireshark.org/Mate/GettingStarted?action=AttachFile&do=get&target=tcp.mate
Lo he dejado tambien en este directorio con el nombre: wireshask-tcp.mate

Ahora si siltramos por: mate.tcp_ses.NumOfPdus == 3
Estamos consiguiendo sacar las sesiones tcp que estén compuestas por tres paquetes.
