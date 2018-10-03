http://www.oid-info.com/
http://www.net-snmp.org/wiki/index.php/TUT:Using_and_loading_MIBS


# OID, Object Identifier Registry

The Internet OID is 1.3.6.1
http://www.alvestrand.no/objectid/1.3.6.1.html

SNMPv2-MIB::sysDescr.0
SNMPv2-MIB::sysDescr.0 = STRING: Ethernet Routing Switch

Convierte un OID en su nombre (-m all para usar todas las mibs del sistema)
$ snmptranslate -m all .1.3.6.1.2.1.1.1.0
SNMPv2-MIB::sysDescr.0

$ snmptranslate -On SNMPv2-MIB::sysDescr.0
.1.3.6.1.2.1.1.1.0

$ snmptranslate -Td .1.3.6.1.2.1.1.1.0
Descripción del OID

Ver directorio donde están las mibs (mirar más abajo para como mostrar otras mibs):
snmptranslate -Dinit_mib .1.3 2>&1 |grep MIBDIR
o
net-snmp-config --default-mibdirs

Tenemos que poner los ficheros .mib directamente en ese directorio.


Lista de nombre y numero (-m all hace que se carguen todas las MIBS):
snmptranslate -m all -Tz -On

Si no ponemos "-m all" solo se cargan ciertas MIBS.
Para ver cuales: snmptranslate -M . .1



Crear una mib
https://netbeez.net/blog/snmp/
