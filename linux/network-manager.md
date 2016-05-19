https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/Networking_Guide/sec-Using_the_NetworkManager_Command_Line_Tool_nmcli.html

Alamcena la configuración en /etc/NetworkManager

Dos conceptos, connection and interface.

Las interfaces es solo la tarjeta de red.
Connection contiene nombre, firewall zone, ipv4 addr, ipv6 addr and interface

nmcli c s
  mostrar conexiones

nmcli d s
  mostrar devices

Servers DNS cogidos por DHCP:
  nmcli dev show | grep DNS

nmcli c e
  nos abre una "shell" inteligente para editar una conexión
  nos preguntará que tipo de conex queremos crear
  podemos poner por ejemplo 'help'

nmcli c load fichero
  recargar un fichero de conf del NM


# Crear una nueva red a mano
nmcli c edit type ethernet con-name "conex-prueba"
nmcli> set ipv4.addresses 10.1.1.3
¿Desea también establecer 'ipv4.method' a 'manual'? [yes]:
nmcli> set ipv4.gateway 10.1.1.1
nmcli> set ipv4.dns
Ingresar el valor 'dns': 8.8.8.8
nmcli> set connection.autoconnect no
nmcli> save
Conexión 'conex-prueba' (0fae8ee8-01fe-469b-b40f-a9b594e48e39) guardada con éxito.


Para DHCP:
ipv4.method: auto



# Quitar un dispositivo del NM
Para desactivar un dispositivo (para que no lo maneje networkmanager):

/etc/NetworkManager/NetworkManager.conf
[keyfile]
#unmanaged-devices=mac:74:de:2b:ef:5b:71


systemctl restart NetworkManager


Propiedades:
https://developer.gnome.org/NetworkManager/stable/ref-settings.html



# Bridge
nmcli c e type bridge
nmcli> set connection.autoconnect no
nmcli> set connection.interface-name "bridge-prueba"
nmcli> set bridge.stp no
faltan algunos pasos

Luego tendriamos que crear los bridge-slaves

Los ficheros se generan en /etc/sysconfig/network-scripts/


# Debug
https://wiki.gnome.org/Projects/NetworkManager/Debugging

sudo dbus-send --system --print-reply --dest=org.freedesktop.NetworkManager /org/freedesktop/NetworkManager org.freedesktop.NetworkManager.SetLogging string:"debug" string:""

journalctl -u NetworkManager.service

# HotSpot
Configuración:
/etc/NetworkManager/system-connections/Hotspot
Si tocamos el fichero:
systemctl restart NetworkManager
