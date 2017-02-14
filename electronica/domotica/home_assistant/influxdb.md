https://home-assistant.io/components/influxdb/
https://home-assistant.io/components/sensor.influxdb/

Ejemplo de conf:

influxdb:
  host: home.duckdns.org
  port: 8086
  database: homeassistant
  username: homeassistant
  password: homeassistant
  ssl: true
  verify_ssl: true # verifica el certificado
  tags:
    source: hass

Probar conectividad:
curl https://home.duckdns.org:8086/query -u homemetrics:homeassistant --data-urlencode "db=homeassistant" --data-urlencode "q=show measurements"


# Query como sensor
Se puede lanzar una query sobre influx y tratarlo en HA como si fuesen los valores de un sensor.
