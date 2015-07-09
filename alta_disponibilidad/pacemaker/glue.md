http://linux-ha.org/wiki/Cluster_Glue

Cluster Glue is a set of libraries, tools and utilities suitable for the Heartbeat/Pacemaker cluster stack. In essence, Glue is everything that is not the cluster messaging layer (Heartbeat), nor the cluster resource manager (Pacemaker), nor a Resource Agent.


Aqui podemos encontrar por ejemplo el script para hacer STONITH para vmware.
Version 1.0.12


CentOS:
yum install cluster-glue


Crear credenciales:
/usr/local/lib/vmware-vcli/apps/general/credstore_admin.pl add -s ip.del.ser.ver -u USER -p 'PASSWORD'
Se almacena en: /root/.vmware/credstore/vicredentials.xml
