Cuando creamos un item le asignaremos un nombre, un tipo (un valor de un agente zabbix activo o pasivo, un script, un comando via ssh, snmp, snmp trap, etc)
Para algunos de estos items tendremos que definir la key, los parámetros especificando que queremos obtener. Por ejemplo, que tipo de dato vamos a obtener del agente o que lanzar via ssh
Deberemos especificar tambien la unidad del elemento que vamos a monitorizar (unsigned int, float, char, log, text) y una unidad (no obligatoria).
Seleccionaremos el intervalo de chequeo y podemos también especificar si queremos solo lanzarlo con un scheduling determinado (por defecto 24x7)
Elegiremos tambien durante cuanto tiempo retener el dato (90d por defecto) y durante cuanto tiempo almacenar su "trend" (1 año por defecto)
Podemos tambien elegir un mapping, por ejemplo que si recibimos 0 es OK, 1 ERROR.
Asignaremos el item a una application (no obligatorio)
Podemos usar los resultados de este item para rellenar el inventario.
Y por último podemos asignarle una descripción larga.

# Keys
https://www.zabbix.com/documentation/3.4/manual/config/items/item/key

Los items tienen una key para identificarse:
vfs.fs.size[/opt]

Lo que hay entre corchetes es uno, o varios, parámetros. Cada item define que se puede poner en cada parámetro.

Dejar ciertos parámetros con su valor por defecto:
icmpping[,,200,,500]

# Preprocessing
https://www.zabbix.com/documentation/3.4/manual/appendix/items/preprocessing
Al recibir un valor en un item podemos pasarle un procesador para decidir que queremos almacenar en la bbdd.
Por ejemplo, podemos recibir un json pero solo almacenar un valor de ese json

# Intervals
https://www.zabbix.com/documentation/3.4/manual/config/items/item/custom_intervals


# Value mapping
https://www.zabbix.com/documentation/3.4/manual/config/items/mapping
Mapear ciertos valores númericos a (generalmente) cadenas de texto


# Types
https://www.zabbix.com/documentation/3.4/manual/config/items/itemtypes

agent.md
snmp.md
IPMI
vmware.md
logfiles.md
telnet
jmx, java
odbc, ejecutar queries SQL

## Simple checks
https://www.zabbix.com/documentation/3.4/manual/config/items/itemtypes/simple_checks
Checks de conectividad (ping, tcp, udp) lanzados desde el server, o proxies.
Podemos tener si esta up/down, tiempos de respuesta, paquetes perdidos.

## Calculated items
https://www.zabbix.com/documentation/3.4/manual/config/items/itemtypes/calculated
Generar items virtuales a partir de cálculos de otros valores

## Internal checks
https://www.zabbix.com/documentation/3.4/manual/config/items/itemtypes/internal
Información del funcionamiento interno de zabbix

## SSH checks
https://www.zabbix.com/documentation/3.4/manual/config/items/itemtypes/ssh_checks
Ejecutar comandos ssh en hosts remotos
Si queremos usar una clave ssh la deberemos configurar en el fichero de config del zabbix server

## External checks
https://www.zabbix.com/documentation/3.4/manual/config/items/itemtypes/external
Scripts externos ejecutados por el server o el proxy, almacenados en ExternalScripts (grep ExternalScripts /etc/zabbix/zabbix_server.conf), por defecto /usr/lib/zabbix/externalscripts
Pueden impactar en la performance
Creamos un script, por ejemplo: /usr/lib/zabbix/externalscripts/openshift.sh

Configuramos un item que sea del tipo "External check" y la key la ponemos:
openshift.sh[]

Si queremos pasarle parametros al script:
openshift.sh["param1","param2"]

Type of information: Text
Update interval: ?
History storage period: ?



## Aggregate
https://www.zabbix.com/documentation/3.4/manual/config/items/itemtypes/aggregate
Hacer un cálculo de avg/count/last/max/min/sum sobre un item que está en varios servers, seleccionados con un array o un hostgroup

## Trapper
https://www.zabbix.com/documentation/3.4/manual/config/items/itemtypes/trapper
Definidos para ser usados con un zabbix_sender desde fuera
Podría, por ejemplo, ser usado desde una app para enviar sus métricas directamente (aunque no creo que sea muy buena idea)

## Dependent items
https://www.zabbix.com/documentation/3.4/manual/config/items/itemtypes/dependent_items
Enlazar items para que se ejecuten al mismo tiempo.
Útil si ciertas métricas necesitan recolectarse en el mismo momento.
Crearemos un item, y luego otra serie de items que marcarán ese primer item como "Master"
También podemos crear items dependientes pulsando sobre el "Wizard" de un item.

Un caso típico es leer un json y con dependent_items sacar distintos valores con JSON-path a distintos items.
También haciendo una única query SQL para sacar muchos datos (en vez de varias queries)



# Tipo de dato
Cuidado si cambiamos entre tipos de datos, zabbix borra todo el histórico y trends (porque estamos cambiando de tabla).
Intentar evitar los "text", son más costosos para la bbdd.


# Units
Solo para datos numéricos.
Lo cambiará en el frontend (no afecta a comi se almacena)

If set, K/M/G/T/P/E/Z/Y prefix fill be added:
  5242880 B -> 5 MB
Special processing for:
  B, Bps, unixtime, uptime
  Unit blacklist for %, ms, RPM, rpm

Con segundos tambien funciona.
Si tenemos ms, pondremos unit a s y multiplicaremos por 0.001


# Value mapping
Administration - General - Value mapping
Cambiar un número (ej.: 0,1,2) por cadenas de texto (ej: on, off, error)
