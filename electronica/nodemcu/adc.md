http://www.nodemcu.com/docs/adc-module/

leer el adc es el pin a0
adc.read(0)

Nos devuelve un valor entre 0 y 1024
Solo puede leer entre 0 y 1v.

PERO en las devkit viene ya con un divisor para poder usar 0-3.3
https://randomnerdtutorials.com/esp8266-adc-reading-analog-values-with-nodemcu/

Si queremos leer valores mayores deberemos usar un divisor de tensión:

http://randomnerdtutorials.com/esp8266-adc-reading-analog-values-with-nodemcu/
Voltage Divider to 3.3V to 1.0V
