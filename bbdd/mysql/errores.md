ERROR 126 (HY000): Incorrect key file for table

Falta de espacio en la partición /tmp
Monitorizar (watch -n 1 df -h) mientras ejecutemos la query problemática y veremos como /tmp se va llenando hasta llegar al 100%.
Tras fallar la query el espacio se libera de nuevo.
http://stackoverflow.com/questions/19003106/mysql-error-126-incorrect-key-file-for-table




No me deja hacer una query cuando meto una palabra. Es reservada? Meter entre ``




https://dev.mysql.com/doc/refman/5.6/en/blocked-host.html
https://dev.mysql.com/doc/refman/5.6/en/server-system-variables.html#sysvar_max_connect_errors
Host 'host_name' is blocked because of many connection errors.  Unblock with 'mysqladmin flush-hosts'

La bbdd te echa si se producen muchos (valor de la variable max_connect_errors) errores de conexión simultáneos sin ninguna conexión buena.
El valor por defecto de max_connect_errors es 100. Podemos consultar el valor utilizado con:
SHOW VARIABLES LIKE 'max_connect_errors';

SET GLOBAL max_connect_errors=10000;

Podemos ver el contenido donde se almacenan estos datos con:
select * from performance_schema.host_cache\G
  debe estar habilitado el performance_schema, mirar performance_schema.md
https://dev.mysql.com/doc/refman/5.6/en/host-cache-table.html

select * from hosts; tambien nos dará algo de información sobre conexiones totales.
