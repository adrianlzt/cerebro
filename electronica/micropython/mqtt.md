https://github.com/micropython/micropython-lib/blob/master/umqtt.simple/umqtt/simple.py
https://github.com/micropython/micropython-lib/tree/master/umqtt.simple
https://home-assistant.io/blog/2016/08/31/esp8266-and-micropython-part2/

from umqtt.simple import MQTTClient
client = MQTTClient("proebanocoas","test.mosquitto.org")
client.connect()
client.publish("casa/termometro/temperatura", "299")



# SSL
from umqtt.simple import MQTTClient
client = MQTTClient(CONFIG['client_id'], "test.mosquitto.org", ssl=True)
client.connect()
client.publish("casa/termometro/temperatura", "299")



Ejemplo completo
https://github.com/davea/sonoff-mqtt/blob/master/main.py
