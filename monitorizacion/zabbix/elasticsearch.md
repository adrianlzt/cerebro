Parece que ha habido cierta discusión sobre usar ES como backend.
Mirar discussion_new_backends.png

https://support.zabbix.com/browse/ZBXNEXT-3661
EPIC donde parece que se están realizando modificaciones en el server y el frontend para desacoplar como accede el frontend ahora mismo a la información histórica y poder usar ES para almacenar esa info
"access to history data will be provided by a separated service that will take care of managing requests for access to the history database through a REST API." https://support.zabbix.com/browse/ZBXNEXT-3877

https://support.zabbix.com/browse/ZBXNEXT-4002
Implement REST API history service calls in server (PoC for Elastic)

r71114 | andrea | 2017-08-10 15:17:14 +0200 (jue 10 de ago de 2017) | 24 líneas
........S. [ZBXNEXT-4002] add elasticsearch support as history storage
src/libs/zbxdbcache/history.c la mayoria de las modificaciones





reads zabbix data directly from the DB and can push it to elasticsearch - https://github.com/jojohappy/zabbix-relay
