# ESP32-CAM
Cámara montada sobra una placa con un ESP32.

Se puede poner cámaras con mayor ángulo de visión.
La OV2640 tiene 160º en vez de los 74º de la cámara estandar.

Librerías para interactuar con la cámara: https://github.com/espressif/esp32-camera

## ESPHome
Podemos usar ESPHome para crear un firmware para usar com HomeAssistant.
https://esphome.io/components/esp32_camera.html#configuration-for-ai-thinker-camera

## Micropython
mirar micropython/camara.md


## Otros modelos
https://projetsdiy.fr/esp32-cam-choix-modele-2021-aithinker-ttgo-m5stack/

## Lilygo-Camera
http://www.lilygo.cn/prod_view.aspx?TypeId=50030&Id=1273&FId=t3:50030:3
https://es.aliexpress.com/item/32968683765.html?gatewayAdapt=glo2esp
LILYGO® TTGO T-Camera ESP32 WROVER y PSRAM módulo de cámara ESP32-WROVER-B OV2640 módulo de cámara 0,96 OLED

Parece que hay una versión más moderna:
https://www.tindie.com/products/lilygo/lilygo-t-camera-s3-esp32-s3-esp32-cam-2-million/

La que compré era la versión OV2640_V1.6.2
20190731
ESP32-D0WDQ6 V3 (no es esp32-s3)

ESP32 con cámara, sensor de movimiento, pantalla y dos botones.

Schematic:
https://github.com/Xinyuan-LilyGO/LilyGo-Camera-Series/blob/master/schematic/T_CameraV162_Schematic.pdf

Parece que tiene PSRAM, visto al arrancar esphome
[14:10:20][C][psram:020]: PSRAM:
[14:10:20][C][psram:021]:   Available: YES
[14:10:20][C][psram:024]:   Size: 4095 KB

### Firmware
Firmware, ejemplos, links a las distintas versiones, etc:
https://github.com/Xinyuan-LilyGO/LilyGo-Camera-Series

Este firmaware no me funciona
https://github.com/Xinyuan-LilyGO/LilyGo-Camera-Series/blob/master/firmware/t-camera-v1.6_with_mic.bin
Al conectar saca todo el rato el error:
```
rst:0x10 (RTCWDT_RTC_RESET),boot:0x13 (SPI_FAST_FLASH_BOOT)
invalid header: 0xffffffff
```

Probando con esphome, con los ficheros de ejemplo que vienen en el repo de Xinyuan-LilyGO.
Captura imágenes correctamente.

Con platformio también funciona correctamente. Probado LilyGo-Camera-Series/examples/sketch



## Ai Thinker
http://www.ai-thinker.com/pro_view-24.html
https://www.arducam.com/esp32-machine-vision-learning-guide/
https://dronebotworkshop.com/esp32-cam-intro/
https://www.kubii.es/tarjetas-de-extension/3324-placa-de-desarrollo-esp32-cam-wifi-3272496306448.html

Viene sin puerto USB.
Hace falta un adaptador FTDI (UART to USB)

Podemos usar otro ESP32/ESP8266 como programador (alguna de las placas que vienen con puerto USB)
https://www.instructables.com/Programming-ESP32-CAM-With-ESP8266/
  como conectar un ESP8266 para programar la cámara y como cargar un programa de ejemplo que monta un server web en la cámara para mostrar las imágenes
  tras subir, quitar el cable de programación, desconectar el ESP8266, conectar a 5v y esperar a que aparezca el device en la wifi.
  Luego acceder a http://IP


Guía paa solucionar problemas
https://randomnerdtutorials.com/esp32-cam-troubleshooting-guide/

ESP_ERR_NOT_FOUND
  mirar en el .ino si solo tenemos un único define descomentado

Brownout detector was triggered
  tuve que desconectarlo del ESP8266 y alimentarlo directamente con 5v (otros pines distintos)
  No tengo claro si puedo alimentarlo al mismo tiempo que está conectado al puerto serie, no lo he probado


### Conectar una antena wifi externa
Por si queremos más rango
https://tropratik.fr/programmer-esp32-cam-avec-arduino


### Flash
Tiene un pequeño led que se puede usar como flash si no usamos la tarjeta microsd.
Mirar https://projetsdiy.fr/esp32-cam-aithinker-flash-firmware-test/
    Utiliser la LED Flash dans vos projets


### Consumo de energía
https://www.waveshare.com/esp32-cam.htm#:~:text=Deep%2DSleep%3A%20as%20low%20as,low%20as%206.7mA%405V

Flash off: 180mA@5V
Flash on and brightness max: 310mA@5V
Deep-Sleep: as low as 6mA@5V
Modern-Sleep: as low as 20mA@5V
Light-Sleep: as low as 6.7mA@5V
