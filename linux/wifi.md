http://substack.net/wireless_from_the_command_line_in_linux

Numero de redes en cada canal
sudo iwlist wlo1 scan | grep Frequency | sort | uniq -c | sort -n

Información sobre la conexión actual (podemos saber el canal comparando esta salida con la de iwlist)
sudo iwconfig wlo1

Calidad del enlace
sudo iwconfig wlo1 | grep -i --color quality

Datos sobre los interfaces de red:
lshw -C network

Dominio regulador para la wifi:
sudo iw reg get

Para modificarlo: http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
sudo iw reg set ES

vi /etc/default/crda
REGDOMAIN=ES


# Conectar a una wifi con wpa:
wpa_passphrase SSID PASSPHRASE >> /etc/wpa_supplicant.conf
wpa_supplicant -Dwext -iwlan0 -c /etc/wpa_supplicant.conf
dhclient wlan0
ip r add default wlan0 via 192.168.1.1


10.58.242.242
255.248.0.0
10.63.255.254

# Errores
wlo1      Interface doesn't support scanning : Network is down

Hacer:
sudo ifconfig wlo1 up

# NetworkManager
El mejor sin duda.
Entorno gráfico: https://wiki.archlinux.org/index.php/NetworkManager#Other_desktops_and_window_managers

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



# HotSpot
https://wiki.archlinux.org/index.php/software_access_point

https://github.com/oblique/create_ap

Crear red con WPA+WPA2 en la interfaz wlan0 con salida a internet por eth0
create_ap wlan0 eth0 MyAccessPoint MyPassPhrase

sudo create_ap wlo1 enp8s0 Red caballo33
