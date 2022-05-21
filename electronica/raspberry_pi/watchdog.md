Para obtener información:
wdctl


https://raspberrypi.stackexchange.com/a/113193/116452
watchdog con systemd

Editar /etc/systemd/system.conf
[Manager]
RuntimeWatchdogSec=2min


https://diode.io/raspberry%20pi/running-forever-with-the-raspberry-pi-hardware-watchdog-20202/
Usando el daemon watchdog
apt-get install watchdog
