Virtualbox.
No pueden correr al mismo tiempo.


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


Cannot find suitable CPU model for given data during VM starting
Solución:
This was fixed by stopping libvirt, removing all files on /var/cache/libvirt/qemu/capabilities/ and starting it again.
https://bugzilla.redhat.com/show_bug.cgi?id=1160318



Failed to access perfctr msr error
Al cargar el cd de ubuntu.
No es importante el mensaje, se puede omitir: http://unix.stackexchange.com/questions/140973/arch-linux-in-qemu-failed-to-access-perfctr-msr-error
