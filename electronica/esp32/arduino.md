Mirar en ../arduino para como usar esta placa con el ide de arduino

Tenemos que cargar el core esp32: https://github.com/espressif/arduino-esp32/blob/master/docs/arduino-ide/boards_manager.md


arduino-cli core install esp32:esp32
arduino-cli compile --fqbn esp32:esp32:esp32doit-devkit-v1 .
arduino-cli upload --fqbn esp32:esp32:esp32doit-devkit-v1 -p /dev/ttyUSB0

Consola (control+a control+x para salir, doble c+a si estamos en tmux):
picocom -b 115200 /dev/ttyUSB0
