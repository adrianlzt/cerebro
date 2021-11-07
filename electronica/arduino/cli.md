https://github.com/arduino/arduino-cli

yay arduino-cli


Actualiar bbdd:
arduino-cli core update-index


Listar boards conectadas:
arduino-cli board list


Si no sale la nuestra, buscarla con:
arduino-cli board listall NOMBRE

Instalar el core de la board (sin la tercera parte separada por :)
arduino-cli core install esp8266:esp8266

Buscar librería:
arduino-cli lib search debouncer

Instalar libreria:
arduino-cli lib install FTDebouncer

Las librerias se bajan en ~/.arduino15/
Se instalan en /home/adrian/Arduino/libraries/


Compilar (dentro del dir del Sketch, el fichero .ino debe llamarse como el directorio):
arduino-cli compile --fqbn esp8266:esp8266:nodemcuv2 .

Opciones para la compilación:
arduino-cli compile --show-properties --fqbn esp32:esp32:esp32doit-devkit-v1


Upload:
arduino-cli upload --fqbn esp8266:esp8266:nodemcuv2 -p /dev/ttyUSB0 .

Consola (control+a control+x para salir, doble c+a si estamos en tmux):
picocom -b 115200 /dev/ttyUSB0
