Para máquinas virtuales mejor usar MacVTap
http://wiki.math.cmu.edu/iki/wiki/tips/20140303-kvm-macvtap.html

https://wiki.archlinux.org/index.php/Network_bridge#With_iproute2
ip link add name bridge_name type bridge
ip link set dev bridge_name up

Añadir eth0 al bridge (debe estar en modo promiscuo y up):
ip link set dev eth0 promisc on
ip link set dev eth0 up
ip link set dev eth0 master bridge_name

Tras unir eth0 al bridge me deja de funcionar internet (que salía por eth0).
Configuro el bridge para salir por el:
sudo ip a add 192.168.1.13/24 dev bridge_name
sudo ip r change default via 192.168.1.1 dev bridge_name


Mostrar bridges
bridge link show
  solo muestra bridges con interfaces conectadas
brctl show

Para borrar un bridge primero sacar las interfaces unidas
ip link set eth0 promisc off
ip link set eth0 down
ip link set dev eth0 nomaster
ip link delete bridge_name type bridge


## OLD
http://bwachter.lart.info/linux/bridges.html
# brctl addbr br0
# brctl addif br0 eth0
# brctl addif br0 eth1
# ifconfig br0 netmask 255.255.255.0 192.168.32.1 up
