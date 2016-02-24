http://jasecunningham.co.uk/index.php/2016/01/26/mqtt-problems-with-nodemcu-invalid-protocol-mqtt-in-connect/
https://esp8266hints.wordpress.com/2015/02/06/mosquitto-invalid-protocol-mqtt-in-connect-errors-and-esp8266-continuously-trying-to-reconnect-to-broker-service-without-success/

Hay dos versiones disponibles que no son compatibles:
v3.1
v3.1.1

Si nos sale esto en el servidor:
Invalid protocol "MQTT" in CONNECT

Es que el cliente está usando la version nueva (v3.1.1) y el server solo entiende la antigua (v3.1)

