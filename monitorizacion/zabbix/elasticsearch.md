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
  un indice, con un solo type, por cada tipo de dato a almacenar (integers, doubles, strings, logs, texto)
  replica 1? si es cae un nodo perdemos datos!
  el ttl de los datos es de 7 dias
  si es tipo texto no generan tambien un keyword? util para usar agregaciones, orden, etc

  viendo como funciona veo que crea unos indices con nombres: uint,dbl,str,log,text

  Logs cuando entran los datos por primera vez
  [2017-10-25T10:31:28,485][INFO ][o.e.c.m.MetaDataCreateIndexService] [3eE6UdW] [dbl] creating index, cause [auto(bulk api)], templates [], shards [5]/[1], mappings []
  [2017-10-25T10:31:28,729][INFO ][o.e.c.m.MetaDataMappingService] [3eE6UdW] [dbl/r01DfNLaRie8k0v9f-kcjw] create_mapping [values]
  [2017-10-25T10:31:28,972][INFO ][o.e.c.m.MetaDataCreateIndexService] [3eE6UdW] [uint] creating index, cause [auto(bulk api)], templates [], shards [5]/[1], mappings []
  [2017-10-25T10:31:29,124][INFO ][o.e.c.m.MetaDataMappingService] [3eE6UdW] [uint/NsJVJTBwSVC7PonFMiP20A] create_mapping [values]

Que pasa si se envian muchos datos de golpe desde zabbix a ES y ES no contesta a tiempo?
Se vuelven a intentar reindexar los datos?
Cada entrada tiene un index único para evitarlo?
ZBXNEXT-4002_2/src/libs/zbxhistory/history_elastic.c:
#define   ZBX_HISTORY_STORAGE_DOWN  10000 /* Timeout in milliseconds */
...
/************************************************************************************
 *                                                                                  *
 * Function: elastic_writer_flush                                                   *
 *                                                                                  *
 * Purpose: posts historical data to elastic storage                                *
 *                                                                                  *
 ************************************************************************************/
static void elastic_writer_flush()
...
  code = curl_multi_wait(writer.handle, NULL, 0, ZBX_HISTORY_STORAGE_DOWN, &fds);



La función "elastic_add_values" es donde se genera el json que se va a insertar
Usa /_bulk?refresh=true en caso de que tenga que insertar varias entradas
  https://www.elastic.co/guide/en/elasticsearch/reference/5.5/docs-refresh.html
  con ?refresh=true se fuerza a que los resultados indexados estén disponibles inmediatamente. Puede dar problemas de performance!

Ejemplo de inseción de datos:
  Content-Type: application/x-ndjson
  Content-Length: 242

  {"index":{"_index":"uint","_type":"values"}}
  {"itemid":28211,"value":"0","clock":1508943371,"ns":878678211,"ttl":604800}
  {"index":{"_index":"uint","_type":"values"}}
  {"itemid":23291,"value":"2","clock":1508943371,"ns":895168007,"ttl":604800}



## Configuracion
zabbix_server.conf:
HistoryStorageURL=http://elastic:changeme@127.0.0.1:9200
HistoryStorageTypes=uint,dbl,str,log,text



# Uso
Parece que ES se usa en la parte web en:
api/services/CTrend.php
api/services/CHistory.php



# Externo al proyecto
reads zabbix data directly from the DB and can push it to elasticsearch - https://github.com/jojohappy/zabbix-relay
