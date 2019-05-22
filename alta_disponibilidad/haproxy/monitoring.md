https://www.datadoghq.com/blog/monitoring-haproxy-performance-metrics/
hatop.md


https://exchange.nagios.org/directory/Plugins/Network-Connections,-Stats-and-Bandwidth/HAProxy-check/details
/check_haproxy.rb -u http://192.0.2.16:9000/


Mirar estadisticas.md para habilitar el puerto de estadísticas que necesita el check.

Si reiniciamos haproxy perdemos las métricas anteriores.


# Endpoint 200 OK
Podemos poner una config tipo:
frontend fe_health
  bind *:9990
  http-request deny deny_status 200


Para poder hacer un chequeo básico para mirar si haproxy está funcionando:
