# Aumentar nivel de log
zabbix_server -R log_level_increase

Podemos aumentar solo uno de los procesos (syncers, discover, http poller, etc):
zabbix_server -R log_level_increase=trapper
  para mostrar info sobre los trappers

Podemos especificar un pid determinado, un tipo de proceso (como el ejemplo anterior) o un tipo y uno determinado:
  pid - Process identifier (1 to 65535)
  process type - All processes of specified type (e.g., poller)
  process type,N - Process type and number (e.g., poller,3)


Si queremos poner todos al nivel normal (bajamos 5 veces para asegurarnos que todos están en el 0 y luego los subimos 3/info):
zabbix_server -R log_level_decrease
zabbix_server -R log_level_decrease
zabbix_server -R log_level_decrease
zabbix_server -R log_level_decrease
zabbix_server -R log_level_decrease
zabbix_server -R log_level_increase
zabbix_server -R log_level_increase
zabbix_server -R log_level_increase


Activar el nivel de debug puede tener impacto sobre los procesos si usamos logeo a fichero o consola. Parece que no si logeamos a system (syslog en linux).
Función que realiza el logeo __zbx_zabbix_log (src/libs/zbxlog/log.c). Para fichero y consola tiene un lock para escribir

Niveles:
0 - basic information about starting and stopping of Zabbix processes (LOG_LEVEL_INFORMATION)
1 - critical information (LOG_LEVEL_CRIT)
2 - error information (LOG_LEVEL_ERR)
3 - warnings (LOG_LEVEL_WARNING)
4 - for debugging (produces lots of information) (LOG_LEVEL_DEBUG)
5 - extended debugging (produces even more information) (LOG_LEVEL_TRACE) -> tiene muy pocos usos, al menos en la versión 3.2.6


# Web interface
https://www.zabbix.com/documentation/4.0/manual/web_interface/debug_mode

Para activar el modo debug meteremos en el grupo "Enabled debug mode" al usuario que lo necesite.
A partir de entonces, cada vez que cargue una web aparecerá un botón abajo a la derecha "Debug".
Al pincharle, cada recuadro de la web que haga una consulta mostrará información de esta consulta.
Generalmente veremos una pantalla amarilla con los tiempos utilizados:

******************** Script profiler ********************
Total time: 0.028252
Total SQL time: 0.014138
SQL count: 10 (selects: 6 | executes: 4)
Peak memory usage: 7.25M
Memory limit: 128M

Y luego las consultas SQL lanzadas, especificando que fichero php las ha realizado:

SQL (0.000259): SET search_path = 'public'
zabbix.php:21 → require_once() → ZBase->run() → ZBase->initDB() → DBconnect() → DBexecute() in include/db.inc.php:84
