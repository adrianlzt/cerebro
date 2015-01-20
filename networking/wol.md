Wake On Lan
https://wiki.archlinux.org/index.php/Wake-on-LAN

En el pc que queramos despertar:
sudo apt-get install ethtool
sudo ethtool <NIC>
  Buscar algo tipo "Supports Wake-on" y ver que tiene la letra 'g' (MagicPacket)
Poner ese modo como el de wake on
sudo ethtool -s <NIC> wol g

Este cambio se revertirá cada vez que arranquemos de nuevo nuestra distribución de Linux.
Ver la wiki de arch para ver las opciones que hay para aplicar el cambio en cada inicio.

Parece que el WOL no sobrevive a reinicios.
Puede que sea necesario definir un parametro en la tarjeta de red:
http://web.archive.org/web/20080424041500/http://ahh.sourceforge.net/wol/faq.html

sudo apt-get install wakeonlan
wakeonlan 2c:75:ee:11:a2:7b


Funciona enviado un paquete UDP a la dirección 255.255.255.255 (ff:ff:ff:ff:ff:ff) al puerto 9
En el se especifica la mac del pc a levantar.
