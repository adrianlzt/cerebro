http://www.nodemcu.com/docs/gpio-module/


# Escribir
pin=1
gpio.mode(pin, gpio.OUTPUT)
gpio.write(pin, gpio.HIGH)
gpio.write(pin, gpio.LOW)


# Leer
pin=1
gpio.mode(pin, gpio.INPUT)
gpio.read(pin)
