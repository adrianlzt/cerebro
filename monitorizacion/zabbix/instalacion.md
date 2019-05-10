Si tenemos que cargar los sql, el orden es:
schema
images
data


# Postgres
Si queremos conectar a un activo-pasivo podemos pasarlo en la cadena de conex, para reconectar cuando el activo caiga:

Server:
DBHost=
DBName=postgresql://postgres@192.168.32.4,192.168.32.3/zabbix?target_session_attrs=read-write

Web:
$DB['TYPE']     = 'POSTGRESQL';
$DB['SERVER']   = '';
//$DB['PORT']     = '5432';
//$DB['DATABASE'] = 'zabbix';
$DB['DATABASE'] = 'postgresql://postgres@192.168.32.4,192.168.32.3/zabbix?target_session_attrs=read-write';
//$DB['USER']     = 'postgres';
//$DB['PASSWORD'] = 'zabbix';

Parece que esto no vale y tengo que parchear el web:
--- db.inc.php  2019-05-08 15:06:00.762443320 +0200
+++ db.inc.php.orig     2019-05-08 15:05:35.835559060 +0200
@@ -75,7 +75,6 @@
                                        (!empty($DB['PASSWORD']) ? 'password=\''.pg_connect_escape($DB['PASSWORD']).'\' ' : '').
                                        (!empty($DB['PORT']) ? 'port='.pg_connect_escape($DB['PORT']) : '');

-                               $pg_connection_string = 'postgresql://postgres@192.168.32.4,192.168.32.3/zabbix?target_session_attrs=read-write';
                                $DB['DB']= @pg_connect($pg_connection_string);
                                if (!$DB['DB']) {
                                        $error = 'Error connecting to database.';

Hace falta que php tenga la extensión de postgres compilado contra una versión >=10. Mirar con phpinfo



# Web
La config se realiza en /etc/zabbix/web/zabbix.conf.php

En arch se generá en /usr/share/webapps/zabbix/conf/zabbix.conf.php

Instalar en arch con apache:
https://www.hiroom2.com/2017/10/12/archlinux-20171001-zabbix-en/



# History / trends
https://zabbix.org/wiki/Docs/howto/mysql_partition#Housekeeper_changes
Si vamos a hacer una instalación grande debemos particionar las tablas history y trends.
Deberemos también desactivar el Housekeeping (Administration -> General -> Housekeeping)
