Los usuarios pertenecen a grupos (User groups)
Los grupos tienen permisos: read/rw/deny/none sobre host groups

Cada host que creamos pertenece a uno o varios host groups.
Los hosts tienen items (alarmas).
Un conjunto de items forma una application.
Un template contiene un número de application y/o items.
A un host podemos aplicarle uno o varios templates.

Notificaciones:
Un item hace saltar un trigger
Un action matchea ese trigger y envia un "Media Type" a un grupo/usuario. El action define que se envia en el mensaje, haciendo uso de macros para poner el nombre del host, fecha, etc.
El Media Type será un email, sms, etc


# Users
https://www.zabbix.com/documentation/3.4/manual/quickstart/login

Creando un usuario, con notificaciones, permissions, etc


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

## Keys
https://www.zabbix.com/documentation/3.4/manual/config/items/item/key

Los items tienen una key para identificarse:
vfs.fs.size[/opt]

Lo que hay entre corchetes es uno, o varios, parámetros.

Dejar ciertos parámetros con su valor por defecto:
icmpping[,,200,,500]



# Triggers
https://www.zabbix.com/documentation/3.4/manual/quickstart/trigger
Generar problemas si un item hace match sobre una regla que definamos.
Tiene 5 niveles: not classified, information, warning, average, high, disaster
La vuelta al estado OK puede definirse con otra expresión distinta.

https://www.zabbix.com/documentation/3.4/manual/config/triggers/expression
https://www.zabbix.com/documentation/3.4/manual/appendix/triggers/functions
Las expresiones que nos permite zabbix nos permiten bastante flexibilidad:
  - ultimo valor > que un valor
  - media de los últimos x minutos valor > que N
  - diferencia entre último valor y el anterior
  - buscar strings
  - forecast
  - etc

Podemos usar booleanos:
{Escalada:web.test.error[Beta 8a].last()}=1 or {Escalada:web.test.fail[8anu Tiempo].last()}=1
