Hay que ponerle un módulo wifi via un cable usb OTG.
O conectar el usb OTG a un USB hub alimentado y ahi pinchar wifi, teclado, etc

Otra opción, soldarle un móudulo a la placa directamente: http://www.recantha.co.uk/blog/?p=13795


# PizeroW
Esta biene con wifi y bluetooth

Para configurarla
https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md

## A mano
iwlist wlan0 scan

## Varias WIFIs
/etc/wpa_supplicant/wpa_supplicant.conf
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
    ssid="SCHOOLS NETWORK NAME"
    psk="SCHOOLS PASSWORD"
}

network={
    ssid="HOME NETWORK NAME"
    psk="HOME PASSWORD"
}


Parece que si usamos raspi-config para configurar la wifi hace lo mismo, añadir otra entrada.


# Wifi AP
Funcionando con esta config
https://variwiki.com/index.php?title=Wifi_NetworkManager#Configuring_WiFi_Access_Point:~:text=1.3.2-,Creating%20WiFi%20AP,-Use%20the%20following

Sin meter nada en el /etc/udev/rules.d/70-net-wifi-ap.rules (visto en otras webs que usan hostapd en vez de NetworkManager).

nmcli con add type wifi ifname wlan0 mode ap con-name adri ssid adri
nmcli con modify adri 802-11-wireless.band bg
nmcli con modify adri 802-11-wireless.channel 1
nmcli con modify adri ipv4.method shared
nmcli con modify adri 802-11-wireless-security.key-mgmt wpa-psk
nmcli con modify adri 802-11-wireless-security.proto rsn
nmcli con modify adri 802-11-wireless-security.group ccmp
nmcli con modify adri 802-11-wireless-security.pairwise ccmp
nmcli con modify adri 802-11-wireless-security.psk "prueba1234"
nmcli con up adri

