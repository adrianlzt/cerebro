https://developer-old.gnome.org/NetworkManager/stable/NetworkManager.conf.html

Por defecto NetworkManager crea una conexión para cada interfaz ethernet que no tenga una.
Esto implica que esas interfaces estarán solicitando DHCP.

Podemos desactivarlo con:
/etc/NetworkManager/conf.d/no_dhcp.conf
[main]
no-auto-default=*
