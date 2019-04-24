http://docs.ceph.com/docs/master/rados/troubleshooting/troubleshooting-pg/
http://docs.ceph.com/docs/master/rados/operations/health-checks/
problemas con los pg

https://access.redhat.com/documentation/en-us/red_hat_ceph_storage/2/html/troubleshooting_guide/troubleshooting-osds



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
ceph osd pool ls detail

ceph osd pool set POOL pg_num 128
ceph osd pool set POOL pgp_num 128

Tal vez no nos deje poner 128 pgs con un solo nodos, tendremos que poner 32
Podemos usar https://ceph.com/pgcalc/ para calcular en número de pgs


Chequear
ceph osd pool ls detail
Tal vez esta puesto que necesita mas replicación de la que podemos dar (por ejemplo porque no tenemos suficientes OSDs)
mirar pools.md


En un cluster con solo un nodo, version Luminous (12.x), para dejar el cluster en health ok tuve que hacer:
ceph osd pool set .rgw.root min_size 1
ceph osd pool set .rgw.root size 1
ceph osd pool set default.rgw.control min_size 1
ceph osd pool set default.rgw.control size 1
for i in default.rgw.buckets.index default.rgw.meta default.rgw.log; do ceph osd pool set $i size 1; ceph osd pool set $i min_size 1; done

El problema es que no tenemos puesto
echo "osd pool default size = 2" >> ceph.conf
Por lo que cada nuevo pool sale con size 3 y tenemos que volver a cambiarlo.





Ceph - Rados GW startup fails with error (34) Numerical result out of range
https://access.redhat.com/solutions/2778161
This error appears when the pgp num is higher than the pg num

También puede deberse a un bug: http://tracker.ceph.com/issues/22351
En mi caso por modificar los pg y pgp num (puestos a mano a 500)



reached critical levels of available space on local monitor storage
El proceso ceph-mon se para con ese mensaje.
Parece que se debe a que algún file system que usa ceph está muy lleno. /var tal vez?
Se para si tenemos menos de un 5%
http://lists.ceph.com/pipermail/ceph-users-ceph.com/2014-August/042372.html
