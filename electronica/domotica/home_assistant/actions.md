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
