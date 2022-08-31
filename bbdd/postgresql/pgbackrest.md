Check nagios para monitorizar https://labs.dalibo.com/check_pgbackrest

Full backup: todos los ficheros para poder realizar un restore.
Differential backup: solo se almacenan las diferencias respecto a un full backup.
Incremental backup: solo se almacenan las diferencias respecto al último backup (full o diff)

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


# Debug
--log-level-console=detail
--log-level-console=debug
