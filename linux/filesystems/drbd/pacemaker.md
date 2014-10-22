http://clusterlabs.org/doc/en-US/Pacemaker/1.1/html/Clusters_from_Scratch/_configure_the_cluster_for_drbd.html
http://www.drbd.org/users-guide/s-pacemaker-crm-drbd-backed-service.html
http://www.drbd.org/users-guide/s-pacemaker-stacked-resources.html

/etc/init.d/drbd stop
chkconfig drbd off

pcs cluster cib drbd_cfg
pcs -f drbd_cfg resource create WebData ocf:linbit:drbd drbd_resource=NOMBRE_RECURSO_DRBD op monitor interval=60s 
pcs -f drbd_cfg resource master WebDataClone WebData master-max=1 master-node-max=1 clone-max=2 clone-node-max=1 n otify=true

Mirar si está bien:
pcs -f drbd_cfg resource show

Comimit los cambios:
pcs cluster cib-push drbd_cfg
