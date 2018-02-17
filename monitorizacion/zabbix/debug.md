# Aumentar nivel de log
zabbix_server -R log_level_decrease=trapper
  para mostrar info sobre los trappers


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
