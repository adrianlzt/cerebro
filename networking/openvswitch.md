https://github.com/openvswitch/ovs
https://es.wikipedia.org/wiki/Open_vSwitch

switch virtual en entornos de servidores virtualizados. Es el encargado de reenviar el tráfico entre diferentes máquinas virtuales (VMs) en el mismo host físico y también reenviar el tráfico entre las máquinas virtuales y la red física.

Open vSwitch es una de las implementaciones más populares de OpenFLow

Soporta: xen, kvm, virtualbox, proxmox VE.
Se usa en OpenSatck, OpenQRM, OpenNebula, oVirt

Open vSwitch permite transmistir el estado de una VM entre distintos hosts. Este estado puede ser: l2 learning table, l3 forwarding rules, ACLs, QoS, policy routing state, etc



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

ovs-ofctl, a utility for querying and controlling OpenFlow switches and controllers.
ovs-pki, a utility for creating and managing the public-key infrastructure for OpenFlow switches.
ovs-testcontroller, a simple OpenFlow controller that may be useful for



# Bridges

## Listar
ovs-vsctl list-br
ovs-vsctl list br
  más detalles

## Crear
ovs-vsctl add-br br0

Añadirle puertos (interfaces existentes, por ejemplo, la interfaz ethernet de nuestra máquina):
ovs-vsctl add-port br0 eth0
  Creará el puerto y luego lo añadirá al bridge.
  No me queda claro exactamente que hace, pero me deja sin red si lo hago sobre mi interfaz de red.

Borrar un puerto:
ovs-vsctl del-port eth0


# Monitorizar

sFlow VS SNMP
This type of interface trending is a staple of network management, but obtaining the information is challenging in virtual environments. While SNMP is typically used to obtain this information from network equipment, servers are much less likely to be managed using SNMP and so SNMP polling is often not an option. In addition, there may be large numbers of virtual ports associated with each physical switch port. In a virtual environment with 10,000 physical switch ports you might need to monitor as many as 200,000 virtual ports. Even if SNMP agents were installed on all the servers, SNMP polling does not scale well to large numbers of interfaces. The integrated counter polling mechanism built into sFlow provides scalable monitoring of the utilization of every switch port in the network, both physical and virtual, quickly identifying problems wherever they may occur in the network


sFlow vs NetFlow
All major IXPs (Internet Exchange Points - like AMSIX were we're connected to, or DECIX) use SFlow. Why? Because SFlow incurs almost 0 overhead to CPUs/Hardware it samples on. Compare this to NetFlow which takes 30-50% of CPU of a Router just to sample 1 out of N packets, that's HUGE.


## sflow

### Arrancar agente sFlow
ovs-vsctl -- --id=@sflow create sflow target=10.1.2.3 header=128 sampling=64 polling=3 -- set bridge br0 sflow=@sflow 
  sampling: cuantas muestras coger (1 de cada 64)
  polling: cada cuanto enviar las métricas

### Listar agentes
ovs-vsctl list sflow

### Borrar agente / deconfigurar sflow del bridge
ovs-vsctl -- clear Bridge br0 sflow



## IPFIX

### Listar agentes
ovs-vsctl list ipfix

## Crear agente
ovs-vsctl -- set Bridge br0 ipfix=@i -- --id=@i create IPFIX targets=\"10.1.2.3:4739\" obs_domain_id=123 obs_point_id=456 sampling=1


ovs-vsctl -- set Bridge br0 ipfix=@i --  --id=@i create IPFIX targets=\"192.168.0.34:4739\" obs_domain_id=123 obs_point_id=456 cache_active_timeout=60 cache_max_flows=13 other_config:enable-input-sampling=false other_config:enable-tunnel-sampling=true

## Desconfigurar exporter IPFIX de un bridge
ovs-vsctl clear Bridge br0 ipfix

## Mostrar estadisticas ipfix
ovs-ofctl dump-ipfix-bridge SWITCH
ovs-ofctl dump-ipfix-flow SWITCH


Envio de los templates (ofproto-dpif-ipfix.c):
/* When using UDP, IPFIX Template Records must be re-sent regularly.
 * The standard default interval is 10 minutes (600 seconds).
 * Cf. IETF RFC 5101 Section 10.3.6. */
#define IPFIX_TEMPLATE_INTERVAL 600

Mirando el código, no parece que se pueda modificar este valor.
Se usa aqui:
        if (!template_msg_sent && (exporter->last_template_set_time + IPFIX_TEMPLATE_INTERVAL) <= export_time_sec) {
export_time_sec viene de xgettimeofday(&export_time);


Esta funcion parece que da a entender que se envia el template al inicio:
ipfix_init_template_msg






# Install

Arch:
pacman -Ss openvswitch

Arrancarlo:
systemctl start ovs-vswitchd
