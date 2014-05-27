# http://clusterlabs.org/doc/en-US/Pacemaker/1.1/html/Clusters_from_Scratch/index.html
# Esa referencia es mejor para versiones nuevas de pacemaker y corosync.
# Toda la documentacion: http://clusterlabs.org/doc/
# Estructura: http://clusterlabs.org/wiki/File:Stack.png

# http://theclusterguy.clusterlabs.org/post/1262495133/pacemaker-heartbeat-corosync-wtf
Hearbeat (deprecated): capa de mensajes para saber de la existencia (o desaparecimiento) de los otros nodos del cluster
Corosync: igual que hearbeat.
Pacemaker: es un CRM (Cluster Resource Manager), encargado de arrancar o parar los servicios, y que solo esten arrancados en un sitio.
Resource Agent: forma de decirle a pacemaker que servicios queremos que sean HA. Pueden ser scripts de init.d (lsb), o usar el estandar OCF
Listado de RAs: http://www.linux-ha.org/wiki/Resource_Agents

Recomendacion: ntp instalado y configurado

SELinux desactivado

Para generar entropia: tar -cv / > /dev/null

Acordarse de crear el fichero /etc/corosync/service.d/pcmk:
service {
        # Load the Pacemaker Cluster Resource Manager
        name: pacemaker
        ver: 0
}
ver: 1 <- tendremo que arrancar el demonio pacemaker a mano

Mostrar configuracion:
crm configure show

Editar configuración:
# crm
crm(live)# configure
crm(live)configure# edit

Otra opción:
crm(live)configure# primitive vip_ ... 

Mostrar y configurar parámetros activos de corosync:
# corosync-cfgtool -s

Mostrar el estado del cluster y los servicios:
# crm_mon

Configurar una ip virtual: usa un script bajo el estandar OCF que se llama hearbeat:IPaddr2
crm(live)configure# edit
primitive vip_nombre_recurso ocf:heartbeat:IPaddr2 \
params ip="ip.a.clus.terizar" nic="eth1" \
op monitor interval="10s" \
meta target-role="Started"

Configurar un servicio que use el script de /etc/init.d/icinga
primitive Icinga lsb:icinga \
op monitor interval="20s" \
meta target-role="Started"

Significado: 
http://clusterlabs.org/doc/en-US/Pacemaker/1.1-plugin/html/Pacemaker_Explained/s-resource-operations.html
http://clusterlabs.org/doc/en-US/Pacemaker/1.1-plugin/html/Pacemaker_Explained/s-resource-options.html

op es Operation
Monitor cada 20s
El target-role indica como debe mantener Pacemaker el servicio

Para comprobar quien tiene la ip utilizar arpping.
Este nos devuelve la mac de quien esta contestando a la VIP



Cosas del manual:
Disable STONITH, as we don’t have fencing functionality in current VDC version This must be executed only in one server
crm configure property stonith-enabled=false


Ignore quorum policies, don’t needed in a two-node cluster. This must be executed only in one server
crm configure property no-quorum-policy=ignore

Pacemaker’s default behavior is to stop all resources if the cluster does not have quorum.
A cluster is said to have quorum when more than half the known or expected nodes are online



Ensure the resource will be on the node until manual movement or failover situation is
produced. This must be executed only in one server
crm configure rsc_defaults resource-stickiness=100

Con esto conseguimos que los resources, si se han movido de su nodo original, permanezcan en el nodo esclavo. 
No es buena idea andar moviendo resources, porque pueden tener tiempos de uptime muy altos (ej. una base de datos oracle).


Configurar dependencias entre los resources.
Ej.: un servidor apache necesita estar corriendo en el mismo nodo que el resource ip virtual:
# crm configure colocation constraint-name INFINITY: recursoHijo recursoPadre
# crm configure colocation constraint-name INFINITY: recursoPadre ( recursoHijo1 recursoHijo2 ... )


Resource Agents:
/usr/lib/ocf/
/usr/share/cluster

# crm ra
Mirar las clases de resources disponibles:
crm(live)ra# classes

crm(live)ra# list <clase>
crm(live)ra# list ocf

OCF a su vez tiene 3 sublistas (pacemaker, heartbeat y redhat) [redhat en el caso de ser redhat, claro]
crm(live)ra# list ocf pacemaker

Para ver las posibles configuraciones
crm(live)ra# meta nombrescript


Resources:
crm(live)# resource
crm(live)resource# status
Desde aquí podemos manejarlos: start, stop, restart, ... 
Migrar un resource a otra máquina, la regla solo vale durante dos minutos
crm(live)resource# migrate resource-name node-name PT2M
crm(live)resource# restart resource

crm(live)resource# move resource node
Mueve un recurso manualmente. Creará una regla de location cli-prefer-ResourceName
crm(live)resource# unmove
Devuelve el control al cluster

Node:
crm(live)# nodes
Administracion de nodos: show, status


Para salir del menu al anterior:
crm(xxx)nn# end


Para hacer pruebas, apagar corosync (pacemaker arranca y para con corosync)
En el manual dice:
Para hacer pruebas de disponibilidad, apagar pacemaker y corosync (en ese orden).
Para arrancar, corosync y luego pacemaker.
