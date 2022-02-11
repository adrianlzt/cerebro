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


# Trigger
https://www.home-assistant.io/docs/automation/trigger/

Podemos ver sus disparos en el logbook

## time
- alias: 'Notify location'
  trigger:
    - platform: time_pattern
      minutes: 15  # esto es como en cron, cada hora a los 15'. Podemos usar "/5" para 'cada 5 minutos'
  condition: []
  action:
    - service: homeassistant.set_location
      data_template:
        latitude: '{{ states.sensor.gps.attributes.latitude }}'
        longitude: '{{ states.sensor.gps.attributes.longitude }}'



# Conditions
    condition:
      - condition: or
        conditions:
          - condition: numeric_state
            entity_id: sun.sun
            attribute: elevation
            below: 4
          - condition: numeric_state
            entity_id: sensor.office_lux_sensor
            below: 10


    condition: "{{ state_attr('sun.sun', 'elevation') < 4 }}"

Si queremos un atributo de un estado:
{{ is_state_attr('sensor.gps', 'mode', 3) }}
