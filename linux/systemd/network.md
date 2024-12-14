<https://www.freedesktop.org/software/systemd/man/latest/systemd.network.html>
<https://wiki.archlinux.org/title/Systemd-networkd>

Ficheros .network para configurar las interfaces de red.

Los ficheros .network /etc, /run y /usr/lib se juntan y ordenan alfabéticamente.
El primero que hace "match" es el usado.

Los ficheros tienen que tener permisos 644.

En ubuntu 22.04 parece que ignora esto y hay que usar lo de netplan.

## Ejemplos

```
[Match]
Driver=hv_netvsc
PermanentMACAddress=11:02:3a:89:bf:75
Name=eth1

[Network]
DHCP=ipv4
LinkLocalAddressing=ipv6

[DHCP]
RouteMetric=200
UseMTU=true
UseDNS=false

[Route]
# This will apply to the gateway supplied via DHCP.
Gateway=_dhcp4
Destination=192.168.0.0/16
```
