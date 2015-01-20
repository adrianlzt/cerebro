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
