https://www.zabbix.com/documentation/3.4/manual/config/items/history_and_trends
History: almacén de todas las métricas recuperadas
Trends: por cada hora se agrupan los valores del history con: min, max, avg y count (solo para datos tipo float o int)

Housekeeper, se encarga de ir limpiando history y trends viejos.


## Housekeeper
Administration - General - Housekeeping
Ahí tenemos la configuración de que tablas borra y con que configuración.

Se puede arrancar también Housekeeper a mano con un cron.


# Exportar métricas a otras DBs
https://www.zabbix.com/documentation/3.4/manual/config/items/loadablemodules#providing_history_export_callbacks
https://www.zabbix.com/forum/showpost.php?p=197599&postcount=7


## Enviar metricas a InfluxDB
https://github.com/zensqlmonitor/influxdb-zabbix
Usando un tercer programa que hace pull de Zabbix y las envia a InfluxDB
that's not good idea - you can't scale it - single point of failure - module option is better solution.


# Internals
mirar:
  procesos_internos.md
  cache.md (descripción de los internals)

Zabbix va almacenando cada value en las trends cache.
Cuando llega un value con una hora superior (por ejemplo, pasamos de 10:00 a 11:00), se flushea ese trend a la bbdd y se resetea el cache del trend y se empiezan a almacenar los nuevos valores.
Si en algún momento llega un dato viejo (de las 10:xx), se flushea la trend de las 11, se obtiene de la bbdd la trend de las 10, se actualiza y se actualizará.
Cuando llegue el siguiente valor de las 11, se flusheará el trend que cogimos de las 10, se obtendrá de la bbdd la trend de las 11 y se actualizara.

Zabbix4
libs/zbxdbcache/dbcache.c
dc_trends_update_float / dc_trends_update_uint
Funciones que actualizan los trends:
  update trends set num=%d,value_min=" ZBX_FS_DBL ",value_avg="ZBX_FS_DBL ",value_max=" ZBX_FS_DBL " where itemid=" ZBX_FS_UI64" and clock=%d
