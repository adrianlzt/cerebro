Los plugins ejecutados deben devolver (http://docs.icinga.org/latest/en/pluginapi.html)
Return code:
0 OK UP
1 WARNING UP or DOWN/UNREACHABLE*
2 CRITICAL DOWN/UNREACHABLE
3 UNKNOWN DOWN/UNREACHABLE

Salida de texto:
TEXT OUTPUT | OPTIONAL PERFDATA
LONG TEXT LINE 1 LONG TEXT LINE 2 ... LONG TEXT LINE N | PERFDATA LINE 2
PERFDATA LINE 3 ... PERFDATA LINE N

Comprobar que el plugin se puede ejecutar con el usuario de nagios/nrpe.
Instalarlo en /usr/local/bin, o alguna ubicación donde pueda acceder dicho usuario.


Sitios con plugins:
https://trac.id.ethz.ch/projects/nagios_plugins
http://exchange.nagios.org/
https://www.monitoringexchange.org/
