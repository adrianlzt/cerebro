# http://linux.die.net/man/5/snmptrapd.conf

Si queremos simular la generación de traps en un pc:

Añadimos al final de /etc/snmp/snmpd.conf:
# send v1 traps
trapsink        10.2.6.97   public  # línea necesaria
# also send v2 traps
trap2sink       10.2.6.97   secret
# send traps on authentication failures
authtrapenable  1



La colectora de snmptraps:

service snmptrapd start

/etc/snmp/snmptrapd.conf:
disableAuthorization yes
traphandle default /usr/sbin/snmptthandler

El disableAuthorization permite que cualquier community le envíe traps. Antes de la versión 5.5, esto era lo por defecto.

Si queremos limitar que communities nos puede enviar traps:
authCommunity   log,execute,net public


log
log the details of the notification - either in a specified file, to standard output (or stderr), or via syslog (or similar).

execute
pass the details of the trap to a specified handler program, including embedded perl.

net
forward the trap to another notification receiver.



Ejemplo de trap version 1:
snmptrap -v 1 -c public 10.2.36.19 NET-SNMP-EXAMPLES-MIB::netSnmpExampleHeartbeatNotification "" 6 17 "" netSnmpExampleHeartbeatRate i 1288856

Le estoy enviado la trap a la "comunidad" public, al servidor 10.6.6.7
El enterprise-oid es NET-SNMP-EXAMPLES-MIB::netSnmpExampleHeartbeatNotification
agent = ""
trap-type = 6
specific-type = 17
uptime = ""
OID = netSnmpExampleHeartbeatRate
Tipo de respuesta = i (integer)
Valor = 1288856



Ejemplo de trap versión 2:
snmptrap -v 2c -c public 10.2.36.19 "" NET-SNMP-EXAMPLES-MIB::netSnmpExampleHeartbeatNotification netSnmpExampleHeartbeatRate i 1288856

Le estoy enviado la trap a la "comunidad" public, al servidor 10.2.2.197
uptime = ""
trapoid = NET-SNMP-EXAMPLES-MIB::netSnmpExampleHeartbeatNotification
OID = netSnmpExampleHeartbeatRate
Tipo de respuesta = i (integer)
Valor = 1288856


Si miramos una captura de tráfico de este último trap veremos tres variables:

snmp.name == 1.3.6.1.2.1.1.3.0 (SNMPv2-MIB::sysUpTime.0)
snmp.value.timeticks == 432221225

snmp.name == 1.3.6.1.6.3.1.1.4.1.0 (snmpTrapOID)
snmp.value.oid == 1.3.6.1.4.1.8072.2.3.0.1 (netSnmpExampleHeartbeatNotification in MIB NET-SNMP-EXAMPLES-MIB. Mandatory netSnmpExampleHeartbeatRate)
El mandatory nos dice que después tiene que venir ese OID.

snmp.name == 1.3.6.1.4.1.8072.2.3.2.1 (netSnmpExampleHeartbeatRate)
snmp.value.int == 1288856
