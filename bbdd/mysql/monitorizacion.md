mysql> show full processlist;
Ver que usuarios están conectados y que están haciendo.

Top para mysql
innotop


Monitorizar si está activo el nodo:
http://www.mysqlperformanceblog.com/2010/05/05/checking-for-a-live-database-connection-considered-harmful/

"SELECT 1 FROM DUAL"


No chequear con check_tcp porque mysql lo cuenta como conexión errónea.
Creo que al final saltaba un mensaje como:
Unable to connect to database [Host '10.0.2.5' is blocked because of many connection errors; unblock with 'mysqladmin flush-hosts']



A partir de la 5.6
http://githubengineering.com/using-mysql-performance-schema-for-workload-analysis/


Para el check de monitoring plugins podemos crear un user sin permisos:
CREATE USER 'icingacheck'@'localhost' IDENTIFIED BY 'IcingaCheck';
