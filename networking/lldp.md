xDP
protocolos de descubrimiento de nivel 2.
Se usan para intercambiar información sobre los dispositivos conectados.


# CDP
Es el protocolo de Cisco (Cisco discovery protocol).
Por defecto envía mensajes cada 60"

Envía:
  Device ID
  Software
  Platform
  Direcciones IP
  ID del puerto
  Duplex
  Capabilities (si es router, switch, bridge, IGMP capable, repeater, etc
  Native VLAN (solo switches)
  Management interface (solo switches)


# LLDP (Link layer discovery protocol)
Protocolo genérico que usan más fabricantes

Datos:
Chassis subtype, parece que puede enviarse distinta información, entre ella la MAC como identificador.
El nombre del puerto: id + description
System name
System description (vendor, software
Capabilities: other, repeater, bridge, WLAN AP, router, telephone, DOCSIS, station only


## LLDP-MED (Media Endpoint Discovery)
https://blog.irontec.com/cdp-y-lldp-nuestros-grandes-aliados/

Mejora con respecto a LLDP que permite compartir la información entre dispositivos no adyacentes y provee de información adicional.


## SNMP
La información de LLDP expuesta por SNMP
.1.0.8802.1.1.2
http://www.oid-info.com/cgi-bin/display?oid=1.0.8802.1.1.2&a=display

$ snmptranslate -m ALL 1.0.8802.1.1.2.1
LLDP-MIB::lldpObjects

Después de bajar las mibs de cisco:
snmptranslate -m ALL -M /var/lib/snmp/mibs/cisco/ 1.0.8802.1.1.2.1

