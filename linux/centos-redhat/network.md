Herramienta ncurses: paquete system-config-network-tui
system-config-network

Para que se active la interfaz tras configurarlo: /etc/init.d/network restart
Las opciones se almacenan en /etc/sysconfig/network-scripts/ifcfg-ethx
Ahí por ejemplo está definido si la interfaz arranca en boot.

Hostname
/etc/sysconfig/network -> hostname

Device alias
If you associate more than one device with an Ethernet card, the subsequent devices are device aliases. A device alias allows you to setup multiple virtual devices for one physical device, thus giving the one physical device more than one IP address. For example, you can configure an eth1 device and an eth1:1 device. For details, refer to Section 15.11, “Device Aliases”.


Ficheros de configuración:
/etc/sysconfig/network-scripts/ifcfg-xxxx

Configuración estática:
DEVICE=eth0
BOOTPROTO=static
HWADDR=00:19:D1:2A:BA:A8
IPADDR=10.10.29.66
NETMASK=255.255.255.192
ONBOOT=yes

Configuración dinámica:
DEVICE=eth0
BOOTPROTO=dhcp
HWADDR=00:19:D1:2A:BA:A8
ONBOOT=yes
