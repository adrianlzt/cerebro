Trap ---> snmptrapd --> snmptt (traducir el OID con las mibs) --> snmpt:exec echo (formato syslog) > socket_eventdb

Para convertir las MIBs en ficheros para snmptt usaremos snmpttconvertmib.

# Eventconsole
Para cada trap que queramos enviar al event console deberíamos definir una línea EXEC:

EVENT ciscoCFSMergeFailNotif .1.3.6.1.4.1.9.9.433.0.2 "Status Events" Normal
FORMAT Notification to convey the information of the 'Merge $*
NODES /etc/SERVICIO/nodes.txt
EXEC export LC_ALL=C;echo "<4> `date +"%b %d %X"` $r "SERVICIO:PERSISTENT:ciscoCFSMergeFailNotif:$2:" The merge of the two fabrics fail for a CFS capable feature. Description: $4" >> /var/spool/icinga/cmd/mkeventd/events
SDESC
Notification to convey the information of the 'Merge
Failure' occurred in the fabric. This notification gets
generated when the merge of the two fabrics fail for a
CFS capable feature.

Variables:
  1: cfsMergeFailFeatureName
  2: cfsMergeFailScopeType
  3: cfsMergeFailScopeVal
  4: cfsMergeFailReasonDescription
EDESC

NODES, solo se procesa este EVENT si el TRAP viene de uno de los elementos de /etc/SERVICIO/nodes.txt
Un elemento por línea. Rangos, máscaras, etc.


# Correlacción de eventos
Para que cuando llegue un trap de interfaz UP, borre el trap del mismo tipo severidad CRITICAL.
O un CRITICAL pise a un WARNING.

Esto se hace en el WATO, "Event Console", "All Rules".

Reglas básicas:
GENERICA: Correlar eventos consigo mismo. Si llega un elemeto con mismo nombre y del mismo host correarlar. Hacer que las de un día se junten, pero pasado un día genere una nueva.


Relación trap <-> service



