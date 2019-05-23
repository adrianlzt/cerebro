https://www.datadoghq.com/blog/monitoring-haproxy-performance-metrics/
hatop.md


https://exchange.nagios.org/directory/Plugins/Network-Connections,-Stats-and-Bandwidth/HAProxy-check/details
/check_haproxy.rb -u http://192.0.2.16:9000/


Mirar estadisticas.md para habilitar el puerto de estadísticas que necesita el check.

Si reiniciamos haproxy perdemos las métricas anteriores.


# monitor-uri
http://cbonte.github.io/haproxy-dconv/1.9/configuration.html#monitor-uri

Definir una URL especial que devolverá el estado de haproxy.
Lo podemos configurar en cualquier frontend.
Estas requests no se logean (evitando llenar los logs con estos checks de estado de haproxy)

frontend fe_health
  bind *:9990
  monitor-uri /haproxy_test
  #monitor-net 192.168.0.252/31         # Limitar desde que subredes se podrá preguntar por esta url
  #errorfile 200 /var/lib/haproxy.http  # Cambios la respuesta por el contenido del fichero. Mirar como generar el fichero en errorfile.md

Devuelve HTTP 200 y body:
<html><body><h1>200 OK</h1>
Service ready.
</body></html>

