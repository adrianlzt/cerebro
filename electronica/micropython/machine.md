http://docs.micropython.org/en/latest/esp8266/esp8266/tutorial/pins.html

import machine

# Reboot
machine.reboot()

# Pinnes (GPIO)

0 -> D3
1 -> D4
2 -> LED

Encender LED de NodeMCU, asociado a GPIO2 (y parece que tambien al pin D4)
pin = machine.Pin(2, machine.Pin.OUT)
pin.high() # apagar el led (pin voltaje a 3.3v)
pin.low() # encender el led
pin.value() # valor actual
pin.value(0) # encender, 1 para apagar

# Trigger funcions si se detecta un cambio en un pin
>>> def callback(p):
...     print('pin change', p)
>>> from machine import Pin
>>> p0 = Pin(0, Pin.IN)
>>> p2 = Pin(2, Pin.IN)
>>> p0.irq(trigger=Pin.IRQ_FALLING, handler=callback)
>>> p2.irq(trigger=Pin.IRQ_RISING | Pin.IRQ_FALLING, handler=callback)

As such your callback functions are limited in what they can do (they cannot allocate memory, for example) and should be as short and simple as possible.


# Frecuencia
http://docs.micropython.org/en/latest/esp8266/esp8266/tutorial/powerctrl.html

Podemos subir la frecuencia a cambio de más consumo de bateria.
La idea seria subirla cuando necesitamos y luego bajarla

>>> import machine
>>> machine.freq()
80000000
>>> machine.freq(160000000)
>>> machine.freq()
160000000



# Deep-sleep / bajo consumo
http://docs.micropython.org/en/latest/esp8266/esp8266/tutorial/powerctrl.html#deep-sleep-mode

Dejarl el dispositivo en un modo de bajo consumo
