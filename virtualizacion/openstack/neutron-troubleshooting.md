http://docs.openstack.org/openstack-ops/content/network_troubleshooting.html

# Recorrido de un paquete
1.- El paquete se pone en la interfaz de red de la VM
2.- El paquete se transfiere a un TAP (Test Access Point) en el host. Podemos ver cual en el fichero /etc/libvirt/qemu/instance-xxxxxxxx.xml


    The TAP device name is constructed using the first 11 characters of the port ID (10 hex digits plus an included '-'), so another means of finding the device name is to use the neutron command. This returns a pipe-delimited list, the first item of which is the port ID. For example, to get the port ID associated with IP address 10.0.0.10, do this:
    
    # neutron port-list | grep 10.0.0.10 | cut -d \| -f 2
     ff387e54-9e54-442b-94a3-aa4481764f1d
    Taking the first 11 characters, we can construct a device name of tapff387e54-9e from this output.

    El instance-ID lo podemos ver haciendo un nova show si somos administradores
    En el xml están las interfaces en <devices><interface type="bridge">...<source bridge="qbrbAAA"/><target dev="tapAAA"/>
    Si hacemos tcpdump sobre el id que viene en el bridge o el dev estaremos snifando el tráfico que sale por esa NIC de la vm

    los qbrXXX conectan la interfaz de la VM (qvbXXX) con la tap (tapXXX)

3.- De la vNIC se transfiere al bridge br-int
    El br-int conectará ciertas interfaces (algunas internas de openvswitch)
    Podemos hacer tcpdump a la interfaz física que será algo tipo: int-br-bond
    

# ovs-vsctl list-br
br-bond1
br-int
# ovs-vsctl list-ports br-bond1
bond1
phy-br-bond1
# ovs-vsctl list-ports br-int | tail
    los puertos o nics que hay en el bridge que hace openvirtual swicth
tap78111a49-da
tapa01edf21-0a
...


Trafico:
(caso en que eth1 y eth5 forman la bond1)
qvoeb745e75-6b -> qbreb745e75-6b -> tapeb745e75-6b -> int-br-bond1 -> phy-br-bond1 -> bond1 -> eth1 y eth5
