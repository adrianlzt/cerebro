Check nagios para monitorizar https://labs.dalibo.com/check_pgbackrest

Full backup: todos los ficheros para poder realizar un restore.
Differential backup: solo se almacenan las diferencias respecto a un full backup.
Incremental backup: solo se almacenan las diferencias respecto al último backup (full o diff) (ese directorio no es completo, le hace falta el full para poder funcionar)

La idea es un servidor que hace backups de muchos otros nodos/clusters de postgres.
Por cada uno creamos un "stanza".

# Config
Todas las opciones de config: https://pgbackrest.org/configuration.html

/etc/pgbackrest/pgbackrest.conf
También puede ser el fichero definido en la variable de entorno PGBACKREST_CONFIG
https://pgbackrest.org/user-guide-rhel.html#quickstart/configure-stanza

Ejemplo básico, con una única stanza llamada zabbix.:
``````
[zabbix]
pg1-path=/var/lib/postgres/data
pg1-user=postgres

[global]
repo1-path=/var/lib/pgbackrest
``````
Crearemos los ficheros necesarios para el stanza:
sudo -u postgres pgbackrest --config /etc/pgbackrest/pgbackrest.conf --stanza zabbix stanza-create

En el server de postgres tendremos que tener configurado:
```
archive_command = 'pgbackrest --config /etc/pgbackrest/pgbackrest.conf --stanza=zabbix archive-push %p'
archive_mode = on
max_wal_senders = 3  # o mayor si tenemos réplicas
wal_level = replica
````
Algunos de esos parámetros necesitan reiniciar postgres (al menos el archive_mode).

Comprobamos que todo está configurado correctamente (comprueba parámetros de postgres y fuerza a archivar un WAL para ver que se hace correctamente)
Mirar los logs de postgres mientras lo ejecutamos por si saliese algún error:
sudo -u postgres pgbackrest --config /etc/pgbackrest/pgbackrest.conf --stanza zabbix --log-level-console=info check


# Backup
Los ficheros WAL los estará copiando postgres con el archive_command a /var/lib/pgbackrest/archive/STANZA/VERSION-POSTGRES/

Si queremos hacer un backup:
pgbackrest --config /etc/pgbackrest/pgbackrest.conf --stanza zabbix --log-level-console=info backup

Lo creará en:
/var/lib/pgbackrest/backup/STANZA/YYYYMMDD-HHMMSSF

Por defecto se intenta hacer un incremental backup, pero si no existe ningún full, hará un full.
Si queremos forzar un full: --type=full

El backup se tiene que realizar localmente en el nodo primario o, usando ssh, configurando el primario y la/las réplicas.

## Standby
https://pgbackrest.org/user-guide-rhel.html#standby-backup
Como usar, mayormente, un nodo standy/replica para obtener los fichero de backup.

## HA
https://community.pivotal.io/s/article/How-to-setup-pgbackrest-on-a-cluster-using-pg-auto-failover?language=en_US
Si tenemos un sistema con HA podemos hacer.
Tendremos un host donde se realizarán los backups (que podría ser uno de los nodos del cluster).
Los postgres tendrán configurado pgbackrest para archivar los WAL al "repo" de ese nodo que hace los backups.
El nodo que sea activo usará "achive_command" con pgbackrest para copiar por ssh los WAL al nodo que hace los backups (deberemos configurar claves ssh).

El nodo que hace los backups usará otra config de pgbackrest donde apuntará a los dos hosts de postgres. Cuando haga el backup se conectará por ssh para obtener los ficheros.

Podemos conbigurar "backup-standby=y" para que use mayormente el nodo replica para bajarse los datos, descargando al primario.


# Monitorización
pgbackrest info
pgbackrest --output=json info

https://pgbackrest.org/user-guide-rhel.html#monitor
Aquí nos explica como crear una función que ejecute ese comando por si queremos hacer queries que respondan el resultado del comando.

# Debug
--log-level-console=detail
--log-level-console=debug
