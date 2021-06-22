http://net-snmp.sourceforge.net/wiki/index.php/TUT:snmptable

Nos permite sacar los datos de una tabla SNMP en un formato más human friendly

snmptable -v 2c -c public 192.168.22.104 iftable


% snmptable -v 2c -c demopublic -Os test.net-snmp.org sysORTable
SNMP table: sysORTable
  sysORID                                         sysORDescr   sysORUpTime
  snmpMIB                The Mib module for SNMPv2 entities.  0:0:00:00.82
    ifMIB   generic objects for network interface sub-layers  0:0:00:00.81
       ip            The MIB module for managing IP and ICMP  0:0:00:00.83
   udpMIB    The MIB module for managing UDP implementations  0:0:00:00.82

-Os    Display the MIB object name (plus any instance or other subidentifiers):
