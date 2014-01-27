#http://www.mysqlperformanceblog.com/2012/12/28/auditing-login-attempts-in-mysql/

En [mysqld]
# Activo logs
#log = /srv/mysql/mysqld.log
#log-error = /srv/mysql/mysqld.error.log


En mysql 5.1 en adelante, configurable en runtime
# mysqladmin -u root -p variables | grep general
| general_log                                       | OFF                                                                                                                    |
| general_log_file                                  | /var/lib/mysql/adrian-HP.log
mysql> show variables like '%general_log%';

mysql> set global general_log=ON;


Activar logs para ver fallos de conexión:
set global log_warnings=0;

O en my.cnf:
[mysqld]
log-warnings


Loguear con tcpdump y luego parsear en busca de fallos de conexión:
https://bugs.launchpad.net/percona-toolkit/+bug/1103045


Flush logs:
mysql -uroot -e \"PURGE BINARY LOGS BEFORE DATE_SUB( NOW( ), INTERVAL 3 DAY);\"
