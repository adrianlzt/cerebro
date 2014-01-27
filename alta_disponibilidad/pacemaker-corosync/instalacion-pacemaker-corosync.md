# http://clusterlabs.org/doc/en-US/Pacemaker/1.1/html/Clusters_from_Scratch/index.html 
# Esa referencia es mejor para versiones nuevas de pacemaker y corosync.

Dos servidores sirven una misma ip virtual (VIP)
Esta ip virtual se considera un recurso en alta disponibilidad.


De aqui en adelante es la forma "vieja". Lo estoy haciendo para 
corosync-1.4.1-7.el6.x86_64 
pacemaker-1.1.7-6.el6.x86_64

Recomendacion: ntp instalado y configurado

Pacemaker hace uso de corosync para el paso de mensajes.

Corosync:
Instalacion: apt-get, yum, ...

Configuración
	Desactivamos selinux (tambien cuando reinicie!)

	Generamos en uno de los nodos la clave
	cd /etc/corosync/
	corosync-keygen
	Para generar entropia: tar -cv / > /dev/null
	scp authkey elotronodo:/etc/corosync/

	Comprobamos los permisos de authkey:
	Deben ser 400 root:root

	Configuramos corosync.conf para unicast udp
	
	cp /etc/corosync/corosync.conf.default.udpu /etc/corosync/corosync.conf

This specifies the network address the corosync executive should bind to. For example, if the local interface is 192.168.5.92 with netmask 255.255.255.0, set bindnetaddr to 192.168.5.0. If the local interface is 192.168.5.92 with netmask 255.255.255.192, set bindnetaddr to 192.168.5.64, and so forth.

Definimos los miembros del grupo (el mismo incluido)
totem {
        version: 2
        secauth: off
        interface {
                member {
                        memberaddr: 172.31.200.9
		]
		member { ....
		...
		bindnetaddr: 172.31.200.
		...
 	}               	
Instalar el corosync en el arranque: chkconfig corosync on
En ubuntu es necesario cambiar el parametro STAR en /etc/default/corosync a 'yes' para poder incluso iniciar el servicio.

Acordarse de tener creado el directorio /var/log/cluster
drwxr-xr-x 2 root root 4096 Apr 19 11:30 cluster/


Comprobamos que se crea el grupo correctamente (/var/log/cluster/corosync.log):
corosync [MAIN  ] Completed service synchronization, ready to provide service.

Tambien con:
# corosync-cfgtool -s
Printing ring status.
Local node ID 180887468
RING ID 0
        id      = 172.31.200.10
        status  = ring 0 active with no faults
	
Para probar si todo va bien:
# crm_verify -L

Siguiendo a ciegas el manual:
Manual: Disable STONITH, as we don’t have fencing functionality in current VDC version.  This must be executed only in one server
Pacemaker: NOTE: Clusters with shared data need STONITH to ensure data integrity
crm configure property stonith-enabled=false

Manual: Ignore quorum policies, don’t needed in a two-node cluster. This must be executed only in one server
crm configure property no-quorum-policy=ignore

Ensure the resource will be on the node until manual movement or failover situation is
produced. This must be executed only in one server
crm configure rsc_defaults resource-stickiness=100

Execute the following commands to add the resources.
 # crm
 crm(live)# configure
 crm(live)configure# edit
