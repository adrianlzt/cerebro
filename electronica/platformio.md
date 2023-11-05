https://platformio.org/

aur/platformio

Si ya tenemos un fichero platformio.ini podemos hacer el build con:
pio run

En el caso de que tengamos varios "env" dentro, podemos seleccionar uno con:
pio run -e t-camera-v162

Para subirlo a la tarjeta (esto parece que hace build + upload):
pio run -e t-camera-v162 -t upload

Para conectar un terminal con el device
pio device monitor


# Espressif32
Actualizar la versión de Espressif32
pio pkg update -g -p espressif32


# Board
Para ver las boards disponibles
https://registry.platformio.org/platforms/platformio/espressif32/boards

Por ejemplo:
```
[env:lolin_c3_mini]
platform = espressif32
board = lolin_c3_mini
```


# Errores

## undefined reference to `esp_ble_gap_stop_scanning'
Compilando uno de los ejemplos oficiales.
Faltaba meter en sdkconfig.nombreenv
CONFIG_BT_BLE_42_FEATURES_SUPPORTED=y

Visto en https://github.com/esphome/issues/issues/3580
