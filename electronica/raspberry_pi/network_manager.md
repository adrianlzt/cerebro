Podemos cambiar la gestión de la red para usar NetworkManager, más potente que los scripts usados en /etc/network

Notas de como hacerlo y problemas varios de la gente
https://gist.github.com/jjsanderson/ab2407ab5fd07feb2bc5e681b14a537a


Instalación

apt-get install network-manager

add line:
/etc/dhcpcd.conf
denyinterfaces wlan0


/etc/NetworkManager/NetworkManager.conf:
[main]
plugins=ifupdown,keyfile
dhcp=internal
[ifupdown]
managed=true

Una vez reinicié solo me faltó conectar a la wifi con:
nmcli dev wifi connect RED password PASSWORD

En realidad no se si coge la conf de esa conex o del wpa_supplicant.conf
