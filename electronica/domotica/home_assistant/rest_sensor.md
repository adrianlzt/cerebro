https://www.home-assistant.io/integrations/sensor.rest
https://www.home-assistant.io/integrations/rest/

sensor:
- platform: rest
  resource: http://ip.jsontest.com
  name: External IP
  value_template: "{{ value_json.ip }}"
- platform: gpsd


Podemos usar "scan_interval: 30" para definir el tiempo entre peticiones.
Por defecto 30s
