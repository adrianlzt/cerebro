Nuevo (rhel7): team driver

Agregar múltiples interfaces físicas a una lógica

Need redundancy or increased throughput for your network? Bonding can help. Bonding allows the combination of two or more network interfaces resulting in a highly available or efficient network.

https://access.redhat.com/site/articles/172483
http://www.linuxfoundation.org/collaborate/workgroups/networking/bonding#Bonding_Driver_Options
http://www.codekoala.com/blog/2012/bonding-eth0-and-wlan0-arch-linux/

El bonding puede ser de varios tipos
 0 round-robin, por defecto, se transmite cada paquete por una interfaz
 1 active-backup, solo se usa interfaz, la otra pasa a activa si cae la primera. La MAC de la interfaz bond solo esta visible en una de las interfaces
 2 balance-xor se elegie una u otra según una operación (XOR entre la smac y la dmac)
 3 broadcast, transmite todo en todas las interfaces
 4 802.3ad crea grupos de agregación que tengan la misma velocidad y configuraciones de duples
 5 balance tlb, adaptative transmit load balancing. No requiere un switch aware.

Configuraciones en /etc/sysconfig/network-scripts/ifcfg-*

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
