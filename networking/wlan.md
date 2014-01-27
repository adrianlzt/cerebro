http://www.cyberciti.biz/tips/linux-find-out-wireless-network-speed-signal-strength.html

Configuración de interfaces wlan.


Información de la interfaz:
cat /proc/net/wireless
iwconfig wlan0 | grep -i --color signal
lspci -vv -s 0c:00.0
