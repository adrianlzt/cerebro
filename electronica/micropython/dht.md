http://docs.micropython.org/en/latest/esp8266/esp8266/tutorial/dht.html

>>> import dht
>>> import machine
>>> d = dht.DHT11(machine.Pin(4))

>>> import dht
>>> import machine
>>> d = dht.DHT22(machine.Pin(4))

>>> d.measure()
>>> d.temperature()
>>> d.humidity()

The DHT11 can be called no more than once per second and the DHT22 once every two seconds for most accurate results. Sensor accuracy will degrade over time. Each sensor supports a different operating range. Refer to the product datasheets for specifics.
