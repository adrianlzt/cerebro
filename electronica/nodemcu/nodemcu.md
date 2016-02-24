http://nodemcu.readthedocs.org/en/dev/
https://github.com/nodemcu
https://github.com/nodemcu/nodemcu-devkit-v1.0

Ejemplos de código lua:
https://github.com/nodemcu/nodemcu-firmware/tree/master/examples

Abrir el arduino studio

# Flashearlo
http://nodemcu.readthedocs.org/en/dev/en/flash/
http://www.whatimade.today/flashing-the-nodemcu-firmware-on-the-esp8266-linux-guide/

Podemos bajarnos una imagen custom desde aqui:
http://nodemcu-build.com/

Before flashing firmware, please hold FLASH button, and press RST button once. When our firmware download tool released, it will flash firmware automatically and needn't press any button.
https://github.com/nodemcu/nodemcu-devkit-v1.0

Para subir la imagen al NodeMCU usar esptool-git
http://nodemcu.readthedocs.org/en/dev/en/flash/

Instalarlo en arch:
yaourt -S aur/esptool-git


Cargar el firmware en el nodemcu:
sudo esptool.py --port /dev/ttyUSB0 write_flash -fm dio -fs 32m 0x00000 nodemcu-master-6-modules-2016-02-14-23-31-55-integer.bin
  IMPORTANTE poner los param: -fm dio -fs 32m
   

# Conectando a la consola del nodemcu
Esto deberia devolvernos un prompt ('>') segun conectemos.
Si no lo vemos, pulsar el boton de reset.

Por defecto:
sudo picocom -b 9600 /dev/ttyUSB0

Si queremos podemos subir la velocidad:
> uart.setup(0, 115200, 8, 0, 1, 1 )
sudo picocom -b 115200 /dev/ttyUSB0


Parece que por defecto el nodemcu monta una red wifi (ESP_xxxx) donde el se conecta con ip 192.168.4.1
Contesta a ping, pero si le preguntas por su ip no la conoce.
Si intento enviar un paquete a otra ip no parece funcionar

Mas comandos en el apartado terminal


# Subiendo codigo
http://nodemcu.readthedocs.org/en/dev/en/upload/
http://lb9mg.no/2015/05/30/first-steps-with-nodemcu/

Arch:
yaourt -S aur/esplorer
http://esp8266.ru/esplorer/
sudo esplorer
  como root para poder escribir en /dev/ttyUSB0

nodemcu-uploader.py
https://github.com/kmpm/nodemcu-uploader
A simple tool for uploading files to the filesystem of an ESP8266 running NodeMCU as well as some other useful commands.
sudo pip install nodemcu-uploader


luatool
https://github.com/4refr0nt/luatool
Allow easy uploading of any Lua-based script into the ESP8266 flash memory with NodeMcu firmware



# Terminal

## Wifi
> wifi.setmode(wifi.STATION)
> wifi.sta.config("moto","zarzamora") 
> print(wifi.sta.getip())

