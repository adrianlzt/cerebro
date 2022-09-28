cloudshark -> analisis online
30 day free trial
~/priv-adrianRepo/networking/analisis_trafico/MASTERING_WIRESHARK.pdf

Referencia con todos los filtros
https://www.wireshark.org/docs/dfref/#section_t

https://github.com/gcla/termshark wireshark con ncurses

Permitir a un no-root capturar

dpkg-reconfigure wireshark-common
Y permitir a non-root capturar paquetes.
Y para definir que usuarios pueden, hay que añadirles al grupo wireshark:
sudo gpasswd -a USUARIO wireshark

Instalacion dumpcap:
Ubuntu:
apt-get install wireshark-common

CentOS:
yum install wireshark

Arch:
pacman -S wireshark-gtk


dumpcap, similar a tcpdump
dumpcap -f "port 25" -w -


Ver captura remota
http://wiki.wireshark.org/CaptureSetup/Pipes
https://www.wireshark.org/docs/man-pages/sshdump.html
wireshark -k -i <(ssh compaq "dumpcap -P -w - -i any -f 'not tcp port 22'")
wireshark-gtk -k -i <(ssh REMOTEHOST "/usr/sbin/tcpdump -w - -i enp4s0f1")

Para usar dumpcap:
apt-get install wireshark-common

Si no podemos hacer ssh como root tendremos que permitir a un usuario normal tener permisos para capturar con dumpcap
setfacl -m u:adrian:rx /usr/sbin/tcpdump
  dar permisos de ejecución a un usuario en particular (no necesario si others ya tiene +x)
setcap "CAP_NET_RAW+eip" /usr/sbin/tcpdump
  permitimos al binario leer los paquetes de red, sin verificar el usuario que lo ejecuta

Para quitar la capability:
setcap -r /usr/sbin/tcpdump

## Merge
https://www.wireshark.org/docs/wsug_html_chunked/ChIOMergeSection.html
Ver dos capturas al mismo tiempo.
Útil si hemos capturado en origen y destino.


## Mate ##
http://wiki.wireshark.org/Mate
MATE's goal is to enable users to filter frames based on information extracted from related frames or information on how frames relate to each other. MATE was written to help troubleshooting gateways and other systems where a "use" involves more protocols. However MATE can be used as well to analyze other issues regarding a interaction between packets like response times, incompleteness of transactions, presence/absence of certain attributes in a group of PDUs and more.

Para cargar un fichero de configuración de MATE: Edit -> Preferences -> Protocols -> MATE -> Configuration filename

Usamos por ejemplo el de ejemplo para sesiones TCP: http://wiki.wireshark.org/Mate/GettingStarted?action=AttachFile&do=get&target=tcp.mate
Lo he dejado tambien en este directorio con el nombre: wireshask-tcp.mate

Ahora si siltramos por: mate.tcp_ses.NumOfPdus == 3
Estamos consiguiendo sacar las sesiones tcp que estén compuestas por tres paquetes.


## Problemas análisis falso checksum ##
Si wireshark nos dice que el checksum de un paquete de salida es incorrecto es porque estamos capturando el paquete entre el nivel 2 y el nivel 1, y el checksum se calcula en la tarjeta de red, por lo tanto aún no está generado y por eso falla.


# HTTP/2.0
https://bugs.wireshark.org/bugzilla/show_bug.cgi?id=9042



# Paquetes de muestra
https://wiki.wireshark.org/SampleCaptures#Other_Sources_of_Capture_Files




# Filtros / condicionales
https://www.wireshark.org/docs/man-pages/wireshark-filter.html
https://www.wireshark.org/docs/wsug_html_chunked/ChWorkBuildDisplayFilterSection.html

Filtrar por fecha:
frame.time <= "2013-09-11 10:35:20.000697"


    eq, ==    Equal
    ne, !=    Not Equal
    gt, >     Greater Than
    lt, <     Less Than
    ge, >=    Greater than or Equal to
    le, <=    Less than or Equal to

    contains     Does the protocol, field or slice contain a value
    matches, ~   Does the protocol or text string match the given case-insensitive Perl-compatible regular expression


tcp.time_relative > 3
tiempo entre el paquete y el primero de su frame mayor a 3"



# Visualización / columnas
https://unit42.paloaltonetworks.com/unit42-customizing-wireshark-changing-column-display/

Podemos añadir un campo cualquier como columna custom, picharle con el botón derecho.


# tshark
Leer ficheros con la cli y aplicar filtros:
tshark -r 2020-05-25_11:49:13.pcap -Y '(mysql.command == 22) && !(mysql.query contains "SELECT")'



# USB
https://wiki.wireshark.org/CaptureSetup/USB

sudo modprobe usbmon

lsusb para ver que usbmonX mirar
usbmon0 es como el "any" para usb

En Source/Destination se usa BUS.DEVICE.N
Bus y Device lo vemos en lsusb. El tercer número no se que es.


Si conectamos el USB a una windows via virtualbox, seguiremos viendo el dispositivo en el mismo puerto.
