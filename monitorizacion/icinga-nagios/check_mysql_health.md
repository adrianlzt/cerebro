Buen check para mysql:
http://labs.consol.de/lang/en/nagios/check_mysql_health/

Y unos ejemplos de lo que se puede/debe configurar:
https://github.com/shinken-monitoring/pack-mysql/tree/master/pack/services


El check necesita (en CentOS 6) de las librerias:
yum install -y perl-DBI perl-DBD-MySQL


Si se pone en el --warning o el --critical un valor numérico (ej.: 90), cambiará de estado al pasar ese valor.
Si por el contrario se pone un valor seguido por dos puntos (ej.: 50:), cambiará el estado al bajar de ese valor.


