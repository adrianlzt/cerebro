snmpbulkwalk -v 2c -c COMMUNITY DIRECIP .1
  con bulk se hacen las queries de manera más eficiente
  podemos dejar en blanco la iftable para obtener todo el arbol
  si no ponemos parámetro (.1 en este ejemplo) solo escaneará .iso.org.dod.internet.mgmt.mib-2 (SNMPv2-SMI::mib-2) y lo que tenga por debajo


snmpwalk -v 2c -c COMMUNITY DIRECIP iftable

snmpwalk -v 1 -c public 10.6.6.34 .1.3.6.1


snmpwalk -On -v 1 -c public 10.5.2.4 .1.3.6.1.2.1.25.4.2.1.5
-On -> mostrar los números de los MIBS
-Of -> mostrar el oid completo: .iso.org.dod.internet.mgmt.mib-2....
-v 1 -> seleccionar snmp versión 1
-c public -> ponemos la “comunidad” que vamos a usar (es algo asi como la contraseña para poder hacer las peticiones)

-r 1 -> solo intentar una vez (por defecto son 5)


Snmpwalk nos muestra todos los mibs que cuadren (‘navega por los mibs’)
Snmpget nos muestra solo el que solicitamos.
Para convertir los MIBS numéricos, a nombres, bajar las mibs, mirar en mibs.md


Si se pone mal la community la respuesta será (tanto para v1 como v2c):
Timeout: No Response from xx.xx.xx.xx

Podemos probar con v3 para ver si llegamos.


# V3
snmpwalk -v 3 -l authPriv -u USER -a SHA -A "PASSWORD1" -On 80.90.100.101 .1.3.6.1.2.1.2.2.1.2.1

El servidor contesta con errores si algo está mal.
Parece que puede servir para probar si llegamos al server

Security levels (-l):
  noAuthnoPriv - Communication without authentication and privacy.
  authNoPriv - Communication with authentication and without privacy. The protocols used for Authentication are MD5 and SHA (Secure Hash Algorithm).
  authPriv - Communication with authentication and privacy. The protocols used for Authentication are MD5 and SHA.
             For Privacy, DES (Data Encryption Standard) and AES (Advanced Encryption Standard) protocols can be used


Más debug:
snmpwalk -Dusm -v 3 -l authPriv -u USER -a MD5 -A "PASSWORD" -a SHA -A "PASSWORD" -On 80.90.100.101 .1.3.6.1.2.1.2.2.1.2.1
