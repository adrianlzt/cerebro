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

Dar al botón de reset tras flashear


# Notas
Use a firmware build without floating point support. This takes up a good chunk of RAM as well
