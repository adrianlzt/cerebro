snmpwalk -v 1 -c public 10.6.6.34 .1.3.6.1


snmpwalk -On -v 1 -c public 10.5.2.4 .1.3.6.1.2.1.25.4.2.1.5
-On -> mostrar los números de los MIBS
-v 1 -> seleccionar snmp versión 1
-c public -> ponemos la “comunidad” que vamos a usar (es algo asi como la contraseña para poder hacer las peticiones)
Snmpwalk nos muestra todos los mibs que cuadren (‘navega por los mibs’)
Snmpget nos muestra solo el que solicitamos.
Para convertir los MIBS numéricos, a nombres, en debían, instalamos snmp-mibs-downloader, y comentamos la línea “mibs :” en /etc/snmp/snmp.conf
Directorios donde hay MIBS: /usr/share/mibs/netsnmp  y  /var/lib/mibs
