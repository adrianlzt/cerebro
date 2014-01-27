MIB: Management information base
OID: object identifiers

El protocolo SNMP se utiliza generalmente para que los elementos de red (switches, routers, etc) informen sobre su estado.
Esta información puede ser enviada por el elemento (trap o notificación), o preguntada (snmpget).
También es posible definir valores (snmpset, por ejemplo para apagar un servicio).

Cuando un elemento envía información lo puede hacer de dos maneras:
	Trap: paquete UDP del que no se espera confirmación
	Notify: paquete UDP del que se espera confirmación.

Si vemos una respuesta a una petición snmpget, será una lista de números separados por puntos, y seguidamente un valor alfanumérico.
Esos números empiezan por 1.3.6.1, y podemos ver a que hace referencia cada uno en http://oid-info.com

Si una empresa quiere crear productos que emitan traps, se le asignará un número a partir del OID enterprise (1.3.6.1.4.1)


Versiones:
La versión 1 de SNMP no tiene ningún tipo de seguridad.
La versión 2c es la de uso más común
La versión 3 es demasiado compleja. Muy centrada en la seguridad y casi no se usa.


Desde el punto de vista del elemento de red, cuando necesita enviar un trap snmp, genera un paquete UDP con la estructura adecuada y se la envía al servidor que tenga configurado como receptor de snmp traps.
Para que la persona que está en el servidor sea capaz de entender ese mensaje, las empresas hacen públicas las MIBS.

Las mibs son ficheros en formato ASN1 (http://en.wikipedia.org/wiki/Abstract_Syntax_Notation_One) donde se explica el significado de cada OID y el valor que se debe esperar.

Para explicar los mibs usaremos como ejemplo el fichero COROSYNC-MIB.txt ( en /usr/share/snmp/mibs o https://github.com/fghaas/corosync/blob/master/conf/COROSYNC-MIB.txt)

Tras la definición del nombre de la MIB se definen los imports de los tipos/modulos que vamos a utilizar, y se define de que archivo (mib) se va a cargar.
Por ejemplo, importaremos el tipo Integer32 para cuando el valor que se nos devulva sea de ese tipo. Podremos ver la definición de Integer32 en SNMPv2-SMI.txt

Después se definirán parámetros del programa/elemento que generará las alertas, y al final el oid que le corresponde:
::= { enterprises 35488 }
De esta manera, corosync tendrá sus oids en 1.3.6.1.4.1.35488	

Lo siguiente que se define son los oids para las "Notices", "Objetcs" y "Conformance". Que serán la forma organizativa donde ya colgará la información.

Ya pasamos a la definición de un objeto:
corosyncObjectsNodeName OBJECT-TYPE
    SYNTAX      OCTET STRING (SIZE(1..64))
    MAX-ACCESS  accessible-for-notify
    STATUS      current
    DESCRIPTION "Hostname of the cluster node."
::= { corosyncObjects 1 }

Se define su nombre, el tipo que es, sin sintaxis (cadena de octetos entre 1 y 64 caracteres).
La accesibildad (MAX-ACCESS):
"not-accessible", Used for special purposes.
"accessible-for-notify", Object can be used only using SNMP notification (SNMP traps)
"read-only", Object can only be read.
"read-write", Object can be read or written.
"read-create", Object can be read, written or created.

Status: mandatory, optional and obsolete

Al final se define su OID, que en total será: 1.3.6.1.4.1.35488.1.1


Más adelante se define una notificación:
corosyncNoticesNodeStatus NOTIFICATION-TYPE
    OBJECTS     { corosyncObjectsNodeName,
                  corosyncObjectsNodeID,
                  corosyncObjectsNodeAddress,
                  corosyncObjectsNodeStatus }
    STATUS      current
    DESCRIPTION
      "Produced when a node 'corosyncObjectsNodeName' joins or leaves
       the cluster.

       The notification includes the node name, nodeid, the node's
       IP address and the status (either 'joined' or 'left')."
::= { corosyncNotices 1 }

En primer lugar se define el nombre de la notificación, y los oids que pueden generarla.
En el receptor, se vería que llega una notificación de .3.6.1.4.1.35488.0.1 donde dentro estaría el OID de uno de los objetos que están entre llaves.

Si cargamos dicha mib en el receptor, este hará la traducción, y podremos ver un nombre en vez de la ristra de números.
Ej.:  .1.3.6.1.2.1.1.4.0  ->  SNMPv2-MIB::sysContact.0
