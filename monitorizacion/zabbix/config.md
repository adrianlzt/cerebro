Los usuarios pertenecen a grupos (User groups)
Los grupos tienen permisos: read/rw/deny/none sobre host groups

Cada host que creamos pertenece a uno o varios host groups.
Los hosts tienen items (alarmas).
Un conjunto de items forma una application.
Un template contiene un número de application y/o items.
A un host podemos aplicarle uno o varios templates.

# Items
Cuando creamos un item le asignaremos un nombre, un tipo (un valor de un agente zabbix activo o pasivo, un script, un comando via ssh, snmp, snmp trap, etc)
Para algunos de estos items tendremos que definir la key, los parámetros especificando que queremos obtener. Por ejemplo, que tipo de dato vamos a obtener del agente o que lanzar via ssh
Deberemos especificar tambien la unidad del elemento que vamos a monitorizar (unsigned int, float, char, log, text) y una unidad (no obligatoria).
Seleccionaremos el intervalo de chequeo y podemos también especificar si queremos solo lanzarlo con un scheduling determinado (por defecto 24x7)
Elegiremos tambien durante cuanto tiempo retener el dato (90d por defecto) y durante cuanto tiempo almacenar su "trend" (1 año por defecto)
Podemos tambien elegir un mapping, por ejemplo que si recibimos 0 es OK, 1 ERROR.
Asignaremos el item a una application (no obligatorio)
Podemos usar los resultados de este item para rellenar el inventario.
Y por último podemos asignarle una descripción larga.

# Users
https://www.zabbix.com/documentation/3.4/manual/quickstart/login

Creando un usuario, con notificaciones, permissions, etc

