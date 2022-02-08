https://esphome.io/index.html

Nos permite conectar de manera muy sencilla sensores usando chips ESP32.
En base a un fichero yaml, genera un firmware para instalar en el chip ESP.

Podemos instalarlo con AUR/esphome
O usar la imagen de docker: esphome/esphome


Ahora una web pública que podemos usar para flashear los devices desde 0
https://web.esphome.io/


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


# Conexión con los devices
Over-The-Air Updates:
  Address: esp32-cam.local:3232
API Server:
  Address: esp32-cam.local:6053


# Borrar device descubierto
En la ventana de integraciones, borrar la integración.
Podemos añadirla luego a mano con Add -> ESPHome y metiendo la IP


# Dashboard
docker run --rm --net=host -v "${PWD}":/config -it esphome/esphome

Nos levanta una interfaz web donde podemos crear configuraciones, realizar actualizaciones por wifi (OTA), ver los logs, editar la config, crear dispositivos, etc.


# Sharing devices / BT conf
También es posible dejar el dispositivo listo para ser configurado por BT, por ejemplo, si no conocemos la wifi donde lo vamos a conectar.
https://esphome.io/guides/creators.html

```
# Sets up Bluetooth LE (Only on ESP32) to allow the user
# to provision wifi credentials to the device.
esp32_improv:
  authorizer: none
```


# Protocolo
TCP + protobuffers
https://github.com/esphome/aioesphomeapi
