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




Mirar si tenemos bluetooth:
lspci | grep -i bluetooth


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


## bluetoothctl/GATT
Obtener atributos

bluetoothctl gatt.list-attributes 84:0D:8E:XX:XX:XX


# btgatt-client
btgatt-client -d 84:0D:8E:3F:0E:7A

Encuentra los services y atributos automáticamente.
Pero no hace la traducción de UUIDs a que significan (en wireshark si lo puedo ver)



# bettercap
Interesante para analizar trazas de bluetooth
