"""
Cargarlo:
mpremote cp main.py :

Entrar el repl:
mpremote repl

Dar a control+d para hacer un soft reboot
"""
from machine import Pin
from time import sleep_ms

ONBOARD_LED=2

def main():
    while True:
        led = Pin(ONBOARD_LED, Pin.OUT)
        led.value(1)
        print("Hello World!")
        led.value(0)
        sleep_ms(1000)
