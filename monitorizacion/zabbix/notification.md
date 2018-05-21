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
Al dispararse un trigger genera un evento.
En las acciones hay condiciones, que cuando saltan por uno o varios eventos, ejecutan una acción.
La acción puede ser notificar o ejecutar alguna acción


# Events
Cuatro tipos de fuentes de eventos:
  triggers
  discovery
  auto registration
  internal
