http://docs.ceph.com/docs/master/rados/operations/monitoring/
http://docs.ceph.com/docs/master/rados/operations/monitoring-osd-pg/
http://docs.ceph.com/docs/hammer/rados/operations/user-management/
mirar managers.md

Chequeo del estado del cluster. Razones por las que puede dar no-ok http://docs.ceph.com/docs/master/rados/operations/monitoring-osd-pg/#monitoring-placement-group-states:
ceph health
ceph health detail

Estado global del cluster:
ceph status

Estado de los OSD (up/down, in/out. in+down es un problema):
ceph osd stat
ceph osd tree
  vista en arbol donde vemos los OSD que hay corriendo en cada maquina

Estado del quorum (maquinas monitoras):
ceph quorum_status --format json-pretty


Estado de los monitories:
ceph mon stat
ceph mon_status | python -m json.tool
  más completo

Ver eventos del cluster en tiempo real:
ceph -w

Uso de disco:
ceph df

Estado de los placement groups
ceph pg stat
ceph pg dump
ceph pg map {pg-num}
  nos dice que hosts estan asociados a un PG

Estado del CRUSH map:
ceph osd crush tree

Pools:
ceph osd pool ls detail
  nos dice datos sobre el pool. Entre ellos:
    replicated size X -> numero de replicas necesarias


Si queremos ejecutar comandos directamente contra los OSDs, tendremos que hacerlo atacando a su socket. Ej.:
ceph daemon /var/run/ceph/ceph-osd.2.asok status


# Metadata server
ceph mds stat
ceph fs dump



# Cosas que monitorizar
You should also consider what percentage of the overall data the cluster stores on each host. If the percentage on a particular host is large and the host fails, it can lead to problems such as exceeding the full ratio, which causes Ceph to halt operations as a safety precaution that prevents data loss.

Generally, it’s a good idea to check the capacity of your cluster to see if you are reaching the upper end of its capacity. As your cluster reaches its near full ratio, you should add one or more OSDs to expand your cluster’s capacity.
Warning Do not let your cluster reach its full ratio before adding an OSD. OSD failures that occur after the cluster reaches its near full ratio may cause the cluster to exceed its full ratio.

Sharding de RGW: https://ceph.com/community/new-luminous-rgw-dynamic-bucket-sharding/<Paste>


# Crear usuarios que puedan consultar ceph
/usr/bin/ceph auth get-or-create client.cyclops mon 'allow r' > /etc/ceph/client.cyclops.keyring

ceph -k /etc/ceph/client.cyclops.keyring -n client.cyclops health


