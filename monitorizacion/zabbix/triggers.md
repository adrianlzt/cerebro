https://www.zabbix.com/documentation/3.4/manual/quickstart/trigger
https://www.zabbix.com/documentation/3.4/manual/config/triggers

Generar problemas si un item hace match sobre una regla que definamos.
Tiene 5 niveles: not classified, information, warning, average, high, disaster
La vuelta al estado OK puede definirse con otra expresión distinta.

Un trigger no puede tener el mismo nombre y misma expresión en un mismo host.

https://www.zabbix.com/documentation/3.4/manual/config/triggers/expression
https://www.zabbix.com/documentation/3.4/manual/appendix/triggers/functions
Las expresiones que nos permite zabbix nos permiten bastante flexibilidad:
  - ultimo valor > que un valor
  - media de los últimos x minutos valor > que N
  - diferencia entre último valor y el anterior
  - buscar strings
  - forecast
  - etc

Si tenemos una métrica que sea un contador creciente lo que haremos es almacenarla como delta (en la config del item, Store value -> Delta)
De esta manera ya podremos aplicar los triggers sobre el ese valor derivado.

multiple problem event generation: si está a "mutltiple", cada vez que se recolecta un dato se genera el/los actions asociados al trigger.


CUIDADO!
Puede que esperemos un resultado determinado y comparemos contra eso, pero de un error y tengamos otra cosa.
Por ejemplo, en monit web podríamos poner un trigger como:
	{Escalada:web.test.error[NOMBRE].last()}=1
Pero si salta el timeout:
  Cannot evaluate expression: expected numeric token at "Timeout was reached: Operation timed out after 15001 milliseconds with 0 bytes received)=1".
Fallará la expresión y seguirá el error.

# Dependencias
Podemos hacer que los triggers tengan como dependencia otro trigger.
Asi podemos evitar que si cae un router que conecta con varios nodos, salten todas las alarmas.
Configurado correctamente solo la alarma del router saltará.

# Severidad
Distintas severidades actuan teniendo diferentes colores en los dashboards, lanzando diferentes "user medias" y actuando en los triggers.

Not classified
Information
Warning
Average
High
Disaster


# Tags
https://www.zabbix.com/documentation/3.4/manual/config/triggers/event_tags
Podemos usar palabras: "Services", o parejas "Application:Java".
Estas tags las usaremos generalmente para correlar eventos y actuar sobre actions.

Ejemplos de uso:
  - para poner una alarma de log a OK buscando un pattern distinto
  - para filtrar que notificaciones recibir
  - filtrado a la hora de mostrar problemas en la web
  - usar un campo del item value como tag
  - ayuda a entender de donde viene el problema en las notificaciones


# Forecast
https://www.zabbix.com/documentation/3.4/manual/config/triggers/prediction
http://zabbix.org/mw/images/1/18/Prediction_docs.pdf
No es facil usarlo bien. Puede haber muchos corner cases que hagan que se dispare, o no se dispare, cuando debería
forecast: nos devuelve el valor estimado dentro de X
timeleft: se dispara cuando queda menos tiempo del especificado para que se cumpla un evento

{host:vfs.fs.size[/,free].timeleft(1h,,0)} < 1h
se dispara cuando quede menos de 1h para quedarnos sin disco



# Expresions

## Histeresis
http://blog.zabbix.com/no-more-flapping-define-triggers-the-smart-way/1488/

({TRIGGER.VALUE}=0 and {server:temp.last()}>20) or
({TRIGGER.VALUE}=1 and {server:temp.last()}>15)

Se activa si pasa de 20. Se desactiva si baja de 15


## Booleanos
{Escalada:web.test.error[Beta 8a].last()}=1 or {Escalada:web.test.fail[8anu Tiempo].last()}=1


## Matematicas
({server1:system.cpu.load[all,avg1].last()}>5) + ({server2:system.cpu.load[all,avg1].last()}>5) + ({server3:system.cpu.load[all,avg1].last()}>5)>=2
({Template Telegraf Linux:telegraf.system.load1.last()}/{Template Telegraf Linux:telegraf.system.n_cpus.last()})>1


## Monitorizar todos los paramaetros de un item
https://serverfault.com/questions/701332/can-i-create-a-zabbix-item-which-tracks-the-cksum-of-a-file-with-a-slightly-vary
Parece que hace falta crearse un custom low-level discovery.


## Fuzzytime
Checking how much an item timestamp value differs from the Zabbix server time.


# Recovery expression
Podemos definir una expresión distinta para definir cuando se debe recuperar el trigger.
IMPORTANTE, la condición de alerta del trigger no puede seguir activa para que esto funcione.
