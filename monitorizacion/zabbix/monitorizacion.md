# Internal procs

Monitorizar el avg y el max busy de los procesos
zabbix[process,<type>,<mode>,<state>]

Esas métricas podemos extraerlas de servidores o proxies remotos.
<https://www.zabbix.com/documentation/4.0/en/manual/appendix/items/remote_stats#exposed-metrics>
Mirar las templates "Remote \* health"

Neceistamos configurar el parámetro StatsAllowedIP para permitir el acceso.
<https://www.zabbix.com/documentation/current/en/manual/appendix/config/zabbix_server#statsallowedip>

Para go podemos mirar src/go/plugins/zabbix/stats/stats.go

Si queremos obtenerlas con un script mirar extract_zabbix_remote.py
