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
