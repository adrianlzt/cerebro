In computer networking, TUN and TAP are virtual-network kernel devices. Being network devices supported entirely in software, they differ from ordinary network devices which are backed up by hardware network adapters.

TUN (namely network TUNnel) simulates a network layer device and it operates with layer 3 packets like IP packets. TAP (namely network tap) simulates a link layer device and it operates with layer 2 packets like Ethernet frames. TUN is used with routing, while TAP is used for creating a network bridge.

Packets sent by an operating system via a TUN/TAP device are delivered to a user-space program which attaches itself to the device. A user-space program may also pass packets into a TUN/TAP device. In this case the TUN/TAP device delivers (or "injects") these packets to the operating-system network stack thus emulating their reception from an external source.

# Instalar
sudo apt-get install uml-utilities

Crear tap
ip tuntap add mode tap br0p0

Crear tun
ip tuntap add mode tun br0p1


Borrar
ip tuntap del mode tap/tun nombre

### MacVTap ###
http://virt.kernelnewbies.org/MacVTap
Macvtap is a new device driver meant to simplify virtualized bridged networking. It replaces the combination of the tun/tap and bridge drivers with a single module based on the macvlan device driver. A macvtap endpoint is a character device that largely follows the tun/tap ioctl interface and can be used directly by kvm/qemu and other hypervisors that support the tun/tap interface. The endpoint extends an existing network interface, the lower device, and has its own mac address on the same ethernet segment. Typically, this is used to make both the guest and the host show up directly on the switch that the host is connected to.

Mejora para máquinas virtuales en vez de bridge:
http://wiki.math.cmu.edu/iki/wiki/tips/20140303-kvm-macvtap.html

Crea una tarjeta de red virtual con su propia MAC.


Configuración:
sudo ip link add link eth1 name macvtap0 type macvtap
sudo ip link set macvtap0 address 1a:46:0b:ca:bc:7b up
ip link show macvtap0
12: macvtap0@eth1: <BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state UNKNOWN
    link/ether 1a:46:0b:ca:bc:7b brd ff:ff:ff:ff:ff:ff

El 12 indica el dispositivo que se habrá creado
/dev/tap12

Deberemos darle permisos si queremos que lo use un usuario normal
sudo chgrp adrian /dev/tap55
sudo chmod g+rw /dev/tap55


Parar borrar
sudo ip link del macvtap0
