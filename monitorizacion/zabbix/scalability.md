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
https://www.zabbix.com/documentation/3.4/manual/config/items/value_cache
Value Cache is used for storing item values for evaluating trigger expressions and calculated items.
Se puede activar una cache para ahorrar ciertas llamadas a la base de datos a cambio de memoria
ValueCacheSize=8M (default)
Podemos ver como va de llena en la gráfica: "Zabbix value cache, % used"
Se verá afectada si tenemos muchos "last(x)" donde X sean muchos valores (horas, días, etc)



La CacheSize por defecto (8MB) es muy pequeña y la llenaremos rápidamente (50 hosts).
Shared memory size for storing host, item and trigger data

CacheUpdateFrequency=90
Si tenemos un servidor muy grande tendremos que incrementar este valor. En estos updates zabbix server se baja una copia de todos la config de la bbdd a una cache.
El problema de subir el tiempo es que tardemos más tiempo en que se produzcan cambios, recibir métricas, lld, etc

Podemos forzar ese update con:
zabbix_server -R config_cache_reload

Cuando se realiza el update, se nota una pequeña congelación en los procesos. Al menos visto en los trappers, que mientras se hace el update dejan de contestar.


## Value cache
https://github.com/zabbix/zabbix/blob/trunk/src/libs/zbxdbcache/valuecache.c#L32
https://github.com/zabbix/zabbix/blob/trunk/src/libs/zbxdbcache/valuecache.c#L1145
  organización de los datos en la memoria

Se almacenan structs con los items. Para cada item se almacenan sus valores, desde el actual, hasta el valor más antiguo solicitado

Almacena, al menos, 24h de datos. Los nuevos datos se meten en la cache antes de ir a la bbdd


## Write cache
History cache is used to store item values. A low number indicates performance problems on the database side.

Donde se almacenan los datos antes de ser enviados a la bbdd.
Si se llena es que los histtory syncers no dan a basto.
Chequear si la bbdd está funcionando correctamente.
Modificar StartDBSyncers? Muchos tampoco es bueno, provoca más bloqueos.
Parece que los bloqueos son en el dbcache.c, que cuando coje items a procesar, si algún otro history los tiene bloqueados, se sale si hacer nada.
El bloqueo se puede producir, típicamente, por trigges con last grandes, o calculated con count grandes.

El parametro para configurar su tamaño es
HistoryCacheSize

En el codigo se pide con: DCget_stats(ZBX_STATS_HISTORY_PFREE)
Y se calcula como:
100 * (double)hc_mem->free_size / hc_mem->total_size


La función que saca los datos de la wcache a la db:
DCsync_history
Esta función es llamada por el loop de los dbsyncers

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
