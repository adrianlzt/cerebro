https://www.zabbix.com/documentation/3.4/manual/config/items/itemtypes/snmp
https://www.zabbix.com/documentation/3.4/manual/config/items/itemtypes/snmptrap


# Traps
cliente -> snmptrapd -> snmptt -> file <- zabbix -> setea el snmp trapper según las regex definidas.

## Items
Syntax
  snmptrap[regex]
  snmptrap.fallback

Examples
  snmptrap["SNMPv2-MIB::coldStart"]
  snmptrap[LineVoltageProblem]
  snmptrap["IF-MIB::(linkDown|linkUp)"]



# Mibs to template
https://github.com/cavaliercoder/mib2zabbix

Script en perl que convierte mibs a un template de zabbix

Dependencias:
perl-xml-simple 


Automáticamente nos genera los items necesarios y las discovery rules para meter elementos.
https://www.zabbix.com/documentation/3.4/manual/discovery/low_level_discovery/snmp_oids
Ejemplo: le pasamos un OID de donde sacar el listado de interfaces y luego un item prototype para obtener de otro oid, usando el index de la tarjeta de red, para obtener el valor de bytes enviados para cada tarjeta.
IF-MIB::ifOutErrors.{#SNMPINDEX}

