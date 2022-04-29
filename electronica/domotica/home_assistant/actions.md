Encender un switch:

action:
  service: switch.turn_on
  entity_id: switch.luz_salon


Concatenar acciones:
action:
  - service: aaa
    entity_id: xxx
  - service: bbb
    entity_id: yyy


Para llamar a una API externa mirar rest_command.md


Para hacer pruebas enviando las trazas al syslog (journal)
service: system_log.write
data:
  logger: mycomp.myprueba
  message: "enviar mensaje al log"

Veremos una traza tipo:
Apr 29 19:02:42 raspikorea hass[9346]: 2022-04-29 19:02:42 ERROR (MainThread) [mycomp.myprueba] enviar mensaje al log



# Con template
No hacer nada en un condicional: homeassistant.none

  action:
    - service_template: >
        {% if is_state('alarm_control_panel.home_alarm', 'disarmed') %}
          alarm_control_panel.alarm_arm_away
        {% else %}
          alarm_control_panel.alarm_disarm
        {% endif %}
      entity_id: alarm_control_panel.home_alarm
      data:
        code: '1234'

  action:
    service_template: >
      {%- if float(now().hour) < float(states('input_slider.storage_heating_time')) -%}
        switch.turn_on
      {%- else -%}
        switch.turn_off
      {%- endif -%}
    entity_id:
      - switch.radiator_kitchen
      - switch.radiator_front
      - switch.radiator_back



Template para los datos:
      action:
        - service_template: >
            {%- if OnOff == "on" -%}
              switch.turn_on
            {%- else -%}
              switch.turn_off
            {%- endif -%}
          data_template:
            entity_id: "switch.light_{{ Room }}"
