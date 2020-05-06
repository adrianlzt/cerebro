Podemos controlar el led de la placa
https://www.raspberrypi.org/forums/viewtopic.php?t=12530#p136266

echo none > /sys/devices/platform/leds/leds/led0/trigger
para evitar que lo controle los accesos a la sdcard


encender
echo 0 > /sys/devices/platform/leds/leds/led0/brightness

apagar
echo 1 > /sys/devices/platform/leds/leds/led0/brightness



# Módules kernel para controlar el led

## Heartbeat
https://cateee.net/lkddb/web-lkddb/LEDS_TRIGGER_HEARTBEAT.html
This allows LEDs to be controlled by a CPU load average. The flash frequency is a hyperbolic function of the 1-minute load average
modprobe ledtrig_heartbeat
echo heartbeat > trigger


## Timer
modprobe ledtrig_timer
echo timer > trigger


Para controlar como parpadea (en ms)
echo 100 > delay_on
