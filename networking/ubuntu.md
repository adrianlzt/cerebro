http://www.cyberciti.biz/faq/setting-up-an-network-interfaces-file/

El fichero principal es
/etc/network/interfaces
Pero suele tener configurado:
source /etc/network/interfaces.d/*.cfg


# IP estatica
iface eth0 inet static
  address 192.168.1.5
  netmask 255.255.255.0
  gateway 192.168.1.254

# DHCP
auto eth0
iface eth0 inet dhcp
