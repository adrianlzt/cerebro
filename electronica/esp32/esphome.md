https://esphome.io/index.html

Nos permite conectar de manera muy sencilla sensores usando chips ESP32.
En base a un fichero yaml, genera un firmware para instalar en el chip ESP.

Podemos instalarlo con AUR/esphome
O usar la imagen de docker: esphome/esphome


Crear config:
esphome wizard NOMBREFICHERO.yaml

Nos configurará la parte básica del fichero, cosas como:
  - nombre del dispositivo
  - wifi a la que conectar

Luego añadiremos nosotros los módulos que queramos

Para generar el firmware y subirlo:
esphome run --device /dev/ttyUSB2 esp32cam.yaml

Tras flashear la imagen pasará automáticamente a escuchar en el puerto serie.

Si vamos a nuestro HA, a la zona de integrations:
http://IP:8123/config/integrations

Veremos que habrá descubierto el dispositivo.
Tendremos que aceptarlo dando a Configure -> Submit


# Dashboard
docker run --rm --net=host -v "${PWD}":/config -it esphome/esphome

Nos levanta una interfaz web donde podemos crear configuraciones, realizar actualizaciones por wifi (OTA), ver los logs, editar la config, crear dispositivos, etc.
