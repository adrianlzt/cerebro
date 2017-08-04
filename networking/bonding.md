Nuevo (rhel7): team driver

Agregar múltiples interfaces físicas a una lógica

Need redundancy or increased throughput for your network? Bonding can help. Bonding allows the combination of two or more network interfaces resulting in a highly available or efficient network.

https://wiki.centos.org/es/TipsAndTricks/BondingInterfaces
https://access.redhat.com/site/articles/172483
http://www.linuxfoundation.org/collaborate/workgroups/networking/bonding#Bonding_Driver_Options
http://www.codekoala.com/blog/2012/bonding-eth0-and-wlan0-arch-linux/
https://www.cyberciti.biz/howto/question/static/linux-ethernet-bonding-driver-howto.php

El bonding puede ser de varios tipos
 0 round-robin, por defecto, se transmite cada paquete por una interfaz
 1 active-backup, solo se usa interfaz, la otra pasa a activa si cae la primera. La MAC de la interfaz bond solo esta visible en una de las interfaces
 2 balance-xor se elegie una u otra según una operación (XOR entre la smac y la dmac)
 3 broadcast, transmite todo en todas las interfaces
 4 802.3ad crea grupos de agregación que tengan la misma velocidad y configuraciones de duples
 5 balance tlb, adaptative transmit load balancing. No requiere un switch aware.

Configuraciones en /etc/sysconfig/network-scripts/ifcfg-*

Estado bond:
cat /proc/net/bonding/bond0

Otra forma de ver las interfaces que pertenecen a un bond:
ip link show | grep bond



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


Un ejemplo real de config
DEVICE=bond0
TYPE=Bond
BONDING_MASTER=yes
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=bond0
UUID=8dee873b-e8d8-4ec4-a85f-f20f0435fd89
ONBOOT=yes
BONDING_OPTS="updelay=0 resend_igmp=1 use_carrier=1 miimon=100 arp_all_targets=any ad_user_port_key=0 min_links=0 tlb_dynamic_lb=1 downdelay=0 xmit_hash_policy=layer2 packets_per_slave=1 primary_reselect=always arp_validate=none fail_over_mac=none ad_actor_sys_prio=65535 lp_interval=1 mode=active-backup lacp_rate=slow primary=eth1 all_slaves_active=0 arp_interval=0 ad_select=stable num_unsol_na=1 num_grat_arp=1"
IPV6_PEERDNS=yes
IPV6_PEERROUTES=yes




# Monitoring
The Linux bonding driver has two modes to detect the failure of a network path to trigger a switch to an alternate network device.

Media monitoring (MII) can detect and respond to a failure of either the NIC or the switch it is directly connected to. This approach is robust and simple to configure but cannot detect failures beyond the directly connected switch.
Dentro de esta opción parece que hay varias formas. Mirar "use_carrier" en https://www.cyberciti.biz/howto/question/static/linux-ethernet-bonding-driver-howto.php

ARP monitoring monitors the availability of one or more network addresses within your broadcast domain. You can provide multiple IP addresses and monitor any addresses beyond those directly connected to your switch.

If you are unsure what option to choose, Red Hat recommends starting with media monitoring mode since it is simpler and covers the most common types of outages our customers see.


Podemos mirar en las interfaces slaves:
/sys/class/net/eth1/carrier_changes
Si este número esta incrementandose es que la interfaz esta detectando como si le quitaran y pusiesen el cable.
