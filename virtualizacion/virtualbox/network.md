Host-only conecta las máquinas entre si y con mi máquina.

Internal network conecta las máquinas entre si, pero no con mi máquina.

Bridged, como si estuviese conectada directamente a la red del host
https://devminz.github.io/posts/devops/virtualbox-cli-vm-bridged-networking/
  para crear el bridge a mano para poder conectar una vm con la cli


# DHCP
virtualbox levanta un proceso por cada red para servir el dhcp.
Ejemplo (parent pid es VBoxSVC)
/usr/lib/virtualbox/VBoxNetDHCP --ip-address 192.168.99.6 --lower-ip 192.168.99.100 --mac-address 08:00:27:5F:90:E6 --netmask 255.255.255.0 --network HostInterfaceNetworking-vboxnet0 --trunk-name vboxnet0 --trunk-type netflt --upper-ip 192.168.99.254
