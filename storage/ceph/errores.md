http://docs.ceph.com/docs/master/rados/troubleshooting/troubleshooting-pg/
problemas con los pg



64 stale+undersized+degraded+peered
http://lists.ceph.com/pipermail/ceph-users-ceph.com/2015-September/004669.html

Puede que la configuración pida más OSDs de los que tenemos.
Tipico si tenemos solo dos OSDs y no hemos configurado bien el ceph.conf (por defecto son 3)

Si ejecutamos:
ceph osd pool ls detail
veremos el número mínimo de replicas en: replicated size 2
