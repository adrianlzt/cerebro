Parece que ha habido cierta discusión sobre usar ES como backend.
Mirar discussion_new_backends.png
https://www.linkedin.com/groups/161448/161448-5996549505196048385

https://support.zabbix.com/browse/ZBXNEXT-3661
EPIC donde parece que se están realizando modificaciones en el server y el frontend para desacoplar como accede el frontend ahora mismo a la información histórica y poder usar ES para almacenar esa info
"access to history data will be provided by a separated service that will take care of managing requests for access to the history database through a REST API." https://support.zabbix.com/browse/ZBXNEXT-3877

https://support.zabbix.com/browse/ZBXNEXT-4002
Implement REST API history service calls in server (PoC for Elastic)

r71114 | andrea | 2017-08-10 15:17:14 +0200 (jue 10 de ago de 2017) | 24 líneas
........S. [ZBXNEXT-4002] add elasticsearch support as history storage
src/libs/zbxdbcache/history.c la mayoria de las modificaciones

Parece que el trabajo esta siendo terminado en la rama: zabbix-dev/ZBXNEXT-4002_2



Mappings usados para es: database/elasticsearch/elasticsearch.map
  replica 1? si es cae un nodo perdemos datos!
  usan distintos types en el mismo index? -> va a estar deprecated en próximas versiones



# Externo al proyecto
reads zabbix data directly from the DB and can push it to elasticsearch - https://github.com/jojohappy/zabbix-relay
