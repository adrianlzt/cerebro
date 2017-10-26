Resumen: se puede usar ES como backend para los datos históricos (tablas history* en SQL).
Hace falta cofigurar el server y el frontend para que lo utilicen.
Meter los mappings a priori. Cambiar replication?


Mappings usados para es: database/elasticsearch/elasticsearch.map
  un indice, con un solo type, por cada tipo de dato a almacenar (uint,dbl,str,log,text). Hace falta crearlos a priori para que pille bien los tipos de datos (si no, por ejemplo el dbl.vale lo pilla tipo string)
  replica 1? si es cae un nodo perdemos datos! -> entiendo que esto dejarán que cada uno lo cree como mejor le parezca
  el ttl de los datos es de 7 dias
  si es tipo texto no generan tambien un keyword? util para usar agregaciones, orden, etc -> como lo usan?? Tal vez para su uso esto no lo quieren para nada

Que pasa si se envian muchos datos de golpe desde zabbix a ES y ES no contesta a tiempo?
Se vuelven a intentar reindexar los datos?
Cada entrada tiene un index único para evitarlo? -> no, los datos no definen su id
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
ES: hace falta cargar los mappings a priori, definidos en /database/elasticsearch/elasticsearch.map

Ejemplo del indice uint:
$ curl -u elastic:changeme "localhost:9200/uint/" -XPUT -d '{
   "settings" : {
      "index" : {
         "number_of_replicas" : 1,
         "number_of_shards" : 5
      }
   },
   "mappings" : {
      "values" : {
         "properties" : {
            "itemid" : {
               "type" : "long"
            },
            "clock" : {
               "format" : "epoch_second",
               "type" : "date"
            },
            "value" : {
               "type" : "long"
            }
         }
      }
   }
}'


zabbix_server.conf:
HistoryStorageURL=http://elastic:changeme@127.0.0.1:9200
HistoryStorageTypes=uint,dbl,str,log,text

/etc/zabbix/web/zabbix.conf.php
global $DB, $HISTORY;
// ElasticSearch url (can be string if same url is used for all types).
$HISTORY['url']   = [
		'uint' => 'http://localhost:9200',
		'text' => 'http://localhost:9200'
];
$HISTORY['url']   = 'http://localhost:9200'; // si todos los indices estan en el mismo server

// Value types stored in ElasticSearch.
$HISTORY['types'] = ['uint', 'text', 'dbl', 'str', 'log'];



# Uso
Parece que ES se usa en la parte web en:
api/services/CTrend.php
api/services/CHistory.php


include/classes/api/managers/CHistoryManager.php
  aqui por ejemplo se definen las queries para obtener distintos tipos de datos de ES




# Donde se hizo el desarrollo
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







# Externo al proyecto
reads zabbix data directly from the DB and can push it to elasticsearch - https://github.com/jojohappy/zabbix-relay
