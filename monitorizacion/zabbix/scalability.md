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


# Overview
No usar si tenemos muchos hosts. Es muy pesado.


# Cache
Tenemos tres tipos de caches: database, configuration y values

Database cache, métricas zabbix[wcache,*]:
history cache (tamaño máximo definido por HistoryCacheSize)
history index cache (tamaño máximo definido por HistoryIndexCacheSize)
trend cache (tamaño máximo definido por TrendCacheSize)

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






## Configuration cache
Almacena una copia de la configuración de zabbix que está en la database.
Shared memory size for storing host, item and trigger data
La CacheSize por defecto (8MB) es muy pequeña y la llenaremos rápidamente (50 hosts).

CacheUpdateFrequency=90
Si tenemos un servidor muy grande tendremos que incrementar este valor. En estos updates zabbix server se baja una copia de todos la config de la bbdd a una cache.
El problema de subir el tiempo es que tardemos más tiempo en que se produzcan cambios, recibir métricas, lld, etc

Podemos forzar ese update con:
zabbix_server -R config_cache_reload

Cuando se realiza el update, se nota una pequeña congelación en los procesos. Al menos visto en los trappers, que mientras se hace el update dejan de contestar.



## Write cache / history cache + history index cache
src/libs/zbxdbcache/dbcache.c

History cache is used to store item values. A low number indicates performance problems on the database side.
Como se insertan datos en la history cache detallado en trap.md

Donde se almacenan los datos antes de ser enviados a la bbdd.
Si se llena es que los history syncers no dan a basto.
Chequear si la bbdd está funcionando correctamente.
Modificar StartDBSyncers? Muchos tampoco es bueno, provoca más bloqueos.
Parece que los bloqueos son en el dbcache.c, que cuando coje items a procesar, si algún otro history los tiene bloqueados, se sale si hacer nada.


Los parametros para configurar sus tamaños son:
HistoryCacheSize
HistoryIndexCacheSize

Porcentaje de memoria libre:
en el codigo se pide con: DCget_stats(ZBX_STATS_HISTORY_PFREE)
Y se calcula como:
100 * (double)hc_mem->free_size / hc_mem->total_size



La History Index almacena unas estructuras para acceder a la History Cache
https://zabbix.org/wiki/Docs/specs/ZBXNEXT-3071

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
  el parámetro sync_type solo toma el valor ZBX_SYNC_FULL cuando paramos el server
  el puntero total_num lo actualizará con el número de elementos que se hayan procesado
  cuando arranca, muestra una traza debug con el número de elementos que hay en la cache (cache->history_num, valor definido en dc_flush_history)
  bucle do-while hasta que no queden más elementos o pasemos el tiempo máximo (60")
  hc_pop_items (pops the next batch of history items from cache for processing). Dice que debemos devolver los elementos con hc_pop_items() tras procesarlos.
    obtiene de cache->history_queue hasta un máximo de 1000 items (esta "history_queue" es un "binary heap" almacenada en la History Index Cache.
    lo que obtiene son itemids a procesar, no los valores
    para sacar los elementos va dando vueltas llamando a zbx_binary_heap_find_min(&cache->history_queue), añadiéndolos al puntero retornado a DCsync_history y borrándolos del heap
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
      parece que lo que hace es trerse el comiendo de la linked list que usará para obtener los valores
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
    zbx_vc_add_value (almacena los datos en la value cache)
  DCmass_update_triggers (re-calculate and update values of triggers related to the items)
  DCmass_update_trends
  process_trigger_events
  DCconfig_triggers_apply_changes
  zbx_save_trigger_changes
  commit
  hc_push_processed_items (return processed items into history cache)
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
