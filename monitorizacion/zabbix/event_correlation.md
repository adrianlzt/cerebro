https://www.zabbix.com/documentation/4.2/manual/config/event_correlation/trigger

A partir de un trigger podemos generar varios problems (generation mode: multiple)

Lo que podemos hacer también es jugar con las tags para que un trigger pueda generar varios problems y se vayan cerrando uno a uno según su condición de recovery se cumpla.

El truco está en definir una tag a partir del {ITEM.VALUE} (típicamente una expresión regular).
De esta manera, cada problem que se genere llevará asociada una tag custom, única para él.
Cuando se genere el evento de recovery, solo se marcará como resuelto el problem que matchee la tag.

Ejemplo:
Nos llegan mensajes de texto tipo:
  foo [firing]
  foo [resolved]

Donde "foo" puede tomar cualquier valor.

Generamos un trigger con expresión (salta si llega un "firing"):
{alertmanagerAdri:ket.regexp(.*firing.$)}=1

Y como recovery:
{alertmanagerAdri:ket.regexp(.*resolved.$)}=1

Marcamos la generación de eventos como múltiple.
Y marcamos que un ok event cierra todos los problemas que matcheen las tags.
Creamos una tag, cuyo valor es la cadena de texto antes de los corchetes ("foo" por ejemplo):
BAR: {{ITEM.VALUE}.regsub("^([^ ]+) .*", "\1")}

Ahora cuando llegue "foo [firing]" se creará un problem con tag BAR=foo.
Si llega "bar [firing]" tendremos otro problem con tag BAR=bar

Cuando llegue "bar [resolved]" solo se cerrará el problema que tenía la tag BAR=bar
El trigger permanecerá "activo" porque tiene aún problems abiertos.
