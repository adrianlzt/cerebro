https://docs.openshift.com/container-platform/3.5/architecture/additional_concepts/sdn.html#architecture-additional-concepts-sdn

OpenShift Container Platform deploys a software-defined networking (SDN) approach for connecting pods in an OpenShift Container Platform cluster. The OpenShift SDN connects all pods across all node hosts, providing a unified cluster network.


Tres modos distintos para configurar la red SDN:
 - ovs-subnet: red plana entre todos los pods
 - ovs-multitenant: project level isolation. Cada projecto tiene Virtual Network ID (VNID) diferente (excepto los privileged, project default, que tienen VNID=0 y puede comunicar con todos)
 - ovs-networkpolicy: customizar las políticas de aislamiento

Existe una "cluster network" de donde se sacan subredes /23 (por defecto) que se dan a los nodos para que den ips a sus pods.



# Redes en los nodos
 - br0, the OVS bridge device that pod containers will be attached to. OpenShift SDN also configures a set of non-subnet-specific flow rules on this bridge.
 - tun0, an OVS internal port (port 2 on br0). This gets assigned the cluster subnet gateway address, and is used for external network access. OpenShift SDN configures netfilter and routing rules to enable access from the cluster subnet to the external network via NAT.
 - vxlan0, the OVS VXLAN device (port 1 on br0), which provides access to containers on remote nodes (pods locales que hablan con pods de otros nodos).

## Nuevo pod
Cuando se levanta un pod se asigna la interfaz del pod del lado del host al OVS bridge br0.
Se añaden reglas OpenFlow a la OVS database para rutear el trafico al nuevo pod
Si tenemos ovs-multitenant, se añaden tambien reglas para aislar el pod


# Packet flow
En un mismo nodo:
  eth0 (container A) - vethA (interfaz del container en el nodo) - br0 - vethB - eth0 (container B)

Entre dos nodos                                         -----------SEGUNDO NODO-----------------
  eth0 (container A) - vethA - br0 - vxlan0 - NETWORK - vxlan0 - br0 - vethB - eth0 (container B)

Container saliendo a red externa
  eth0 (container A) - vethA - br0 - tun0 - NAT - eth0 (physical interface) - internet

Almost all packet delivery decisions are performed with OpenFlow rules in the OVS bridge br0, which simplifies the plug-in network architecture and provides flexible routing

Si usamos ovs-multitenant, en br0 se tagearan los paquetes con el VNID adecuado. El bridge OVS solo permitirá entregar el paquete al pod destino si los VNID son iguales.



# Nuage
https://docs.openshift.com/container-platform/3.5/architecture/additional_concepts/networking.html#nuage-sdn
Nuage Networks provides a highly scalable, policy-based SDN platform called Virtualized Services Platform (VSP). Nuage VSP uses an SDN Controller, along with the open source Open vSwitch for the data plane.


# Flannel
https://docs.openshift.com/container-platform/3.5/architecture/additional_concepts/flannel.html
flannel is a virtual networking layer designed specifically for containers. OpenShift Container Platform can use it for networking containers instead of the default software-defined networking (SDN) components. This is useful if running OpenShift Container Platform within a cloud provider platform that also relies on SDN, such as OpenStack, and you want to avoid encapsulating packets twice through both platforms.


# F5 BIG-IP Router Plug-in
https://docs.openshift.com/container-platform/3.5/architecture/additional_concepts/f5_big_ip.html
The F5 router plug-in integrates with an existing F5 BIG-IP® system in your environment.



# Estructura de redes

Todos los nodos de la plataforma tienen, al menos, dos interfaces.
La interfaz eth0 que comunican los nodos físicamente (gateway de la VxLAN).
tun0 es la interfaz SDN gateway. Primera ip de la hostsubnet (ruta default para los PODs).
lbr0, de aqui salen las IPs de los PODs (veth.x). Todas estas IPs de los veth tendrán IPs de la subred /23 del hostsubnet

El lbr0 es un bridge de openvswtich.
Tiene una tabla VNID/mac/IP. Cuando pasamos por el lbr0 este comprueba si el VNID origen y destion es el mismo. Si es distinto no deja pasar el tráfico a N2.

El atomic-openshift-node es el que alimenta a la tabla de OpenVSwitch (base de datos interna en fichero).
También esta en etcd.

Cuando un paquete pasa por tun0 camino a otro nodo, el tun0 cambia la ip destino (tenía la IP destino del pod) por la IP eth0 del nodo de openshift.

El lbr0 es quien hace la encapsulación VxLAN.

Para salir fuera de la red de openshift, el eth0 haría Natting para salir fuera.


El multitenantcy se hace a nivel 2.
A nivel 2 solo se ven las MAC de los pods del mismo proyecto.

Para que un POD pueda comunicarse con otro POD de su mismo proyecto.
POD1 envia a tun0, tun0 a eth0 ---> al otro nodo eth0, al tun0, llega al lbr0 que e quien permite (a nivel 2) si se permite la conex.

ClusterNetwork, tenemos 2 redes SDN (oc get clusternetwork):
 - Service Networks (los service, las VIPs configuradas en iptables)
 - Network (donde están los pods)


## Network
Todos los pods tienen una pata en esta red SDN
Openshift divide la red en varias subnets /23 (oc get hostsubnet)

Cada projecto tiene un netnamespace (oc get netnamespace)


# Unir dos proyectos
Para que dos proyectos se puedan comunicar entre si.
oc adm pod-network join-projects


# Analizar tráfico
Con tcpdump desde dentro del namespace de network de un pod
O un tcpdump específico de openvswitch
http://openvswitch.org/support/dist-docs/ovs-tcpdump.8.txt



# Multicast (tech preview)
Un pod envía un paquete multicast.
Se envia a los pods del mismo nodo.
Luego se envía también a tun0 -> eth0 -> cambio de nodo -> tun0 -> lbr0
lbr0 envía el paquete a todos (broadcast).

Multicast hacia fuera del SDN no se puede.



# Conexión desde fuera

## net=host
El pod expone el puerto directamente sobre el nodo de openshift

## router
mirar router.md
haproxy mapea un DNS A a un service.

## node-port
Se abre un puerto (número muy alto) en todos los nodos que reenviará el tráfico a los pods configurados y se hace un bind a un service.
Este será el caso para tráfico no HTTP, HTTPs o TLS SNI.
