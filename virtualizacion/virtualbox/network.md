Host-only conecta las máquinas entre si y con mi máquina.

Internal network conecta las máquinas entre si, pero no con mi máquina.

Bridged, como si estuviese conectada directamente a la red del host
Debemos especificar a que interfaz del host se unirá


# DHCP
virtualbox levanta un proceso por cada red para servir el dhcp.
Ejemplo (parent pid es VBoxSVC)
/usr/lib/virtualbox/VBoxNetDHCP --ip-address 192.168.99.6 --lower-ip 192.168.99.100 --mac-address 08:00:27:5F:90:E6 --netmask 255.255.255.0 --network HostInterfaceNetworking-vboxnet0 --trunk-name vboxnet0 --trunk-type netflt --upper-ip 192.168.99.254



# Cambiar ip NAT
Si queremos cambiar en la VM la ip que viene por defecto (10.0.2.15):
VBoxManage  modifyvm NOMBREVM --natnet1 "192.168.25.0/24"

La VM tiene que estar parada


# Redirección puertos
Si está parada:
VBoxManage modifyvm "VM name" --natpf1 "guestssh,tcp,,2222,,22"
  natpf1 porque es para la NIC 1 (comprobar con vboxmanage showvminfo NOMBREVM | grep NIC)

Si está arrancada:
vboxmanage controlvm NOMBREVM natpf1 "tcp8443,tcp,,8443,,443"


Borrar regla:
vboxmanage controlvm NOMBREVM natpf1 delete tcp443
