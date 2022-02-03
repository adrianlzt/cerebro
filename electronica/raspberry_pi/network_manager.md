Podemos cambiar la gestión de la red para usar NetworkManager, más potente que los scripts usados en /etc/network


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
