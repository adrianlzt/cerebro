https://learn.adafruit.com/raspberry-pi-zero-creation/enable-uart

Necesitamos meter una linea en /boot/config.txt
enable_uart=1

Cable verde pin inferior
Blanco superior.

Usar cable uart-to-usb.
No usar cable rojo (voltaje) si ya alimentamos con el puerto de PWR.

minicom --device /dev/ttyUSB1
minicom -b 9600 -D /dev/ttyUSB0
