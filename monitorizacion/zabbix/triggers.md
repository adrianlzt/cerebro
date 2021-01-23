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
  mirar event_correlation.md


CUIDADO!
Puede que esperemos un resultado determinado y comparemos contra eso, pero de un error y tengamos otra cosa.
Por ejemplo, en monit web podríamos poner un trigger como:
	{Escalada:web.test.error[NOMBRE].last()}=1
Pero si salta el timeout:
  Cannot evaluate expression: expected numeric token at "Timeout was reached: Operation timed out after 15001 milliseconds with 0 bytes received)=1".
Fallará la expresión y seguirá el error.


# Dependencias
https://www.zabbix.com/documentation/3.4/manual/config/triggers/dependencies
Podemos hacer que los triggers tengan como dependencia otro trigger.
Asi podemos evitar que si cae un router que conecta con varios nodos, salten todas las alarmas.
Configurado correctamente solo la alarma del router saltará.

Si un trigger depende de otro, si el "padre" está activo, los hijos no se procesarán, no podremos ver si podrían estar activos (pequeño inconveniente).
Si el padre está activo y salta el hijo, perderemos el evento hijo (aunque el padre se recupere, nunca se generará el problem del hijo). Esto no es problema si usamos nodata(), porque se evaluan cada 30". En la bbdd no se creará entrada en la tabla events ni en problem.
En la vista de Dashboard - Triggers, veremos un símbolo (flecha hacia arriba o abajo) para los triggers dependientes o con dependencias.

La hora de recuperación de un trigger nodata puede engañarnos, por ejemplo, puede ser anterior a la hora del evento.
Esto puede suceder si los values del item que usamos para el nodata están encolados en la history cache.
El nodata salta porque no ve datos y cuando finalmente procesa los items encolados, se pone la hora de recuperación del value que estaba encolado.

Si itemA depende de itemB que a su vez depende de itemC.
Si itemC está activo, itemB no y salta itemA, no generará evento (se respeta que por encima tienes una dependencia activa)

Si un trigger A depende de un trigger B que está deshabilitado, esta dependencia se ignora.


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

No podemos modificar las tags de un trigger generado por un prototype.
Podemos modificarlas, o crear nuevas (respetando la incrementalidad del triggertagid, mirar sql.md), pero cada vez que se ejecute el LLD, se pondrán los valores del template (borrará y actualizará según sea necesario).
La función que actualiza los triggers tags para cada LLD:
libs/zbxdbhigh/lld_trigger.c
  Function: lld_triggers_save
  Purpose: add or update triggers in database based on discovery rule
  Como parte de su ejecucción, cambia los tags de los triggers discovered al valor que tenga en el template

Petición para que se puedan modificar: https://support.zabbix.com/browse/ZBXNEXT-4557


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

## Nodata
Podemos poner expresiones que saltan si hace mucho que no se recibe un dato.
Las expresiones nodata se evaluan por Zabbix cada 30" (podemos verlo en los logs en debug)

## Recuperar estado OK automáticamente
Si queremos que un trigger vuelva a OK tras un tiempo le pondremos un AND con otra expresión con nodata.
De esta manera, si la expresión está activa, pero hace mucho que no tenemos datos, no se activará (o volverá a OK).
Ejemplo:
{item.strlen(#1)}<>0 and {item.nodata(30)}=0
  si el último elemento que ha llegado a "item" tenía una longitud distinta de 0 se activa
  si pasan 30" y no hemos recibido datos volverá a estado OK


# Recovery expression
Podemos definir una expresión distinta para definir cuando se debe recuperar el trigger.
IMPORTANTE, la condición de alerta del trigger no puede seguir activa para que esto funcione.


# Math
https://www.zabbix.com/documentation/3.4/manual/config/triggers/expression
A<B ⇔ (A<B-0.000001) since Zabbix 3.4.9
A<B ⇔ (A≤B-0.000001) before Zabbix 3.4.9



# change, disparar cuando hay cambios, gestionar la primera llegada de un dato
una curiosidad que me he encontrado con zabbix. El tema es que tenía un trigger tipo:
xxx.change()}>0

pero el tema es que la primera vez que llega un dato casca, porque intenta ir a buscar el valor previo y no existe

solución
({idocs:item3.count(#2)}=1 and {idocs:item3.last()}>0) or {idocs:item3.change()}>0

si solo tengo un elemento, pues disparo si el valor es mayor que 0, si tengo varios elementos, solo si hay variación



# Dev
## Procesamiento de las funciones
libs/zbxserver/evalfunc.c
evaluate_XXX
