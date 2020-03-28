Cuidado con caidas másivas, pueden generar oleadas muy grandes de emails.
En caso de una avalancha de emails para pararla podemos hacer:
- Disable in Zabbix all Actions
- Edit the database and delete all items in the Zabbix queue
- Delete all emails in the Mail server Queue


# Histórico de notificaciones
Reports -> Action Log
Elegir un usuario
Veremos todas las notificaciones que se le han enviado


# Notificar un usuario
Un host tiene items.
Un trigger se dispara por algunas condiciones en unos items.
Al dispararse un trigger genera un evento (tipo trigger, source=0).
Cada eventos se intenta matchear contra cada una de las Actions definidas.
  process_actions: process all actions of each event in a list
En caso de que matchee, se ejecutan las Operations definidas (enviar un mensaje, a uno o varios contactos, o ejecutar un comando)
En las operations podemos definir varios "steps" que se irán ejecutando con el paso del tiempo (escalado)


# Steps
Las actions tienen pasos y duración del paso.
Es la forma de escalar.
Primero se ejecuta el paso 1.
Luego se esperarán "default oepration step duration" hasta que se ejecute el step 2.
Tienen que haber operations para todos los pasos, aunque podemos elegir no ejecutar nada en el paso.
Si ponemos pasos "1 | 0" quiere decir que se ejecuta en todos los pasos.

Para un step determinado podemos modificar el tiempo de espera hasta ejecutar el próximo paso.
Si tenemos distintos "time step" para un mismo step, todos los steps de ese nivel se ejecutarán con el menor de los tiempos.
Ejemplo, si tenemos dos steps 2, uno con step duration 100 y otro con 200, el step 3 se ejecutará 100s después del step 2.

También podemos decidir solo ejecutar el step en caso de que no tengamos ACK.

Tip: retrasar las notificaciones de triggers leves (ponerlas en el step 2) para ver si en ese tiempo que le damos se recupera sola.


# Operations
Messages:
  - user
  - user group
Command
  - script
    - zabbix server
    - zabbix proxy
    - remote agent (tiene que tenerlo habilitado)
  - ipmi
  - ssh/telnet
  - global script (se define al definirlo si se debe ejecutar en el server o en el agente)


# Notifications
Si queremos enviar más información


# Events / problems
El housekeeper borra los eventos más antiguos de N días (config Administration -> General -> Housekeeping). Esto provoca también que se borren los problemas más antiguos de esa fecha.

https://www.zabbix.com/documentation/3.2/manual/config/events/sources
Cuatro tipos de fuentes de eventos:

trigger - whenever a trigger changes its status (OK→PROBLEM→OK)
  Change of trigger status is the most frequent and most important source of events.
  Each time the trigger changes its state, an event is generated. The event contains details of the trigger state's change - when did it happen and what the new state is.
discovery - when hosts or services are detected
auto registration - when active agents are auto-registered by server
internal - when an item/low-level discovery rule becomes unsupported or a trigger goes into an unknown state
  podemos enviar notificaciones para este tipo, http://zabbix/actionconf.php?eventsource=3 (Configuration -> Actions -> Event Source: Internal)

https://www.zabbix.com/documentation/current/manual/api/reference/problem/object
Algunos eventos se convertiran en problems:
 - los events de fuente triggers que tienen un problema (value=1)
 - los internal, cuando un trigger, item o lld pasa a unknown/not supported

El objectid de la tabla events o problem apuntá al triggerid.

En la tabla problems tendremos un campo, en principio vacío, que se rellenará con el evento de recovery, si es que tenemos:
r_eventid, r_clock, r_ns


Los eventos luego se pasan por "process_actions" (src/zabbix_server/actions.c).
En esta función, por cada action que tengamos definido, se comprobará si el evento hace match.
La función "check_action_conditions" será la encargada de decidir si un evento matchea las condiciones de una action. Esta a su vez llama a "check_action_condition", que puede llamar a "check_trigger_condition", "check_discovery_condition", "check_auto_registration_condition" o "check_internal_condition".

Por cada match event<->action se crea un escalation, esto es, una entrada en la tabla escalations.
Para el caso de un evento de un trigger, almacenaremos, el actionid, triggerid, eventid y el status a ESCALATION_STATUS_ACTIVE (0)
 escalationid | actionid | triggerid | eventid | r_eventid | nextcheck  | esc_step | status | itemid
--------------+----------+-----------+---------+-----------+------------+----------+--------+--------
            6 |        7 |     13997 |     133 |           | 1545928942 |        1 |      0 |

Luego tenemos el proceo "escalator" (process_escalations src/zabbix_server/escalator/escalator.c), que comprueba periódicamente la tabla "escalations" y genera entradas en la tabla "alerts".
Periódicamente hace una query para obtener todas las escalations (en la tabla están todas las escalations activas, se van borrando según se terminan).
En realidad hay varias queries, dependienendo si triggerid es null y otras dos condiciones.
Las que su nextcheck esté en el futuro, se ignora (execpto si está en recovery, que hace algo especial, no comprendido completamente).
Luego se obtiene de la bbdd cierta info (info del trigger, host, etc).
Después se se obtiene de la cache info sobre la relación del trigger con los items y otras cosas, estas consultas se hacen a la cache, donde se hace LOCK para acceder a los datos.
Este LOCK tiene que esperar hasta que esté liberado, esto inserta cierto delay.
Si hay muchos elementos en escalation con nextcheck=0 (pausados, por estar en modo mantenimiento), cada uno de ellos realizando varias consultas a la cache, cargará mucho al escalation.
Meter más escalations no parece que mejore este problema, porque tendríamos más procesos cogiendo LOCKs.

escalation_execute_operations: para saber que generar, escalator comprobará las tablas operations y opmessage. Esta función ejecutará comandos (execute_commands) o generará entradas en la tabla alerts (add_message_alert)


En zabbix 3.2 tenemos un único procesor alerter. A partir de 3.4 hay un alerter manager que lee entradas en alerts y envia mensajes via IPC a los alerter workers.
En zabbix 3.2, tras 40" el proceso alerter intentará matar el script de alertado con SIGTERM. Podemos manejar la señal para evitarlo, pero saturaremos el alerter.
Si el programa que queremos ejecutar no funciona, zabbix parece que retorna un código OK, aunque veremos que reinenta tres veces el envío.



trigger +--> event +--> escalation +--> alert +--> email,sms,script,etc
                   |
                   +--> problem



Aquí falta explicar como se procesa el cerrado de eventos/problems.

