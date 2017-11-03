Los usuarios pertenecen a grupos (User groups)
Los grupos tienen permisos: read/rw/deny/none sobre host groups

Cada host que creamos pertenece a uno o varios host groups.
Los hosts tienen items (alarmas).
Un conjunto de items forma una application.
Un template contiene un número de application y/o items (también puede tener triggers, maps, etc).
A un host podemos aplicarle uno o varios templates.

Notificaciones:
Un item hace saltar un trigger
Un action matchea ese trigger y envia un "Media Type" a un grupo/usuario. El action define que se envia en el mensaje, haciendo uso de macros para poner el nombre del host, fecha, etc.
El Media Type será un email, sms, etc


# Users
https://www.zabbix.com/documentation/3.4/manual/quickstart/login

Creando un usuario, con notificaciones, permissions, etc


# Items
mirar items.md



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

Mirar expresiones en triggers_expressions.md
