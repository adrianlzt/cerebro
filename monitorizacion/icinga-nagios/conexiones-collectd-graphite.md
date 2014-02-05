Primero, con el plugin para nagios unixsocket para consultar collectd.
Segundo, plugin para consultar graphite con un plugin nagios (parece que mola porque se pueden pedir avg, max, etc)
Tercero, haciendo thresholds en collectd y ejecutando un exec para enviar datos de forma pasiva a nagios

Enviar métricas a graphite: https://github.com/shawn-sterling/graphios
Mirar metricas/graphite/graphios.md

Obtener métricas de una cola gearman para meterlo en graphite
gearman_perfdata_to_graphite.md

