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


# Events
https://www.zabbix.com/documentation/3.2/manual/config/events/sources
Cuatro tipos de fuentes de eventos:

trigger - whenever a trigger changes its status (OK→PROBLEM→OK)
  Change of trigger status is the most frequent and most important source of events.
  Each time the trigger changes its state, an event is generated. The event contains details of the trigger state's change - when did it happen and what the new state is.
discovery - when hosts or services are detected
auto registration - when active agents are auto-registered by server
internal - when an item/low-level discovery rule becomes unsupported or a trigger goes into an unknown state
