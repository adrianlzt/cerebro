Si las redes virtuales no arrancan:
http://wiki.libvirt.org/page/Virtual_network_'default'_has_not_been_started

Editar /etc/dnsmasq.conf
-#listen-address=
+listen-address=127.0.0.1, 192.168.0.101
-#bind-interfaces
+bind-interfaces

En vez de unir a un address, también se puede hacer a una interfaz:
interface=

service dnsmasq restart
virsh net-start nombre_red_virtual
