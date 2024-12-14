# netplan

<https://documentation.ubuntu.com/server/explanation/networking/about-netplan/>

Netplan integrates with both of the primary Linux network management daemons: NetworkManager and systemd-networkd

En ubuntu 22.04 se usa systemd-network.
<https://www.freedesktop.org/software/systemd/man/latest/systemd.network.html>

## Ejemplos

Configurar una interfaz con DHCP con una ruta adicional

```
# cat /etc/netplan/40-eth1-c4-vpn.yaml
network:
    version: 2
    ethernets:
        eth1:
            dhcp4: true
            dhcp4-overrides:
                route-metric: 200
                use-dns: false
            dhcp6: false
            match:
                driver: hv_netvsc
                macaddress: 10:1d:1f:19:bf:75
            set-name: eth1
            routes:
              - to: 192.1.0.0/16
                via: 10.1.0.1
```

```

```

# Versions antiguas

<http://www.cyberciti.biz/faq/setting-up-an-network-interfaces-file/>

El fichero principal es
/etc/network/interfaces
Pero suele tener configurado:
source /etc/network/interfaces.d/\*.cfg

Las interfaces con auto serán las que se configuren cuando se ejecute ifup -a (que se hace en el arranque)

Los comandos:
ifup <interface>
ifdown <interface>
sirven para levantar o parar las interfaces, configurar sus rutas, etc

# IP estatica

auto eth0
iface eth0 inet static
address 192.168.1.5
netmask 255.255.255.0
gateway 192.168.1.254

# DHCP

auto eth0
iface eth0 inet dhcp
