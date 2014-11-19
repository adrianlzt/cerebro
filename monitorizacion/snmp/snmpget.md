snmpget -v 2c -c COMMUNITY DIRECIP iftable

Si se pone mal la community la respuesta será:
Timeout: No Response from xx.xx.xx.xx


snmpget -v 2c -c COMUNIDAD 10.0.2.2 SNMPv2-MIB::sysDescr.0
SNMPv2-MIB::sysDescr.0 = STRING: Ethernet Routing Switch
