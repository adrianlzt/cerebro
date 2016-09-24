Cuando influxdb empieza a tener muchos datos le cuesta reiniciar.
https://github.com/influxdata/influxdb/issues/5764

Con 32GB le ha llevado: unos 7' (con restart tuve que pararlo porque llevaba 15 y no arrancaba)

Las trazas que genera durante el arranque son del tipo:

[store] 2016/07/28 09:04:50 /opt/influxdb/data/tools/default/539 opened in 397.379077ms
[tsm1wal] 2016/07/28 09:04:50 tsm1 WAL starting with 10485760 segment size
[tsm1wal] 2016/07/28 09:04:50 tsm1 WAL writing to /opt/influxdb/wal/openstack-kilo/default/118
[filestore] 2016/07/28 09:04:50 /opt/influxdb/data/openstack-kilo/default/118/000000009-000000003.tsm (#0) opened in 4.343892ms
[cacheloader] 2016/07/28 09:04:50 reading file /opt/influxdb/wal/openstack-kilo/default/118/_00054.wal, size 0
[shard] 2016/07/28 09:04:50 /opt/influxdb/data/tools/default/79 database index loaded in 315.460932ms
[store] 2016/07/28 09:04:50 /opt/influxdb/data/tools/default/79 opened in 318.652801ms
[tsm1wal] 2016/07/28 09:04:50 tsm1 WAL starting with 10485760 segment size
[tsm1wal] 2016/07/28 09:04:50 tsm1 WAL writing to /opt/influxdb/wal/openstack-kilo/default/159
[filestore] 2016/07/28 09:04:50 /opt/influxdb/data/openstack-kilo/default/159/000000007-000000002.tsm (#0) opened in 4.449113ms
[cacheloader] 2016/07/28 09:04:50 reading file /opt/influxdb/wal/openstack-kilo/default/159/_00054.wal, size 0


Al reiniciar parece que tampoco lo hizo muy limpio, soltó los mensajes:
[run] 2016/07/28 09:01:34 time limit reached, initializing hard shutdown
[run] 2016/07/28 09:01:35 InfluxDB starting, version 0.13.0, branch 0.13, commit e57fb88a051ee40fd9277094345fbd47bb4783ce
[run] 2016/07/28 09:01:35 Go version go1.6.2, GOMAXPROCS set to 2
[run] 2016/07/28 09:01:35 Using configuration at: /etc/influxdb/influxdb.conf
...
