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
