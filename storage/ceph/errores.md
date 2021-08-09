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
Que pasa si creamos a posteriori más PGs? Se hace rebalanceo?



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


S3ResponseError: S3ResponseError: 416 Requested Range Not Satisfiable
Este error también puede deberse al subir ficheros multipart, si nunca los hemos subido antes.
Intentará crear un pool y si no tenemos hueco podremos ver ese error
https://tracker.ceph.com/issues/38311
En los logs veremos:
2019-06-24 17:42:25.470 7ff05b252700  0 rgw_init_ioctx ERROR: librados::Rados::pool_create returned (34) Numerical result out of range (this can be due to a pool or placement group misconfiguration, e.g. pg_num < pgp_num or mon_max_pg_per_osd exceeded)

Sobre que hacer si nos quedamos sin PGs
https://themeanti.me/technology/2018/03/14/ceph-pgs.html





reached critical levels of available space on local monitor storage
El proceso ceph-mon se para con ese mensaje.
Parece que se debe a que algún file system que usa ceph está muy lleno. /var tal vez?
Se para si tenemos menos de un 5%
http://lists.ceph.com/pipermail/ceph-users-ceph.com/2014-August/042372.html



Error EEXIST: XXX already exists at address
e0 handle_auth_bad_method hmm, they didn't like 2 result (13) Permission denied
Un "mon" que no consigue unirse al cluster
Parar el mon problemático.
Borrarlo desde otro mon:
  ceph mon rm MONPROBLEMATICO
Rearrancar el mon problemático.




https://docs.ceph.com/en/latest/rados/troubleshooting/troubleshooting-pg/#homeless-placement-groups
Reduced data availability: 5 pgs stale
Todos los OSD que tenían copias de ese PG se han perdido.
Para ver en que OSD estaban:
ceph health detail

pg 7.43 is stuck stale for 8055793.059034, current state stale+active+clean, last acting [0]
  ese "[0]" indica que estaba en el osd 0




mgr[zabbix] Exception when sending: [Errno 2] No such file or directory
Parece que es por tener configurado el módulo de zabbix pero no instalado el zabbix_sender.
Tal vez estamos usando contenedores que no lo traen?
Podemos entrar en el contenedor e instalarlo.
Mirar zabbix.md



health HEALTH_ERR 1 pgs inconsistent; 2 scrub errors
https://ceph.io/en/news/blog/2015/ceph-manually-repair-object/
$ ceph health detail
...
PG_DAMAGED Possible data damage: 1 pg inconsistent
    pg 8.22 is active+clean+inconsistent, acting [3,49,19]

Intentamos forzar su reparación:
$ ceph pg repair 8.22

Tras unos segundos volvemos a comprobar si ya está bien:
$ ceph health detail

En este caso se ha solucionado.
Mirando el dmesg del osd.3, encontramos que el disco físico sobre el que está montado dió errores:
[11988619.569166] sd 4:0:1:0: [sds] FAILED Result: hostbyte=DID_OK driverbyte=DRIVER_SENSE
[11988619.569177] sd 4:0:1:0: [sds] Sense Key : Medium Error [current]
[11988619.569182] sd 4:0:1:0: [sds] Add. Sense: Unrecovered read error
[11988619.569188] sd 4:0:1:0: [sds] CDB: Read(10) 28 00 06 ab 0a 00 00 04 00 00
[11988619.569192] blk_update_request: critical medium error, dev sds, sector 111873376





