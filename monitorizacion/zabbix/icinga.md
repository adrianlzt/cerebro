Wrapper para usar scripts de nagios/icinga en zabbix
https://www.zabbix.com/forum/showthread.php?t=12187

Zabbix solo soporta recibir un valor por cada llamada.
Si el script de nagios devuelve varios valores, en el wrapper deberemos especificar cual de ellos necesitamos.

El wrapper se configura como un UserParameter en los agentes de zabbix y desde la web configuramos que script de nagios queremos lanzar, con que parámetros y que queremos retornar.
