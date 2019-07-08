# Configuración logging del server/proxy
Podemos sacar el logging a fichero, syslog o consola.

Lo seleccionaremos con:
LogType=file/system/console

Si usamos syslog (system), se enviará a la facility DAEMON con el programname = "zabbix_server"

/etc/rsyslog.d/zabbix.conf
:programname, isequal, "zabbix_server" -/var/log/zabbix/zabbix_server.log
:programname, isequal, "zabbix_server" stop

La segunda linea es para evitar que los logs de zabbix se envien a otra config tipo *.info

systemctl restart rsyslog
systemctl restart zabbix-server



# Monitorizar logs
https://www.zabbix.com/documentation/3.4/manual/config/items/itemtypes/log_items
para journald mirar journald.md

Solo funciona con zabbix agent active

Podemos usar el agente de zabbix para monitorizar logs.

Usaremos una regexp para seleccionar lo que queremos buscar.

Una vez hecho el match, podemos elegir almacenar la línea matcheada o solo retorar un campo (para despues poner un trigger asociado a ese valor)


log[file,<regexp>,<encoding>,<maxlines>,<mode>,<output>]

log["/var/log/syslog","error"]
  buscar la palabra "error" en ese fichero de log

Zabbix agent does not send more than maxlines of a log file per second. The limit prevents overloading of network and CPU resources and overrides the default value provided by MaxLinesPerSecond parameter in the agent configuration file.

Un ejemplo de trigger, there are several errors in the log for last 3 minutes:
{host:log["/var/log/syslog",ERROR].count(3m,ERROR,like)}>2


Extraer info del log:
log[file,<regexp>,<encoding>,<maxlines>,<mode>,<output>]

Ejemplo:
log[/var/log/syslog,"Total processors activated: ([0-9]+)",,,,\1]o

Fr Feb 07 2014 11:07:36.6690 */ Thread Id 1400 (GLEWF) large result buffer allocation - /Length: 437136/Entries: 5948/User: AUser/Form: CFG:ServiceLevelAgreement
log[/path/to/the/file,large result buffer allocation.*Entries: ([0-9]+),,,,\1]
  extrae 5948
