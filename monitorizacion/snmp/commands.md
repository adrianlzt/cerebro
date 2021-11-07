https://net-snmp.sourceforge.io/wiki/index.php/Tut:Extending_snmpd_using_shell_scripts

Usando snmpd podemos asociar OIDs a comandos.

CUIDADO! cachea
https://manned.org/snmpd.conf/de11df08
Según la man page 30", aunque haciendo pruebas he visto 5"
Supuestamente se puede enviar un snmpset para flushear el cache, pero no he conseguido hacerlo funcionar.

Ejemplo de conf:
view   all         included   .1
rocommunity public  default    -V all
extend test /bin/echo hello


Query:
➜ snmpwalk -v 2c -c public 127.0.0.1 nsExtendOutput1
NET-SNMP-EXTEND-MIB::nsExtendOutput1Line."test" = STRING: hello
NET-SNMP-EXTEND-MIB::nsExtendOutputFull."test" = STRING: hello
NET-SNMP-EXTEND-MIB::nsExtendOutNumLines."test" = INTEGER: 1
NET-SNMP-EXTEND-MIB::nsExtendResult."test" = INTEGER: 0

El OID de output full para un nombre "aaa" será:
.1.3.6.1.4.1.8072.1.3.2.3.1.2.3.97.97.97

Como vemos hay una parte común (.1.3.6.1.4.1.8072.1.3.2.3.1.2.3) y luego la clave
en decimal (a=97)
