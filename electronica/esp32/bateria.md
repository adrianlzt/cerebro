Consejos para reducir el consumo de batería
https://savjee.be/2019/12/esp32-tips-to-increase-battery-life/#tip-4-reduce-the-clock-speed


# Frecuencia
Bajar a 80Mhz
setCpuFrequencyMhz(80);



# LED rojo
Encendido cuando hay alimentación

https://www.reddit.com/r/esp32/comments/7kyfpx/turn_off_led/

Parece que hay que desoldarlo o cortar la pista que lo alimenta

https://forum.sparkfun.com/viewtopic.php?t=48815
cortando por debajo


# Alimentación
https://techexplorations.com/guides/esp32/begin/power/

Lo más sencillo es conectar un cable al micro USB.

Otra opción es meter 6-7V al pin de 5v y el GND.
