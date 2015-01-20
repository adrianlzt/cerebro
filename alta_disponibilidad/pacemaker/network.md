Por defecto se usa multicast para la comunicación.
Podemos tener problemas porque no esté activado multicast.
Podemos comprobarlo con omping (redhat) o ssmping (debian).

En caso de no poder usar multicast, podremos usar unicast (udpu)

Mas info: http://pve.proxmox.com/wiki/Multicast_notes#test_if_multicast_is_working_between_two_nodes_with_omping


Corosync /etc/corosync/corosync.conf:
totem {
        version: 2
        transport: udpu


CMAN /etc/cluster/cluster.conf: 
<cman transport="udpu"/>
