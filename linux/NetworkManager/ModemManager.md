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

Probar conex (sin necesidad de meter un routing)
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
