http://www.micropython.org/

https://www.kickstarter.com/projects/214379695/micropython-on-the-esp8266-beautifully-easy-iot

Start guide: https://docs.micropython.org/en/latest/esp8266/esp8266/tutorial/intro.html#intro

1.- Bajar el firmware de http://www.micropython.org/download#esp8266

2.- Flashearlo (pacman -S esptool)
sudo esptool --port /dev/ttyUSB0 erase_flash
sudo esptool.py --port /dev/ttyUSB0 --baud 460800 write_flash --flash_size=detect -fm dio 0 esp8266-*.bin

3.- Acceder a la consola
mirar mpfshell.md

sudo picocom -b 115200 /dev/ttyUSB0

Encender el led y apagarlo:
> import machine
> pin = machine.Pin(2, machine.Pin.OUT)
> pin.on() # apagar el led (pin voltaje a 3.3v)
> pin.off() # encender el led


4.- Activar el web repl
import webrepl_setup
Definirle alguna pass corta (1234 por ejemplo)

4.- Acceder al REPL via wifi
Conectar a la wifi MicroPython-xxxxxx (x’s are replaced with part of the MAC address of your device (so will be the same everytime)
Password wifi: micropythoN

Entrar en la web con el cliente repl
http://micropython.org/webrepl/
Conectar, meter la pass, y ya tenemos acceso.

Si queremos acceso via cli podemos usar wscat:
wscat -c "ws://192.168.4.1:8266"
  No me funciona, no me deja meter la password



# Workflow de trabajo
Un terminal siempre dentro de mpfshell.
Editamos código/configuraciones.
Las subimos con "put xxx" con mpfshell.
Saltamos a la consola "repl"
Control+d para darle un reset al nodemcu.
Vemos como funciona.
Paramos la ejecución con Control+c
Saltamos al repl de mpfshell con Control+]
Modificamos código/config
Subimos los nuevos ficheros
...
