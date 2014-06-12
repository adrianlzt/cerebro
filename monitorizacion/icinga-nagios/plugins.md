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

Perfdata: 'label'=value[UOM];[warn];[crit];[min];[max]
UOM (unit of measurement) is one of:
  no unit specified - assume a number (int or float) of things (eg, users, processes, load averages)
  s - seconds (also us, ms)
  % - percentage
  B - bytes (also KB, MB, TB)
  c - a continous counter (such as bytes transmitted on an interface)

Comprobar que el plugin se puede ejecutar con el usuario de nagios/nrpe.
Instalarlo en /usr/local/bin, o alguna ubicación donde pueda acceder dicho usuario.


Para scripts en bash podemos hacer uso de utils.sh instalado por nagios-plugins.
Nos da variables para los valores retornados, y la función 'range':
# Generating an exit code of 1:
# check_range 5 2:8
#
# Generating an exit code of 0:
# check_range 1 2:8
No parece que funcione como lo esperado. Nos da 1 si está dentro del rango, nada de warning o critical


Sitios con plugins:
https://www.monitoring-plugins.org/ <- web oficial
https://wiki.icinga.org/display/howtos/Plugins
https://trac.id.ethz.ch/projects/nagios_plugins
http://exchange.nagios.org/
https://www.monitoringexchange.org/
https://wiki.icinga.org/display/howtos/Netways+Plugins 
https://github.com/kumina/nagios-plugins-kumina 
https://svn.id.ethz.ch/projects/nagios_plugins 
http://labs.consol.de/lang/en/nagios/ 
http://www.percona.com/doc/percona-monitoring-plugins/1.0/nagios/
https://launchpad.net/percona-monitoring-plugins
http://git.op5.org/git/?p=nagios/op5plugins.git;a=tree
https://secure.opsview.com/wsvn/wsvn/opsview/trunk/opsview-core/nagios-plugins/#path_trunk_opsview-core_nagios-plugins_
https://github.com/MonitoringPlug/monitoringplug
https://github.com/Inuits/monitoring-plugins
