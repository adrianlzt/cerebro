mirar ../bluetooth.md para datos generales sobre bluetooth



# esp32
http://www.neilkolban.com/esp32/docs/cpp_utils/html/class_b_l_e_characteristic.html#a57431e7893554f12c34d45889475d4d2
  referencia
https://github.com/espressif/arduino-esp32/tree/master/libraries/BLE/examples
https://github.com/nkolban/esp32-snippets/blob/master/Documentation/BLE%20C%2B%2B%20Guide.pdf
https://randomnerdtutorials.com/esp32-bluetooth-low-energy-ble-arduino-ide/

Por defecto parece que el límite de los menajes son 20 bytes
https://www.esp32.com/viewtopic.php?t=4546

Podemos enviar varios mensajes seguidos, tendrá que ser el cliente el encargado de entenderlo.


# Notify / indicate
https://openlabpro.com/guide/ble-notify-on-esp32-controller/


# UART
https://github.com/espressif/arduino-esp32/blob/master/libraries/BLE/examples/BLE_uart/BLE_uart.ino

Podemos conectar a ese UART con
web app: https://wiki.makerdiary.com/web-device-cli/
android app: BLE Terminal
