Agregar múltiples interfaces físicas a una lógica

http://www.linuxfoundation.org/collaborate/workgroups/networking/bonding#Bonding_Driver_Options
http://www.codekoala.com/blog/2012/bonding-eth0-and-wlan0-arch-linux/


Ejemplo:
auto eth1
iface eth1 inet manual
    bond-master ha
    bond-primary eth1 eth2
    pre-up      /sbin/ethtool -s $IFACE speed 1000 duplex full

auto eth2
iface eth2 inet manual
        bond-master ha
        bond-primary eth1 eth2
        pre-up          /sbin/ethtool -s $IFACE speed 1000 duplex full

auto ha
iface ha inet static
    address 10.0.0.1
    netmask 255.255.255.0
    mtu 9000
    bond-slaves none
        bond-mode balance-rr
    bond-miimon 100
