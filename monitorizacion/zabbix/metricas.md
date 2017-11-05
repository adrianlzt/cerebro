https://www.zabbix.com/documentation/3.4/manual/config/items/history_and_trends
History: almacén de todas las métricas recuperadas
Trends: por cada hora se agrupan los valores del history con: min, max, avg y count (solo para datos tipo float o int)


# Exportar métricas a otras DBs
https://www.zabbix.com/documentation/3.4/manual/config/items/loadablemodules#providing_history_export_callbacks
https://www.zabbix.com/forum/showpost.php?p=197599&postcount=7


## Enviar metricas a InfluxDB
https://github.com/zensqlmonitor/influxdb-zabbix
Usando un tercer programa que hace pull de Zabbix y las envia a InfluxDB
that's not good idea - you can't scale it - single point of failure - module option is better solution.
