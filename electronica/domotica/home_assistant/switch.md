https://community.home-assistant.io/t/create-a-toggle-switch/110794/5

# Esto nos pone un botón tipo toggle en la interfaz web
input_boolean:
  chromecast_radio:
    name: Chromecast Radio


switch:
  platform: template
  switches:
    chromecast_radio:
      value_template: >
        {{ is_state('input_boolean.chromecast_radio', 'on') }}
      turn_on:
        - service: input_boolean.turn_on
          entity_id: input_boolean.chromecast_radio
        - service: script.play_chromecast_radio
      turn_off:
        - service: input_boolean.turn_off
          entity_id: input_boolean.chromecast_radio
        - service: script.stop_chromecast_radio
