https://www.home-assistant.io/integrations/logbook/

Mostrar en la UI un "log" de eventos.
Para mostrarlo meter en la config (podemos filtrar que queremos obtener):
logbook:

Lo tendremos en
http://hass:8123/logbook


Podemos enviar eventos con el service logbook.log

      - service: logbook.log
        data:
          name: Kitchen
          message: is being used
          # Optional
          entity_id: light.kitchen
          domain: light
