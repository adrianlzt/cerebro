https://modemmanager.org/
  no tienen doc de uso! O_o
https://www.freedesktop.org/software/ModemManager/man/latest/mmcli.1.html

Issue para integrar con systemd donde explica los pasos manuales para conectar:
https://github.com/systemd/systemd/issues/20370

Otra aplicación que trabaja junto a NetworkManager para configurar modems

apt install -y modemmanager

Su cli es mmcli (dos 'm'!)

Listar modems
mmcli --list-modems

Para muchos de los comandos esatmos obligados a pasar el modem a usar (el id lo vemos en --list-modems):
mmcli -m 0 ...

Volcar toda la info de un modem
mmcli -m 0

El output se puede sacar en formato JSON (-J) o key-value (-K)


# GSM/3G/4G
Escanear redes:
mmcli -m 0 --3gpp-scan --timeout=300

Conectar los datos:
mmcli -m 0 --simple-connect="pin=1234,apn=internet"
mmcli -m 0 --simple-connect="apn=orange,user=orange,password=orange,ip-type=ipv4v6,allow-roaming=yes"
mmcli -m 0 --simple-connect="apn=movistar.es,user=movistar,password=movistar,ip-type=ipv4v6,allow-roaming=yes"

Para saber si estamos conectados buscar el "bearer" del modem:
mmcli -m 1 | tail -4
Ejemplo:
Bearer   |               dbus path: /org/freedesktop/ModemManager1/Bearer/1

Y para ver la info de esa conex (ponemos el id del bearer):
mmcli -b 1
Aqui podemos ver la IP y gateway

Si no estamos conectados y tenemos el bearer configurado, podemos hacer:
mmcli -b 1 -c

Con el hat 4g para raspberry parece que necesito
/usr/bin/qmicli -d /dev/cdc-wdm0 -E raw-ip

La ip tendremos que configurarla a mano en la wwan0 (o tal vez con udhcpd?)
ip a a 10.226.56.208/27 dev wwan0
ip link set wwan0 up
  si no está up la intefaz

Probar conex (sin necesidad de meter un routing). No intentar contra el gateway, no contesta.
ping -I wwan0 1.1.1.1


Desconectar
mmcli -m 0 --simple-disconnect

Otra opción para desconectar:
mmcli -b 0 -x


# GPS / GNSS / Localización
Ver que tipos de localización provee y cuales están activos:
mmcli -m 0 --location-status

Activar localización por GPS y AGPS:
mmcli -m 0 --location-enable-agps-msa --location-enable-gps-raw --location-enable-gps-nmea

Hay un gps-unmanaged por si estamos usando el puerto con otro software (gpsd o algo asi)

Obtener datos de localización:
mmcli -m 0 --location-get

Si no tengo posición veré algo tipo:
  GPS | nmea: $GPGSA,A,1,,,,,,,,,,,,,,,,*32
      |       $GNGNS,,,,,,NNN,,,,,,*1D
      |       $GPRMC,,V,,,,,,,,,,N*53
      |       $PQXFI,,,,,,,,,,*56
      |       $GNGSA,A,1,,,,,,,,,,,,,,,,*2C
      |       $BDGSA,A,1,,,,,,,,,,,,,,,*0F
      |       $GPGSV,1,1,01,40,,,34,1*66
      |       $GLGSV,1,1,01,,,,18,1*70
      |       $GPGGA,,,,,,0,,,,,,,,*66
      |       $GPVTG,,T,,M,,N,,K,N*2C


Si tengo GPSs a la vista algo más tipo:
  GPS | nmea: $GPGSA,A,2,01,10,14,17,32,,,,,,,,3.0,2.8,0.9*31
      |       $GNGNS,194135.00,4510.878819,N,00544.224017,E,AAN,07,2.8,229.5,49.0,,,V*6B
      |       $GPRMC,194135.00,A,4510.878819,N,00544.224017,E,0.0,,210323,0.8,W,A*0B
      |       $PQXFI,194135.0,4510.878819,N,00544.224017,E,229.5,10.39,3.05,0.11*55
      |       $GNGSA,A,2,87,88,,,,,,,,,,,3.0,2.8,0.9,2*3C
      |       $BDGSA,A,2,12,,,,,,,,,,,,3.0,2.8,0.9,4*39
      |       $GPGSV,3,1,10,01,60,307,38,10,11,052,29,14,21,289,33,17,11,316,34,1*62
$GPGSV,3,2,10,21,77,021,25,27,15,151,23,32,35,064,37,03,34,232,,1*60
$GPGSV,3,3,10,08,46,167,,22,39,109,,1*6D
      |       $GLGSV,3,2,11,71,57,053,22,86,48,098,,77,01,255,,79,04,355,,1*72
      |       $GPGGA,194135.00,4510.878819,N,00544.224017,E,1,05,2.8,229.5,M,49.0,M,,*69
      |       $GPVTG,,T,0.8,M,0.0,N,0.0,K,A*05
      |       $BDGSV,2,2,06,05,17,116,,06,17,061,,0,4*68



mmcli -m 0 --location-enable-gps-nmea
Enable location discovery using GPS and reported with NMEA traces.

mmcli -m 0 --location-disable-gps-nmea
Disable location discovery using GPS and NMEA traces.

mmcli -m 0 --location-get-gps-nmea
Show GPS based location with NMEA trace information.


# Fecha
Obtener la fecha provista por el operador
mmcli -m 0 --time

# SMS
Podemos crear y leer SMSs


# Integración con NetworkManager
Una vez comprobemos que podemos conectar usando mmcli, podemos configurar NetworkManager

https://techship.com/faq/using-networkmanager-and-modemmanager-in-linux-to-automatically-establish-and-maintain-a-connection/

Comprobar que vemos el dispositivo:
nmcli device status

DEVICE         TYPE      STATE                   CONNECTION
cdc-wdm0       gsm       disconnected            --


nmcli d show cdc-wdm0

Mirar en nmcli.md para crear una conex type gsm

Parece que tengo problemas con el dhcp.
He ignorado la interfaz en dhcpcd (denyinterfaces).

Parece que necesito ejecutar esto antes:
/usr/bin/qmicli -d /dev/cdc-wdm0 -E raw-ip

Luego tras un reinicio parece que ya se ha quedado bien configurado y funciona la conex de NetworkManager bien.
