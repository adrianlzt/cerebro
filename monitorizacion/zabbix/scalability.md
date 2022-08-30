https://www.zabbix.com/documentation/4.0/manual/installation/requirements
Pequeña tabla con ejemplos de hardware para distintos tamaños de instalación.

# Databases
No usar Oracle, no da performance
IBM DB2, parece que tampoco funciona muy bien
SQLite no vale para zabbix-server, puede usarse para zabbix-proxy

En grandes instalaciones algunas queries pueden tardar entre 10 y 20s. Es esperable y aceptable.
Posiblemente quien cause estas queries tan grades sea el Configuration Syncer, que hace ciertas queries que atacan a prácticamente toda la tabla items.

Medir el lag entre el real time y los datos almacenados. Tenemos que elegir unos cuantos items que se actualicen cada minuto, la query tendrá que tener valores entre 0 y 60" (comprobar con explain que no es muy cara la query):
Aqui estamos cogiendo solo los items activos calculated (que los tenemos a 1m)
select ROUND(EXTRACT(EPOCH FROM now()))-clock AS lag from history where itemid IN ( select itemid from items,hosts where items.hostid=hosts.hostid and items.value_type=0 and items.type=15 and items.state=0 and items.status = 0 and items.flags=0 and hosts.name='NOMBRESERVERZABBIX') order by clock desc limit 1;


# History y trends
Por defecto zabbix tiene un proceso que revisa cada hora que métricas del history debe convertir a trends y borrar.
Esto en instalaciones grandes mata a la bbdd.
Mejor usar partitioning de postgres, creando nosotros un proceso que genere los trends y borre particiones con datos antiguos.
Mirar en instalacion.md


# Housekeeping
Generalmente usaremos particiones para las tablas trends y history, para poder hacer los borrados de manera más eficientes.
El housekeeper tambien borra los eventos más viejos de N días.
CUIDADO! Los problemas más antiguos de esos N días se borrarán.
Subir mucho el número de eventos también puede implicar peor performance (creo). Parece que una opción es particionar también esa tabla.


# Overview
No usar si tenemos muchos hosts. Es muy pesado.


# Cache
Tenemos tres tipos de caches: database, configuration y values

Database cache, métricas zabbix[wcache,*]:
history cache (tamaño máximo definido por HistoryCacheSize)
history index cache (tamaño máximo definido por HistoryIndexCacheSize)
trend cache (tamaño máximo definido por TrendCacheSize)
  parece que esta memoria siempre está en uso, cacheando la última hora, antes de enviarla a la bd
  150MB de uso máximo visto con 1.5M items / 500k triggers
  Orientativo: unos 64 bytes por número de items uint + float

configuration cache (tamaño máximo definido por CacheSize), métricas zabbix[rcache,*]

value cache (tamaño máximo definido por ValueCacheSize), métricas zabbix[vcache,*]



## Value cache
https://www.zabbix.com/documentation/3.4/manual/config/items/value_cache
Value Cache is used for storing item values for evaluating trigger expressions, calculated items and some macros.
Se puede activar una cache para ahorrar ciertas llamadas a la base de datos a cambio de memoria
ValueCacheSize=8M (default)
Podemos ver como va de llena en la gráfica: "Zabbix value cache, % used"
Métricas internal zabbix[vcache,*]
Se verá afectada si tenemos muchos "last(x)" donde X sean muchos valores (horas, días, etc)

En un entorno productivo con 1.5M trigger y 500k triggers nunca superó los 850MB de uso (teniendo 2GB) (version 3.2.6)

https://github.com/zabbix/zabbix/blob/trunk/src/libs/zbxdbcache/valuecache.c#L32
https://github.com/zabbix/zabbix/blob/trunk/src/libs/zbxdbcache/valuecache.c#L1145
  organización de los datos en la memoria

Se almacenan structs con los items. Para cada item se almacenan sus valores, desde el actual, hasta el valor más antiguo solicitado

Almacena, al menos, 24h de datos.

Trigger y items count pueden hacer uso de la value cache.
Las funciones que pueden usar valores atrás en el tiempo (v3.2) son estas (el valor sec|#num es el primer parámetro excepto si se especifica lo contrario):
avg
band
count
delta
forecast
iregexp (segundo parámetro)
last
max
min
percentile
regexp (segundo parámetro)
str (segundo parámetro)
strlen
sum
timeleft

Para los item calculated estas funciones estarán en el field "params" de la forma:
count("nombreitem",300,"2..",regexp)
Pueden tener varias funciones:
100*last(telegraf.net.err_out[eth0],0)/(last(telegraf.net.packets_sent[eth0],0)+count(telegraf.net.packets_sent[eth0],#1,0))

Mirando el código de la value cache, parece que cada dato que insertemos (double o int) serán 76 bytes.
Por cada value parece que almacena un zbx_vc_chunk_t, que entre otros campos almacena un zbx_history_record_t y este a su vez history_value_t.
Sumando los bytes de cada tipo de dato de los struct me sale 76 bytes (también cuadra con el número de puntos que vi cuando teníamos la cache llena)
history_value_t -> 8*5=40 bytes
zbx_history_record_t -> 2*4 + history_value_t = 48 bytes
zbx_vc_chunk_t -> 8*2 + 4*3 + zbx_history_record_t = 76 bytes





## Configuration cache
Almacena una copia de la configuración de zabbix que está en la database.
Shared memory size for storing host, item and trigger data
La CacheSize por defecto (8MB) es muy pequeña y la llenaremos rápidamente (50 hosts).

Para 11k hosts, 1.5M items, 500k triggers -> ~1GB
El trigger por defecto salta cuando estamos al 25% de capacidad disponible (hayamos usado el 75%).

Aproximación burda: 1GB / 11k+1.5M+500k = 0.5kB/elemento
Validad también con un Zabbix 4

CacheUpdateFrequency=90
Si tenemos un servidor muy grande tendremos que incrementar este valor. En estos updates zabbix server se baja una copia de todos la config de la bbdd a una cache.
El problema de subir el tiempo es que tardemos más tiempo en que se produzcan cambios, recibir métricas, lld, etc

Podemos forzar ese update con:
zabbix_server -R config_cache_reload

Cuando se realiza el update, se nota una pequeña congelación en los procesos. Al menos visto en los trappers, que mientras se hace el update dejan de contestar.



## Write cache / history cache + history index cache
src/libs/zbxdbcache/dbcache.c
wcache_dump_3_4.0.3.diff parche para poder hacer un dump de la history write cache al log. Sacar los itemsid y cuantos values tiene cada uno.

History cache is used to store item values. A low number indicates performance problems on the database side.
Como se insertan datos en la history cache detallado en trap.md

Donde se almacenan los datos antes de ser enviados a la bbdd.
Si se llena es que los history syncers no dan a basto.
Chequear si la bbdd está funcionando correctamente.
Modificar StartDBSyncers? Muchos tampoco es bueno, provoca más bloqueos.
Parece que los bloqueos son en el dbcache.c, que cuando coje items a procesar, si algún otro history los tiene bloqueados, se sale si hacer nada.

El problema típico es un item trapper con mucha frecuencia (varios items cada segundo), de manera que los history syncers no tienen tiempo de sacar los datos.

También vimos una caída por un telegraf enviando miles de métricas (100k métricas por segundo en intervalos de 5" cada minuto) que eran rechazadas por Zabbix.
De alguna manera impactaba llenando está cache.


Los parametros para configurar sus tamaños son:
HistoryCacheSize
  cuanto más grande sea, más tiempo de maniobra tendremos en caso de que ciertos items se estén encolando
  32 bytes por item encolado (+ 8bytes por cada item distinto)
HistoryIndexCacheSize
  una estimación aproximada del uso máximo que puede tener esta memoria: número de items * 77B

Porcentaje de memoria libre:
en el codigo se pide con: DCget_stats(ZBX_STATS_HISTORY_PFREE)
Y se calcula como:
100 * (double)hc_mem->free_size / hc_mem->total_size

El tamaño libre de la history index: hc_index_mem->free_size



https://zabbix.org/wiki/Docs/specs/ZBXNEXT-3071
La History Index almacena unas estructuras (zbx_hc_data_t) para acceder a la History Cache
Contando el tamaño de cada tipo de dato de ese struct me salen 77 bytes (https://github.com/zabbix/zabbix/blob/68f1cdcc30a1c8fc14e9f2c452186ad77baae596/include/dbcache.h)

Para la history cache:
Cada history_items (lo que se almacena en la history cache) ocupa 32 bytes (calculado haciendo un sizeof de un struct con el formato como zbx_hc_item_t)
El history_queue parece que ocupa 8 bytes por elemento, más otras cosas.

El procesado básico con la history cache es añadir o sacar datos, que de forma resumida se hace así:

Adding values
  get item by itemid from history items hashset, add new item if none found.
  allocate zbx_hc_data_t structure and string/log values if required in history cache.
  add the allocated structure at the head of item value list.
  add item to history queue if it was just created.

Picking items for processing
  pop the first N elements from history queue. This prevents item from being processed by other history syncers.
  lock triggers for picked items, put already locked items back in history queue.
  process the oldest (at item's value list tail) values of picked items.
  remove the oldest values.
  if items still have more values - put them back in queue, otherwise remove them from history items hashset.


Los procesos encargados de sincronizar la write cache con la base de datos son los dbsyncers
src/zabbix_server/dbsyncer/dbsyncer.c

Están en un loop infinito llamando a DCsync_history y luego durmiendo 1" o nada si el DBsync_history se lo pide.
El sleep será de 1" cuando la cola esté vacía o la mayoría de los items a procesar estén bloqueados por triggers.
El proceso estará como máximo 60" en DCsync_history. Se le permite salir para poder actualizar las estadísticas (proc title)

DCsync_history (writes updates and new data from pool to database)

  Info interesante para debuggear:
    cache->history_num, número de elementos en la history write cache
    cache->history_queue->elems_num, número de items en la history queue
    itemid de los elementos de la queue:
    p cache->history_queue->elems[3]
      entre 0 y cache->history_queue->elems_num - 1
    En cada "elems" se almacena el itemid (cache->history_queue->elems[5]->key) y el struct de la history_items (*(zbx_hc_item_t*)cache->history_queue->elems[5]->data) donde tenemos los punteros tail y head apuntando a la history write cache

    Si paramos un history syncer cuando está ocupado y subimos hasta la función DCsync_history, podemos ver que items está procesando con (si ya ha pasado por hc_pop_items):
     p ((zbx_hc_item_t *)history_items->values[0])->itemid
     p ((zbx_hc_item_t *)history_items->values[1])->itemid
     ...
     entre 0 y history_items->values_num - 1

  Sacar el valor más antiguo de uno de esos items:
    p ((zbx_hc_item_t *)history_items->values[1])->tail->value
  Su timestamp:
    p ((zbx_hc_item_t *)history_items->values[1])->tail->ts
  tail es un zbx_hc_data
  Podemos avanzar por la lista enlazada con tail->next

  Tamaño usado de la history write cache, en bytes:
    p hc_mem->used_size
  Tamaño usado de la history index cache, en bytes:
    p hc_index_mem->used_size



  Prueba para entender hc_index_mem.
  Tengo 6 elementos en la queue

  hc_index_mem, en memalloc.c se explica como está estructurada la memoria. Pongo un resumen rápido.
  Cada "chunk" tiene en sus 8 primeros bytes el tamaño y el flag de si está usado.
  El flag de usado (MEM_FLG_USED) es el primer bit.
  El resto es el tamaño de ese chunk.
  Tras los datos del chunk, está repetido el bloque de flag usado + size
  Ejemplo:
    (gdb) p hc_index_mem->buckets[1630]
    $42 = (void *) 0x8000000000000300
    El primer bit es 1 (0x8 = 1000 0000), por lo que el chunk está usado.
    Para obtener el tamaño le quitamos el primer bit, y nos queda 0x300 = 768 bytes
    Como en este caso sabemos que está almacenado un zbx_binary_heap_elem_t, podemos obtener sus dos valores (8 bytes cada uno) con:
      (uint64_t)hc_index_mem->buckets[1631] (itemid)
      hc_index_mem->buckets[1632] (puntero a los datos)
        *(zbx_hc_item_t*)hc_index_mem->buckets[1632] (ver los datos)
        *(zbx_hc_item_t*)((zbx_binary_heap_elem_t)hc_index_mem->buckets[1641])->data (otra forma de ver data)

  Entendido como almacena los elementos de la queue.
  cache->history_queue->elems apunta a un chunk de la memoria del history index cache, directamente a la sección de user data.
  En esa sección de user data están puestos de forma consecutiva todos los elementos de la queue.
  El chunk queda de esta manera:
  0x8000000000000300 | {key = 1939116, data = 0x7f41a4a61390} {key = 388836, data = 0x7f41a4a613d0} ... | 0x8000000000000300

  En cache->history_queue->elems_alloc dice cuanta memoria allocated hay, para elementos zbx_binary_heap_elem_t. Por ejemplo, nos dice 48, a 16 bytes por elemento = 768 bytes (lo que vimos que ocupaba el chunk de memoria)
  Dentro de ese chunk de memoria tendremos los zbx_binary_heap_elem_t de los items. Por lo que he visto no solo hay 6 como dice cache->history_queue->elems_num, hay más. Y al hacia al final podremos empezar a encontrar huecos vacíos
  Los primeros cache->history_queue->elems_num tendrán data->tail apuntando a alguna dirección de memoria, ya que tienen values que deben ser procesadas.
  A partir de elems_num+1, data->tail apuntará a 0x0 (head si conservará el puntero)

  La posición de memoria del final del chunk será:
  comienzo del chunk: 0x7f41a4a62348
  más el tamaño, en este caso 0x300 = 0x7f41a4a62648
  más 8 bytes, tamaño del primer size+flag = 0x7f41a4a62650

  (gdb) x/tg 0x7f41a4a62348
  0x7f41a4a62348: 1000000000000000000000000000000000000000000000000000001100000000
  (gdb) x/tg 0x7F41A4A62650
  0x7f41a4a62650: 1000000000000000000000000000000000000000000000000000001100000000


  cache->history_items es un hashset (creo que algo como un dict) donde hay almacenadas estructuras zbx_hc_item_t para cada itemid que tiene values pendientes de procesar.
  Más abajo hay una sección sobre los hashset

  Buscar un elemento en la tabla history_items a partir del itemid:
  p (zbx_hc_item_t *)zbx_hashset_search(&cache->history_items, &((zbx_hc_item_t *)history_items->values[0])->itemid)

  Iterar por el hashset de cache->history_items
  set $iter = malloc(sizeof(zbx_hashset_iter_t))
  call zbx_hashset_iter_reset(&cache->history_items, $iter)
  p (zbx_hc_item_t *)zbx_hashset_iter_next($iter)
  p ((zbx_hc_item_t *) 0x7f41a4a5f478)->itemid
    es la direc de memoria que me devolvió la función

  Cuando nos devuelva 0x0 (NULL) es que no hay más datos

  Podemos acceder al contenido de iter con:
  p ((zbx_hashset_iter_t*)$iter)

  La posición de memoria que nos devuelve zbx_hashset_iter_next sale de:
  p &((struct zbx_hashset_entry_s *) ((zbx_hashset_iter_t*)$iter)->entry)->data

  Sacar el data de un slot de cache->history_items:
  p ((zbx_hc_item_t*)cache->history_items->slots[1]->data)->itemid





  el parámetro sync_type solo toma el valor ZBX_SYNC_FULL cuando paramos el server
  el puntero total_num lo actualizará con el número de elementos que se hayan procesado
  cuando arranca, muestra una traza debug con el número de elementos que hay en la cache (cache->history_num, valor definido en dc_flush_history)
  bucle do-while hasta que no queden más elementos o pasemos el tiempo máximo (60")
  hc_pop_items (pops the next batch of history items from cache for processing). Dice que debemos devolver los elementos con hc_pop_items() tras procesarlos.
    obtiene de cache->history_queue hasta un máximo de 1000 items (esta "history_queue" es un "binary heap (min-heap)" almacenada en la History Index Cache. mirar más abajo la sección "binary heap"). Este binary heap tiene primero los elementos con un tiemstamp más antiguo (FIFO)
    lo que obtiene son zbx_hc_item_t (itemid, status, tail y head)
    para sacar los elementos va dando vueltas llamando a zbx_binary_heap_find_min(&cache->history_queue) (lo que hace es coger el elem[0]), añadiéndolos al puntero retornado a DCsync_history y borrándolos del heap
    para si elems_num = 0
  DCconfig_lock_triggers_by_history_items (Lock triggers for specified items so that multiple processes do not process one trigger simultaneously)
    por cada item obtenido en hc_pop_items, obtenemos sus triggers
    si alguno de los triggers asociados al item está ya bloqueado, aumentamos el contados locked_num y vamos a procesar el siguiente item (solo se tienen en cuenta trigger enabled)
    si todos los triggers están unlocked, los bloqueamos nosotros para poder procesarlos de forma unívoca
    retorna el número de items que ha conseguido bloquear
    tambien pone en el puntero triggerids los triggers que es necesario procesar asociados a los items (la lista de triggers a procesar una vez hemos quitado los que estaban bloqueados)
  hc_push_busy_items (push back the busy (locked by triggers) items into history cache)
    devolvemos a cache->history_queue los items que están bloqueados (DCconfig_lock_triggers_by_history_items los marcó para que ahora solo tengamos que mirar el flag status de cada item)
    los saca de history_items
  Se sale si no tiene items que procesar. En este caso en las trazas debug deberíamos ver una transición muy rápida entre "In DCsync_history" y "setproctitle" (1ms)
  history_num contiene el número de items con los que estamos trabajando
  hc_get_item_values (gets item history values)
    ahora es cuando coje, para cada itemid, el value más antiguo (usando el "tail" del hashset "history_items"). SOLO SE COGE UN VALUE POR ITEMID
    hc_copy_history_data (copies item value from history cache into the specified history value)
      saca de la history write cache el value más antiguo y lo copia al puntero que le pasan
      lo que hace es copiar el valor de item->tail
  abre transacción SQL
  DCmass_update_items (update items info after new value is received)
    DCget_delta_items (Get a copy of delta item history stored in configuration cache)
    por cada item (o por cada value)
      DCadd_update_item_sql
        1) generate sql for updating item in database
        2) calculate item delta value
        3) add events (item supported/not supported)
        4) update cache (requeue item)
      DCinventory_value_add (añadir datos a la tabla host_inventory?)
    DCadd_update_inventory_sql (actualización de la tabla host_inventory)
    DCset_delta_items
  DCmass_add_history (inserting new history data after new value is received)
    llama a la función apropiada para almacenar el dato: dc_add_history_dbl, dc_add_history_uint, etc
    dc_add_history_dbl (helper function for DCmass_add_history())
      Entiendo que está generando la query tipo: insert into history (itemid,clock,ns,value) values (12794841,1560281498,27508301,17387.989214),(12794839,1560281498,27508302,10183.237600)...
      prepara la query para insertar los datos
      para cada uno de los values llama a zbx_db_insert_add_values para meter los datos en la query
      insertará el último value para cada itemid que haya conseguido obtener, máximo 1000
    zbx_vc_add_value (almacena los datos en la value cache)
  DCmass_update_triggers (re-calculate and update values of triggers related to the items)
    evaluate_expressions
      zbx_evaluate_item_functions
        evaluate_function
          evaluate_AVG / _MAX / _MIN / etc
            get_function_parameter_int / _uint64 / _float / _etc
              substitute_simple_macros
                DCget_user_macro
                  Se hace uso de la config cache.
                  Vemos un LOCK_CACHE, pero esto solo bloquea si se está sincronizando (sync config cache <-> db)
    zbx_process_triggers
  DCmass_update_trends
    Se le pasa una lista con los items y su último value
    Para cada item+value se llama a DCadd_trend
    DCadd_trend (add new value to the trends).
      se define la variable hour con la hora del value que estamos procesando
      se obtiene el trend de la cache (o se crea si no existía)
      si la hora del trend no coincide con la del value, se llama a DCflush_trend
      DCflush_trend (move trend to the array of trends for flushing to DB), para ser enviados a la bbdd con DCflush_trends
        pone a 0 los contadores, para ser usados con la siguiente hora
      Se actualiza la hora del trend y sus valores (num, min, max, avg)
    Entre :55 y :00 un history syncer recorrerá cache->trends, flusheando los trends que no hayan sido actualizados en esa hora
    DCflush_trends (flush trend to the database), lo que estamos haciendo es enviar a la bbdd los elementos de cache->trends que ya han recibido un valor de la siguiente hora
      Los inserts son para nuevos datos.
      Los updates son para valores antiguos que hay que colocar en el trend correspondiente.

      Define clock como la hora del primer tren de la lista, es la hora que acabamos de sobrepasar, por ejemplo, clock=16:00 y son las 17:01
      También se coge el value_type del primer elemento de la lista.
      Solo se van a procesar trends que tengan el mismo clock y mismo value_type.
      En el primer for añadimos a la lista itemids los items que cumplan la condición de mismo clock, mismo value_type y que no tegan disable_from != 0
      Coge un máximo de 1000 items y marca en "trends_to" el siguiente elemento del array a procesar.

      Se hace una query (select distinct itemd from trends/trends_uint where clock>=clock) para ver que items ya tienen entrada en la tabla trends para la hora que acabamos de sobrepasar (16:00)
      Quita de la lista de items a procesar los que haya encontrado en esa query, es decir, si ya tienen trend para esa hora, los ignoramos.
      Recorremos la lista de los items que quedan (los que no tienen entrada para esa hora en trends), cogemos su trend y ponemos en disable_from el hora (16:00)
      Lo que ha hecho es marcar en disable_from los trends que no tenían entrada en la bbdd

      Ahora mete en la lista itemids solo los que ya tienen una entrada en la tabla trend.
      Hace una query para obtener de la bbdd los valores num,min,max,avg de esos items
      Actualiza el trend con lo obtenido de la bbdd
      Lanza el update para actualizar la bbdd
  process_trigger_events
  DCconfig_triggers_apply_changes
  zbx_save_trigger_changes
  commit
  hc_push_processed_items (return processed items into history cache)
    aqui borra el value procesado y apunta al siguiente item
    Para "borrar" el value antiguo usa hc_free_data, que a su vez usa "__hc_mem_free_func" para liberar el struct y el ->value en caso de ser STR, TEXT o LOG.
    si el siguiente value (->next) es NULL, no se vuelve a insertar el item en la history queue
  DCmodule_prepare_history (prepare history data to share them with loadable modules)
  si no hemos podido sincronizar más de un 10% de los values que cogimos, salimos del do-while para dormir un segundo, esperando que el resto de history syncers liberen los locks

Esa función saca items del history cache (hc_pop_items)
Se comprueba si alguno de esos items está siendo procesado ya por otro history syncer (DCconfig_lock_triggers_by_history_items), si es el caso, se sale del loop sin hacer nada.
Creo que en este caso veremos en el log de debug unas trazas muy rápidas de proctitle, ejemplo:
 28430:20190611:213246.049 __zbx_zbx_setproctitle() title:'history syncer #21 [synced 0 items in 0.001009 sec, syncing history]'
 28430:20190611:213246.050 In DCsync_history() history_num:35381850
 28430:20190611:213246.051 __zbx_zbx_setproctitle() title:'history syncer #21 [synced 0 items in 0.000849 sec, idle 1 sec]'

Si seguimos adelante, se arranca una transacción, se meten los datos en history, se actualizan items, update triggers y trends.
Se procesan los triggers.

Luego se quita el lock sobre los items.
Se devuelven los items a la cache con la función hc_push_processed_items
Esta función es la que borra valores de la cache, excepto si se marcaron como busy por hc_push_busy_items



## Binary heap
binaryheap.c
Zabbix usa in binary heap (min-heap) para almacenar la history_queue.
history_queue almacena zbx_binary_heap_elem_t donde está el itemid y un puntero a la struct zbx_hc_item_t dentro de history_items donde está los punteros tail y head a la lista de valores.

Parece que tambien se usa para cosas del configuration syncer (queues y pqueue)

La implementación es genérica, para poder ser usada de distintas formas.
Por ejemplo, para la history_queue se hace el orden por fecha (->tail->ts)


## Hashset
hashset.c
Usado, al menos, para almacenar las estructuras de itemids con los punteros a la history cache donde están los valores pendientes de procesar.

Función para iterar por un hashset
zbx_hashset_iter_reset

Ejemplo de uso, iterando sobre todos los elementos de la history_items:
zbx_hashset_iter_t  iter;
zbx_hc_item_t   *item;
zbx_hashset_iter_reset(&cache->history_items, &iter);
while (NULL != (item = (zbx_hc_item_t *)zbx_hashset_iter_next(&iter)))
  // hacer algo con item

Esta iteración lo que hace es recorrer desde 0 hasta cache->history_items->num_slots - 1
  cache->history_items->slots[0]
Cuando no es NULL es que tiene un zbx_hc_item_t

El hashset tendrá num_slots huecos de los cuales cache->history_items->num_data tendrán valor.

Los elementos almacenados en la hashset son zbx_hashset_entry_s
Cada elemento tiene:
  hash (hasheo de los datos, algo tipo md5sum(data))
  data
  next (si empezamos a buscar desde el principio del hashset, una vez encontremos el primer elemento, podemos saltar al resto con ->next)
  padding (temas de alineamiento de memoria)




# Imágenes / frontend
Si tenemos screens con muchas imágenes (50) y un tiempo de recarga pequeño (30"), esto realiza una carga muy grande sobre el frontend.
Se puede fundir la CPU de una máquina muy potente.


# Sizing
Required space for a single value
  Depends on database engine
  History: 90 bytes per numeric data
  Trends: 80 bytes per one aggregate

History in MB per day = NVPS*90*24*3600/1024/1024 = NVPS*7.416
Trends in MB per year = Items*80*24*365/1024/1024 = Items*0.668


# Varios
http://blog.zabbix.com/scalable-zabbix-lessons-on-hitting-9400-nvps/2615/
https://kloczek.wordpress.com/2016/05/05/punching-2k-selects-barrier-on-zabbix-mysql-db-backend/


NVPS: new values per second
Se puede consultar este valor en Report > Status of Zabbix
Tambien en el item "Values processed by Zabbix server per second	 	zabbix[wcache,values]" del "Template App Zabbix Server" (tambien tiene una graph: Zabbix server performance)
Mejor usar las gráficas para determinar los picos de NVPS y según eso determinar el número de DBSycners que hacen falta.
Lo mejor es usar el valor máximo de NVPS y usar la regla 1 DBSycners por cada 1000NVPs. Si tenemos MariaDB, usar un hilo de mariadb por cada DBSyncer que tengamos.
Monitorizar que no nos pasmos del límite 1DBSyncer/1kNVPS
history syncers
Del soporte: "it's better to keep the number of history syncer processes as small as possible"


Para los pollers, mientras tengamos ram, cuantos más pollers mejor.


Permisos finos, complican mucho las queries y matan la performance.


"if someone is observing own zabbix DB backend IO read/write ratio on storage layer bigger tahn 1/20 - 1/100, it probably means that this install needs more memory for server caches and/or DB cash and/or zfs ARC
discussion_new_backends.png (Abril 2015)
https://www.linkedin.com/groups/161448/161448-5996549505196048385

En esta discusión se tocan más temas para como hacer zabbix más "performant"


Parece que una típica mejora ante instalaciones muy grandes es poner los agentes en "active monitoring"



https://www.zabbix.com/forum/showpost.php?p=184441&postcount=6
Way bigger problem is with all queries generating all WRITE IOs (inserts and updates).
If someone has bigger and bigger scalability problems with zabbix DB backend way bigger improvements is possible to gain by stop using Linux and switching to Solaris (ZFS ARC)


https://support.zabbix.com/browse/ZBXNEXT-714
need scalable alternative for the history and items tables


Parece que zabbix 3.2 tiene problemas con permisos y queries.




# Stress test
https://github.com/vulogov/zas_agent/blob/master/doc/zas-agent-0.1.1.pdf
ZAS: zabbix agent simulator
Software que simular ser un agente para poder realizar test sobre la infraestructura




# https://www.zabbix.com/files/zabconf2017/fgiordano_pantonacci-zabbix_in_intesa_sanpaolo_bank.pdf
Server+Frontend, 8vcpu, 20GB
DB, mysql, 8vcpu, 16GB
7000 hosts
390000 items
170000 triggers
5000 NVPS
