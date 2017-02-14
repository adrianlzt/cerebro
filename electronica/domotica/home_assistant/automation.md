https://home-assistant.io/getting-started/automation/
https://home-assistant.io/components/automation/
https://home-assistant.io/ecosystem/appdaemon/tutorial/

(trigger)    When Paulus arrives home
(condition)  and it is after sunset:     <--- por si queremos poner filtros al trigger
(action)     Turn the lights in the living room on

Para conocer el estado de los dispositivos podemos ir en la web a /dev-state

Las acciones son las que podemos elegir en /dev-service

Podemos disparar eventos a mano desde /dev-event


Para recargar los automation no hace falta reiniciar, con reload es suficiente.

Los automation se muestran en el home, si no queremos:
hide_entity: True
