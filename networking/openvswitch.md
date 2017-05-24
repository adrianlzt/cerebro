https://github.com/openvswitch/ovs
https://es.wikipedia.org/wiki/Open_vSwitch

switch virtual en entornos de servidores virtualizados. Es el encargado de reenviar el tráfico entre diferentes máquinas virtuales (VMs) en el mismo host físico y también reenviar el tráfico entre las máquinas virtuales y la red física.

Open vSwitch es una de las implementaciones más populares de OpenFLow

Soporta: xen, kvm, virtualbox, proxmox VE.
Se usa en OpenSatck, OpenQRM, OpenNebula, oVirt


sFlow VS SNMP
This type of interface trending is a staple of network management, but obtaining the information is challenging in virtual environments. While SNMP is typically used to obtain this information from network equipment, servers are much less likely to be managed using SNMP and so SNMP polling is often not an option. In addition, there may be large numbers of virtual ports associated with each physical switch port. In a virtual environment with 10,000 physical switch ports you might need to monitor as many as 200,000 virtual ports. Even if SNMP agents were installed on all the servers, SNMP polling does not scale well to large numbers of interfaces. The integrated counter polling mechanism built into sFlow provides scalable monitoring of the utilization of every switch port in the network, both physical and virtual, quickly identifying problems wherever they may occur in the network


# Arquitectura

## ovsdb-server
Base de datos donde vswitchd consulta la configuración. La comunicación se hace vía el protocolo OVSDB (json-rpc)

Hay diferentes tablas donde se almacenan las configuraciones de vswitch, bridges, ports, QoS, ssl, etc
Persistente a los reinicios. Basado en JSON

## openvswitch_mod.ko
Módulo del kernel que se encarga del enrutado. Usa el protocolo NETLINK para preguntar a vswitchd cuando encuentra un nuevo flujo.
Si un flujo ya es conocido, este módulo se encargará del enrutado sin necesitar a vswitchd.

## ovs-vswitchd
Core de la aplicación. Decide como se enrutan los nuevos paquetes


# Control
Se puede manejar openvswitch usando el protocolo OpenFlow, para consultar y modificar tablas

OVSDB, protocolo para hablar con ovsdb-server: crear y modificar puertos, recolectar estadísticas, configurar QoS, gestión de colas, etc


# Comandos
Ovs-brcompatd: un demonio que permite a ovs-vswitchd actuar como un remplazo momentáneo del bridge de Linux.
Ovs-dpctl: herramienta para configurar el módulo del kernel del switch.
Ovs-appctl: es una utilidad que envía comandos para ejecutar los demonios de Open vSwitch.
OVS-vsctl: es una utilidad para consultar y actualizar la configuración del Ovs-vswitchd.
Ovs-ofctl: utility for querying and controlling OpenFlow switches and controllers.
Ovsdbmonitor: es una herramienta de GUI para la visualización remota de las bases de datos OVS y las tablas de flujo OpenFLow.


ovs-appctl: utility for configuring running Open vSwitch daemons.
ovs-dpctl
ovs-dpctl-top
ovs-ofctl
ovs-pki
ovs-vsctl
ovsdb-client
ovsdb-tool
vtep-ctl
ovs-bugtool
ovs-vswitchd
ovsdb-server



# Listar bridges
ovs-vsctl list-br
ovs-vsctl list br
  más detalles


# Monitorizar / sFlow

## Arrancar agente sFlow
ovs-vsctl -- --id=@sflow create sflow target=10.1.2.3 header=128 sampling=64 polling=3 -- set bridge br0 sflow=@sflow 
  sampling: cuantas muestras coger (1 de cada 64)
  polling: cada cuanto enviar las métricas

## Listar agentes
ovs-vsctl list sflow

## Borrar agente / deconfigurar sflow del bridge
ovs-vsctl -- clear Bridge br0 sflow
