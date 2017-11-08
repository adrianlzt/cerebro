https://influxdata.com/blog/how-to-use-the-show-stats-command-and-the-_internal-database-to-monitor-influxdb/
https://www.influxdata.com/blog/influxdb-internals-101-part-one/

# Databases
/var/lib/influxdb/data


# Diagonostics
> use _internal
> show diagnostics

# Conexiones
> use _internal
> show SUBSCRIPTIONS

# Estadisticas
> use _internal
> show STATS

http://localhost:8086/debug/vars
JSON con la informacion de stats

# Memoria
select last(Sys)/(1024*1024) AS Mem_MB from runtime

No me cuadra 100% con la memoria RSS que dice el sistema que ocupa influxdb, pero se acerca bastante
