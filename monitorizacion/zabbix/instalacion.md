Si tenemos que cargar los sql, el orden es:
schema
images
data


# Postgres
Si queremos conectar a un activo-pasivo podemos pasarlo en la cadena de conex, para reconectar cuando el activo caiga:

Server:
DBHost=
DBName=postgresql://postgres@192.168.32.4,192.168.32.3/zabbix?target_session_attrs=read-write

Web (no funciona, mirar parcheo):
$DB['TYPE']     = 'POSTGRESQL';
$DB['SERVER'] = '192.168.32.4:5432,192.168.32.3:5432'
$DB['PORT']     = '5432';
$DB['DATABASE'] = 'zabbix';
$DB['USER']     = 'postgres';
$DB['PASSWORD'] = 'zabbix';

Parece que esto no vale y tengo que parchear el web.

Creo que este parche es de la 3.2
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

Para zabbix-web 6.0, parche mejorado:
```
--- db.inc.php.orig	2022-08-19 16:17:34.861338902 +0200
+++ db.inc.php	2022-08-22 13:50:16.809332144 +0200
@@ -65,7 +65,23 @@
 		);
 	}
 
+    // Modificado para poder conectar a varias instancias de postgres y que utilice la activa [@adrian/Datadope]
+    // En $DB['USER'] pondremos la lista de IPs y puertos separados por comas. Ejemplo: 192.168.0.10:5432,192.168.0.99:5432
+
+    // Necesitamos esta función para que setee el dbname y schema correctamente. Se usa para verificar la versión.
 	$DB['DB'] = $db->connect($DB['SERVER'], $DB['PORT'], $DB['USER'], $DB['PASSWORD'], $DB['DATABASE'], $DB['SCHEMA']);
+    // La conexión no se podrá producir, porque en SERVER tendremos dos hosts separados por comas.
+    // Esto provocará que se setee la variable db->error, que provocará la finalización de esta función.
+    // Para evitarlo limpiamos ese error.
+    $db->setError('');
+
+    $pg_connection_string = 'postgresql://'.$DB['USER'].':'.$DB['PASSWORD'].'@'.$DB['SERVER'].'/'.$DB['DATABASE'].'?target_session_attrs=read-write';
+	$DB['DB'] = pg_connect($pg_connection_string);
+    // En caso de no poder conectar, mostraremos el error en la interfaz web.
+    if (!$DB['DB']) {
+		$error = error_get_last()['message'];
+        return false;
+    }
 
 	if ($DB['DB']) {
 		$db->init();
```

Si usamos la imagen de zabbix-web para docker también necesitaremos modificar el entrypoint:
```
--- docker-entrypoint.sh.orig   2022-08-15 20:05:31.000000000 +0200
+++ docker-entrypoint.sh        2022-08-22 08:37:31.563777026 +0200
@@ -104,7 +104,9 @@
         export PGSSLKEY=${ZBX_DBTLSKEYFILE}
     fi

-    while [ ! "$(psql --host ${DB_SERVER_HOST} --port ${DB_SERVER_PORT} --username ${DB_SERVER_ZBX_USER} --dbname ${DB_SERVER_DBNAME} --list --quiet 2>/dev/nu
ll)" ]; do
+    # Modificado para poder conectar a varias instancias de postgres y que utilice la activa [@adrian/Datadope]
+    pg_connection_string="postgresql://${DB_SERVER_ZBX_USER}@${DB_SERVER_HOST}/${DB_SERVER_DBNAME}?target_session_attrs=read-write"
+    while [ ! "$(psql --dbname "${pg_connection_string}" --list --quiet 2>/dev/null)" ]; do
         echo "**** PostgreSQL server is not available. Waiting $WAIT_TIMEOUT seconds..."
         sleep $WAIT_TIMEOUT
     done
```



# Web
La config se realiza en /etc/zabbix/web/zabbix.conf.php

En arch se generá en /usr/share/webapps/zabbix/conf/zabbix.conf.php

Instalar en arch con apache:
https://www.hiroom2.com/2017/10/12/archlinux-20171001-zabbix-en/



# History / trends
https://zabbix.org/wiki/Docs/howto/mysql_partition#Housekeeper_changes
Si vamos a hacer una instalación grande debemos particionar las tablas history y trends.
Deberemos también desactivar el Housekeeping (Administration -> General -> Housekeeping)

Otro detalle a tener en cuenta es que el valor de "History storage period (in days)" se usa al pintar las gráficas de "Latest data", para saber si debe usar tablas history o trends.
Por lo que deberemos poner ese valor siguiendo el mismo formato que el borrado de particiones de history.

Mirar postgresql.md para ver como hacer el particionado en postgres
