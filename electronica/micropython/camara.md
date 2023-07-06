https://github.com/shariltumin/esp32-cam-micropython-2022
Cámara esp32.

Firmware custom añadiendo soporte para la cámara.


# Lilygo-camera TTGO

Parece que lo que todos intentan es meter el driver de esp32-camera de espressif en micropython.

## shariltumin
Esto parece un build de micropython + github.com/espressif/esp32-camera
https://github.com/shariltumin/esp32-cam-micropython/blob/master/notes/README-BUILD.txt

Probando con https://github.com/shariltumin/esp32-cam-micropython-2022/tree/main/firmwares-20230607/BLE
Da un error
```
MicroPython v1.20.0-162-gd080d427e-kaki5 on 2023-06-07; ESP32-CAM OV2640 BLE (KAKI5) with ESP32
>>> import camera
>>> camera.init()
E (195427) gpio: gpio_install_isr_service(449): GPIO isr service already installed
E (195457) camera: Camera probe failed with error 0x105(ESP_ERR_NOT_FOUND)
E (195457) camera: Camera Init Failed
```

Parece que la línea problemática es:
Camera probe failed with error 0x105(ESP_ERR_NOT_FOUND)

La anterior parece que es un warning omitible.

Probando https://github.com/shariltumin/esp32-cam-micropython-2022/blob/main/firmwares-20230607/WIFI%2BTLS/firmware.bin

# lemariva
https://github.com/lemariva/micropython-camera-driver

Este también es un build de MicroPython con esp32-camera de espressif.


## tsaarni
https://github.com/tsaarni/micropython-with-esp32-cam
Este es un fork de micropython donde mete lo de espressif a mano.


## pianojockl
https://github.com/pianojockl/ttgo-camera-plus-micropython

Para la cámara usa https://github.com/lemariva/micropython-camera-driver
Con los dos ejemplos de camara.init() que tiene en el README no me ha funcionado.


# Build a mano
Siguiendo instrucciones de https://github.com/lemariva/micropython-camera-driver#diy

git clone --recursive https://github.com/micropython/micropython.git
cd micropython
Me falla en mi pc.

Luego he encontrado un repo que intenta hacer el build en un docker
https://github.com/wieck/micropython-esp32-devel

Parece que para el build hace falta tambien esp-idf y xtensa-esp32. Entiendo que esto es para dar el soporte esp32 a micropython.
