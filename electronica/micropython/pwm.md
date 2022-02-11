http://docs.micropython.org/en/latest/esp8266/esp8266/tutorial/pwm.html

# Parpadear el pin a 10Hz
from machine import Pin, PWM
led = machine.Pin(2)
p = PWM(led, 10)
