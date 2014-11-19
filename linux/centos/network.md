Herramienta ncurses: paquete system-config-network-tui
system-config-network

Para que se active la interfaz tras configurarlo: /etc/init.d/network restart
Las opciones se almacenan en /etc/sysconfig/network-scripts/ifcfg-ethx
Ahí por ejemplo está definido si la interfaz arranca en boot.

Para configurar o desconfigurar las interfaces:
ifup eth1
ifdown eth1

Hostname
/etc/sysconfig/network -> hostname

Device alias
If you associate more than one device with an Ethernet card, the subsequent devices are device aliases. A device alias allows you to setup multiple virtual devices for one physical device, thus giving the one physical device more than one IP address. For example, you can configure an eth1 device and an eth1:1 device. For details, refer to Section 15.11, “Device Aliases”.


Ficheros de configuración:
https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Deployment_Guide/s1-networkscripts-interfaces.html
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


PEERDNS=[yes|no]
  si usamos dhcp, por defecto esta a yes, e indica que se debe modificar /etc/resolv.conf con las dns cogidas por dhcp

DEFROUTE=no
  si lo definimos asi estamos haciendo que no coja la ruta por defecto de esta interfaz.
  Tipicamente se hace en la eth2 si es la eth1 la que nos da la ruta por defecto
  https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Deployment_Guide/s1-networkscripts-static-routes.html

## Rutas ##
/etc/sysconfig/network-scripts/route-eth0 
10.0.0.240/28 via 10.0.0.126
10.0.1.0/24 via 10.0.0.126

