mirar micropython/rshell.md

Si da problemas, borrar la flash y flahsear de nuevo.


http://nodemcu.readthedocs.org/en/dev/en/upload/
http://lb9mg.no/2015/05/30/first-steps-with-nodemcu/

# esplorer
Arch:
yaourt -S aur/esplorer
http://esp8266.ru/esplorer/
sudo esplorer
  como root para poder escribir en /dev/ttyUSB0

Para enviar código LUA, escribirlo en la ventana de la izquierda y hacer "Sent to ESP"

Si escribimos código lua y luego damos a "Save", nos lo guardará localmente y también lo subira al nodemcu.


# nodemcu-uploader.py
https://github.com/kmpm/nodemcu-uploader
A simple tool for uploading files to the filesystem of an ESP8266 running NodeMCU as well as some other useful commands.
sudo pip install nodemcu-uploader


# luatool
https://github.com/4refr0nt/luatool
Allow easy uploading of any Lua-based script into the ESP8266 flash memory with NodeMcu firmware
