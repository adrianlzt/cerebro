https://en.wikipedia.org/wiki/IP_Flow_Information_Export
Protocolo para enviar datos desde switches, y elementos de red, a colectores donde procesar la información.

IPFIX is a push protocol, i.e. each sender will periodically send IPFIX messages to configured receivers without any interaction by the receiver.


# Estructura de los datos
https://tools.ietf.org/html/rfc7011 (obsoletes 5101)

Para poder entender los datos, el que los envía debe especificar que está enviando.
Dentro de los paquetes por una parte se especificará que se envía y por otro lado los datos.
Puede que esta información viaje en paquetes distintos.
Por ejemplo, haciendo una captura de wireshark, si solo vemos paquetes de datos, no sabremos como debemos interpretarlos y no nos servirán para nada.

Template
A Template is an ordered sequence of <type, length> pairs used to completely specify the structure and semantics of a particular set of information that needs to be communicated from an IPFIX Device to a Collector.  Each Template is uniquely identifiable by means of a Template ID.

Template Record
A Template Record defines the structure and interpretation of fields in a Data Record.

Data Record
A Data Record is a record that contains values of the parameters corresponding to a Template Record.


Un paquete de IPFIX contiene:
  Message header (https://tools.ietf.org/html/rfc7011#section-3.1)
  set
  set
  ...

Cada set puede ser de datos (contendrá data records) o de template (contendrá template records).
Los de tipo template nos especificarán que datos no están enviando en los de sets de datos.

Un paquete puede llevar solo sets de templates, solo de datos o ambos juntos.

Cada set de tipo template tiene una cabecera donde se especifica el tipo de dato que estamos enviando, si es de tipo enterprise (un dato customizado de un fabricante https://tools.ietf.org/html/rfc7011#section-3.2) y la longitud del dato.
Si es un tipo estandarizado podemos ver que significa el ID en esta lista: http://www.iana.org/assignments/ipfix/ipfix.xhtml
Un ejemplo de un template set puede verse en la figura L (https://tools.ietf.org/html/rfc7011#section-3.4.1)
Cuando nos envían un template set se asociará a un Template ID.

En un set de template tendremos varios templates dentro, cada uno con su id.
Cada template definirá un sus fields.

Cuando luego nos llege un data set, miraremos su Set ID, que mapearemos a un Template ID conocido y así sabremos como entender los datos.

Mirar con wireshark el fichero ipfix.cap que esta en este directorio.



Cada set tiene una estructura: https://tools.ietf.org/html/rfc7011#section-3.3
Set header
record1
record2
...
padding (optional)


Ejemplo de un paquete de datos:
00 0a VERSION
00 41 LEN: 65 bytes
59 27 22 70 TIMESTAMP
00 03 8b 3b SEQUENCE
00 00 00 7b OBSERVATION DOMAIN ID
01 00 SET ID (valor=256, identifca que es un Data set)
00 31 SET LENGTH (49 bytes = 4 bytes de set-id y set-length + el resto de datos)
00 00 01 c8 01 3e 99 ff f4 61 DATOS: necesitamos un paquete de template para saber como interpretarlo
74 36 a8 aa 6a 4f b4 08 06 0e
00 02 c4 a8 00 02 c4 a8 00 00
00 00 00 00 00 01 00 00 00 00
00 00 00 2a 02                                               .


# Python
pip install ipfix

