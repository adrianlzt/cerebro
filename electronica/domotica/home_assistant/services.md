https://www.home-assistant.io/docs/scripts/service-calls/

Es la forma de actuar contra terceras cosas.
Generalmente será ejecutar algo cuando salta un trigger.

En la UI/developer-tools/service tenemos los disponibles.

Ejemplos:
 - notificar a un usuario
 - ejecutar un comando
 - reiniciar HA



Podemos también crear un service dentro de una custom integration
https://developers.home-assistant.io/docs/dev_101_services


Llamar en un automation:
  action:
    - service: alarm_control_panel.alarm_disarm
      target:
        entity_id: alarm_control_panel.home_alarm
      data:
        code: '1234'
