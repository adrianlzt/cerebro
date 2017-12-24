http://docs.ceph.com/docs/master/rados/troubleshooting/troubleshooting-pg/
problemas con los pg



64 stale+undersized+degraded+peered
http://lists.ceph.com/pipermail/ceph-users-ceph.com/2015-September/004669.html

Puede que la configuración pida más OSDs de los que tenemos.
Tipico si tenemos solo dos OSDs y no hemos configurado bien el ceph.conf (por defecto son 3)

Si ejecutamos:
ceph osd pool ls detail
veremos el número mínimo de replicas en: replicated size 2




HEALTH_WARN too few PGs per OSD (16 < min 30)
Necesitamos crear mas PGs (cuantos?)
Obtener nombre del pool:
ceph osd pool ls

ceph osd pool set POOL pg_num 128
ceph osd pool set POOL pgp_num 128

Tal vez no nos deje poner 128 pgs con un solo nodos, tendremos que poner 32


Chequear
ceph osd pool ls detail
Tal vez esta puesto que necesita mas replicación de la que podemos dar (por ejemplo porque no tenemos suficientes OSDs)
mirar pools.md


En un cluster con solo un nodo, version Luminous (12.x), para dejar el cluster en health ok tuve que hacer:
ceph osd pool set .rgw.root min_size 1
ceph osd pool set .rgw.root size 1
ceph osd pool set default.rgw.control min_size 1
ceph osd pool set default.rgw.control size 1
for i in default.rgw.meta default.rgw.log; do ceph osd pool set $i size 1; ceph osd pool set $i min_size 1; done

