https://www.home-assistant.io/integrations/sensor.command_line/

Sacando varios valores de un comando que devuelve un json

sensor:
  - platform: command_line
    name: foo bar
    command: cat some_file.json
    scan_interval: 60
    value_template: 'OK'
    json_attributes: 
      - next
      - second

Esto generará un "sensor.foo_bar" con state="ok" y attributes next=x, second=x, third=x
Suponiendo que el some_file.json sea tipo {"next": 1, "second": 2, "third": 3}
