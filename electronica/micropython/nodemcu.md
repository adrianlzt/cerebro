http://www.micropython.org/

Start guide: https://docs.micropython.org/en/latest/esp8266/esp8266/tutorial/intro.html#intro

1.- Bajar el firmware de http://www.micropython.org/download

2.- Flashearlo (pacman -S esptool)
sudo esptool --port /dev/ttyUSB0 erase_flash
sudo esptool --port /dev/ttyUSB0 --baud 460800 write_flash --flash_size=detect -fm dio 0 esp8266-20161110-v1.8.6.bin

3.- Acceder a la consola
sudo picocom -b 115200 /dev/ttyUSB0

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



