http://www.linux-kvm.org/page/Networking

Con virt-manager nos permite crear las interfazes de red.

Cuidado con que tipo de driver usamos porque virtio (el de por defecto) no lo reconocen algunos linux. Mejor usar e1000.

Si quiero que la máquina parezca conectada a la red de la máquina host, crear una interfaz bridge.
Fuente de red: Dispositivo de equipo eth1: macvtap
Modo de fuente: Bridge

Este bridge no permite comunicación entre la VW y el host, por o que creamos otra interfaz de red para esto:
Red virtual 'default': NAT


En una máquina tuve problemas porque había una interfaz virbr0 con la misma ip que la segunda interfaz. La desconfigure y borre su ruta y funcionó la conexión host VM.


# MAC
Siempre empezar por un numero impar (To qualify as a unicast address the first byte must be even)


# DHCP
Las redes internas que monta libvirt llevan por defecto un servidor DHCP.
Si queremos eliminarlo tendremos que editar el fichero de la red correspondiente almacenado en:
/etc/libvirt/qemu/networks
Y reiniciamos libvirt
/etc/init.d/libvirt-bin restart


# TAP
No se como hacerlo manualmente. virsh lo hace.

Crear bridge y asociarle una ip:
ip link add name kvm type bridge
ip link set dev kvm up
ip addr add 10.0.0.1/24 dev kvm

Crear un tap y unirlo al bridge
ip tuntap add mode tap vm1
vm1 en modo promiscuo?
ip link set dev vm1 master kvm

crea tap por cada nueva vm
une esos taps al bridge
el bridge no esta unido a eth1. Parece que puede salir a internet por reglas de iptables de la tabla nat.
Estas reglas las crea /usr/sbin/libvirtd al arrancar segun las redes que tiene en /etc/libvirt/qemu/networks/
Chain POSTROUTING (policy ACCEPT)
target     prot opt source               destination         
RETURN     all  --  192.168.122.0/24     224.0.0.0/24        
RETURN     all  --  192.168.122.0/24     255.255.255.255     
MASQUERADE  tcp  --  192.168.122.0/24    !192.168.122.0/24     masq ports: 1024-65535
MASQUERADE  udp  --  192.168.122.0/24    !192.168.122.0/24     masq ports: 1024-65535
MASQUERADE  all  --  192.168.122.0/24    !192.168.122.0/24    


No se como abrir un FD para que se conecte la VM.
-netdev tap,fd=22,id=hostnet0 -device e1000,netdev=hostnet0,id=net0,mac=52:54:00:df:5c:9b,bus=pci.0,addr=0x3

Cuando levantemos una máquina conectada al tap, y mediante este al br, deberemos configurar una ip de la misma red que el tap, y pondremos el tap como default route.


# BRIDGE
Conexión de dos máquinas entre si
O también para que una máquina se conecte a la LAN del anfitrion.

ip link add br0 type bridge

Creo que esta era la forma antigua de ejecutar el comando anterior:
brctl addbr br0
ip l set dev br0 up

Ver los devices tipo brige (deberemos ver el br0)
ip link show type bridge

Una vez tenemos el interface br0, le unimos la interfaz física.
Esto no es necesario si solo queremos interconectar dos VMs, saltar a los comandos de qemu
ip link set enp1s0 master br0

Ver las interfaces conectadas a br0
ip link show master br0



sudo qemu-system-x86_64 -enable-kvm -name adri1 -cdrom /home/adrian/Descargas/Core-current.iso -netdev bridge,id=hn0 -device virtio-net-pci,netdev=hn0,id=nic1,mac=32:22:33:44:55:66
sudo qemu-system-x86_64 -enable-kvm -name adri2 -cdrom /home/adrian/Descargas/Core-current.iso -netdev bridge,id=hn0 -device virtio-net-pci,netdev=hn0,id=nic1,mac=32:22:33:44:55:67
Se hacen ping, y tambien al bridge si le damos ip, pero no se si por el cutre-linux o por otra cosa, no consigo establecer ningún tipo de conex tcp.

# VDE
Desd el 2011 sin desarrollo
mirar networking/vde.md

http://sourceforge.net/p/vde/discussion/330526/thread/937dd00d/
https://wiki.debian.org/QEMU#QEMU_networking_with_VDE
http://sourceforge.net/p/vde/discussion/330526/thread/78421792/

