Alamcena la configuración en /etc/NetworkManager

Para desactivar un dispositivo (para que no lo maneje networkmanager):

/etc/NetworkManager/NetworkManager.conf
[keyfile]
#unmanaged-devices=mac:74:de:2b:ef:5b:71

systemctl restart NetworkManager


Propiedades:
https://developer.gnome.org/NetworkManager/stable/ref-settings.html
