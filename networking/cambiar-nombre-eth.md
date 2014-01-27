http://mtehrani30.blogspot.com.es/2008/08/ubuntu-change-eth0-to-eth1.html

Borramos las líneas antiguas, y cambiamos los eth nuevos por los eth antiguos.

# vim /etc/udev/rules.d/70-persistent-net.rules
# udevadm trigger
# system-config-network  //volver a seleccionar las interfaces, y darle a guardar.
# /etc/init.d/network restart

Si falla, reiniciar.
