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




# Types
https://www.zabbix.com/documentation/3.4/manual/config/items/itemtypes

## Simple checks
Checks de conectividad (ping, tcp, udp) lanzados desde el server, o proxies.
Podemos tener si esta up/down, tiempos de respuesta, paquetes perdidos.
