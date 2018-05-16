snmpwalk -v 2c -c COMMUNITY DIRECIP iftable

snmpwalk -v 1 -c public 10.6.6.34 .1.3.6.1


snmpwalk -On -v 1 -c public 10.5.2.4 .1.3.6.1.2.1.25.4.2.1.5
-On -> mostrar los números de los MIBS
-v 1 -> seleccionar snmp versión 1
-c public -> ponemos la “comunidad” que vamos a usar (es algo asi como la contraseña para poder hacer las peticiones)

-r 1 -> solo intentar una vez (por defecto son 5)


Snmpwalk nos muestra todos los mibs que cuadren (‘navega por los mibs’)
Snmpget nos muestra solo el que solicitamos.
Para convertir los MIBS numéricos, a nombres, en debían, instalamos snmp-mibs-downloader, y comentamos la línea “mibs :” en /etc/snmp/snmp.conf
Directorios donde hay MIBS: /usr/share/mibs/netsnmp  y  /var/lib/mibs


Si se pone mal la community la respuesta será (tanto para v1 como v2c):
Timeout: No Response from xx.xx.xx.xx

Podemos probar con v3 para ver si llegamos.


# V3
snmpwalk -v 3 -l authPriv -u USER -a SHA -A "PASSWORD1" -On 80.90.100.101 .1.3.6.1.2.1.2.2.1.2.1

El servidor contesta con errores si algo está mal.
Parece que puede servir para probar si llegamos al server


Más debug:
snmpwalk -Dusm -v 3 -l authPriv -u USER -a SHA -A "PASSWORD1" -On 80.90.100.101 .1.3.6.1.2.1.2.2.1.2.1
