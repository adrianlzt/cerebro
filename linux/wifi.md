http://substack.net/wireless_from_the_command_line_in_linux

mirar NetworkManager/nmcli.md


AP-STA mode, cuando una wifi es access point y client (station).
https://docs.raspap.com/ap-sta/
iw list
Para entender la salida: https://unix.stackexchange.com/a/401467/145035
{ managed } <= 1, #{ AP } <= 1, #{ P2P-client } <= 1, #{ P2P-device } <= 1, total <= 4, #channels <= 1
En este ejemplo, si entiendo bien, es que podemos tener 4 interfaces en ese adaptador, de las cuales podemos tener una
managed, un AP, un P2P-client y un P2P-device.
Mirar NetworkManager/wifi_ap_sta.md


wavemon
ncurses para ver el estado de la wifi y la lista de redes


Comprobar si esta habilitado:
rfkill list

Habilitar
rfkill unblock wifi

Ver el ESSID a donde estamos conectados
iwgetid -r

Podemos también usar (nos abrirá una consola propia donde con help podemos navegar)
iwctl
 > device list
 > station device get-networks
 > station device connect SSID

Conectar a una wifi:
nmcli device wifi list
sudo ip l set wlan0 up
  sudo ifconfig wlo1 up
  antiguo
nmcli device wifi connect 'nombrred' password 'contraseña' ifname wlo1

Mostrar a donde estamos conectados, su pass y un bidi de conexión:
nmcli dev wifi show


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

Si queremos saber las DNS asignadas por DHCP:
nmcli d show wlo1

Tal vez tenemos que usar esas DNS si no no funciona la resolución (wifis capando el resto de dns)


# Conectar a una wifi con wpa
wpa_passphrase "nombreRed"
  nos pedira la contraseña

Meter la respuesta en /etc/wpa_supplicant/wpa_supplicant.conf

wpa_cli -i wlan0 reconfigure

Comprobar:
ifconfig wlan0


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
