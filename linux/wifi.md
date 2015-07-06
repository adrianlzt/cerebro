http://substack.net/wireless_from_the_command_line_in_linux

Numero de redes en cada canal
sudo iwlist wlo1 scan | grep Frequency | sort | uniq -c | sort -n

Información sobre la conexión actual (podemos saber el canal comparando esta salida con la de iwlist)
sudo iwconfig wlo1

Calidad del enlace
sudo iwconfig wlo1 | grep -i --color quality



10.58.242.242
255.248.0.0
10.63.255.254

# Errores
wlo1      Interface doesn't support scanning : Network is down

Hacer:
sudo ifconfig wlo1 up

# NetworkManager
El mejor sin duda.

Para desactivar el que maneje una cierta interfaz:
/etc/NetworkManager/NetworkManager.conf
[keyfile]
#unmanaged-devices=mac:74:de:2b:ef:5b:71


# Connman
https://wiki.archlinux.org/index.php/Connman
pacman -S connman


# Wifi Radar
https://wiki.archlinux.org/index.php/Wifi_Radar
pacman -S wifi-radar

Muy cutre


# Wavemon
wavemon is a ncurses-based monitoring application for wireless network devices. It displays continuously updated information about signal levels as well as wireless-specific and general network information.

packer -S wavemon

