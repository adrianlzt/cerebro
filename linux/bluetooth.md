https://wiki.archlinux.org/index.php/bluetooth

Parece que el soporte de audio bluetooth en linux es bastante malo
https://www.reddit.com/r/galaxybuds/comments/g4so4t/using_the_microphone_on_ubuntu_1804/
Tener audio + micro parece que solo se consigue con un "hack" y que la calidad del audio es muy mala.


gnome-control-center viene con un gestor bluetooth.
sudo pacman -S bluez bluez-utils blueberry
sudo modprobe btusb
sudo rfkill unblock bluetooth
sudo systemctl start bluetooth.service
blueberry

https://bbs.archlinux.org/viewtopic.php?id=226325
Mala calidad de audio? ejecutar
pacmd set-card-profile 2 a2dp_sink

si no es el index 2 mirar con
pacmd list-sinks | grep -A 1 index
  buscar por el sink bluez




Mirar si tenemos bluetooth (en mi pc no sale nada, pero si tiene bt):
lspci | grep -i bluetooth

Para ver herramientas que tenemos mirar bluez-utils

Para ver el dispositivo que tenemos:
btmgmt info


Ralink (Mediatek) RT3290/RT3298LE parece que da problemas
https://github.com/loimu/rtbth-dkms/
https://aur.archlinux.org/packages/rtbth-dkms/
https://aur.archlinux.org/packages/rtbth-dkms-git/


# Consola
bluetoothctl
> devices
> pair 90:03:B7:77:03:7B

Para buscar:
> scan on
Para dejar de buscar:
> scan off

Conectar:
> connect 80:xx:xx

bluetoothctl devices
  listado de dispositivos encontrados

bluetoothctl paired-devices
  dispositivos con los que se ha hecho pairing (no necesariamente conectados)


bluetoothctl info xx:xx:xx:xx:xx:xx
bluetoothctl pair xx:xx:xx:xx:xx:xx

bluetoothctl disconnect xx:xx:xx:xx:xx:xx
  desconectar, se mantiene el pairing

# BLE

Parece que algunos dispositivos utilizan los mensajes de advertisment (beacons) para enviar información. Mirar ejemplo
del termómetro de xiaomi en la sección Debug.

Para cada UUID se le asocia un handle.
Mirar como sacarlos con un script de python en python/bluetooth.md


## beacon
Estructura de distintos mensajes beacon de distintos fabricantes
https://ukbaz.github.io/howto/beacon_scan_cmd_line.html


## bluetoothctl/GATT
Si con bluetoothctl concectamos a un BLE bin GATT, nos hace un dump de las caracterísitcas/servicios poniendo el nombre de aquellas conocidas



Obtener atributos

bluetoothctl gatt.list-attributes 84:0D:8E:XX:XX:XX

> read-value 0x10
> register-notify 0x10

## gatttool
Escribir un mensaje (hex) en un handle determinado.
gatttool -b 2C:11:05:11:62:AE --char-write-req --handle=0x0018 --value=6c65642c6f6e

Si se ejecuta bien nos da un RC=0 y un texto "Characteristic value was written successfully"

Para saber que handle:
gatttool -b 2C:11:05:11:62:AE --characteristics



## btgatt-client
btgatt-client -d 84:0D:8E:3F:0E:7A

Encuentra los services y atributos automáticamente.
Pero no hace la traducción de UUIDs a que significan (en wireshark si lo puedo ver)


# python
usar mirar python/bluetooth.md


# bettercap
Interesante para analizar trazas de bluetooth


# App web
https://web.dev/bluetooth/

Para conectar con un dispositivo UART via BLE
https://wiki.makerdiary.com/web-device-cli/


# Debug
Explicación de la ingeneria inversa para obtener info de los advertisment de Xiaomi donde envía la temperatura y la humedad
https://custom-components.github.io/ble_monitor/MiBeacon_protocol

## btmon
Sustituye a hcidump

btmon --write hcitrace.snoop | tee hcitrace.txt

En otra consola activamos el scan
bluetootctl
> scan on

El fichero hcitrace.snoop lo podemos abrir con wireshark



## hcidump
bluez-hcidump
Analyses Bluetooth HCI packets

https://custom-components.github.io/ble_monitor/faq#my-sensor-is-not-in-the-list-of-supported-ones-how-to-request-implementation
Aqui lo usan para recolectar info de dispositivos BLE y extraer info de ellos.


Si ejecutamos "hcidump" veremos los mensajes que recibe nuestro dispositivo bluetooth de otros dispositivos.
