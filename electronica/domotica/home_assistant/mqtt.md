Podemos usar MQTT para obtener valores de sensores o actuar sobre switchs.
https://home-assistant.io/components/mqtt/


# Broker

Ejemplo usando uno público
mqtt:
  broker: test.mosquitto.org
  port: 1883

Ejemplo uno privado, montado con mosquitto
mqtt:
  broker: localhost
  port: 8883
  client_id: home-assistant-1
  keepalive: 60
  username: USER
  password: PASS
  certificate: /etc/mosquitto/certs/ca.crt
  protocol: 3.1


# Switch
https://home-assistant.io/components/switch.mqtt/

switch:
  - platform: mqtt
    name: "Luz habitacion"
    state_topic: "casa/habitacion/luz"
    command_topic: "casa/habitacion/luz/set"

HA se subscribirá a casa/habitacion/luz para conocer el estado del switch.
Y si pulsamos en la interfaz gráfica sobre el slider, HA publicará ON/OFF sobre casa/habitacion/luz/set

Si queremos simular que se enciende la luz podemos hacer:
mosquitto_pub -h 192.168.1.100 -p 8883 -t "casa/habitacion/luz" -u user -P pass --cafile ca.crt -m "ON"


Si no definimos un state_topic, el switch se pondrá por defecto en "optimistic_mode". Esto quiere decir que si lo ponemos a on, su estado será on.
Si tenemos state_topic, enviamos un on y hasta que no recibimos el cambio de estado por mqtt no se refleja en el switch.
En resumen, si no ponemos un state_topic, estamos haciendo un "fire&forget". Decimos que se cambie pero no nos molestamos en mirar si cambió realmente.


# Sensores
https://home-assistant.io/components/sensor.mqtt/

sensor:
  - platform: mqtt
    name: "bedroom_temp"
    state_topic: "home/bedroom/temperature"
