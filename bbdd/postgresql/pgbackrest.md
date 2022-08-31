Check nagios para monitorizar https://labs.dalibo.com/check_pgbackrest

Full backup: todos los ficheros para poder realizar un restore.
Differential backup: solo se almacenan las diferencias respecto a un full backup.
Incremental backup: solo se almacenan las diferencias respecto al último backup (full o diff)

La idea es un servidor que hace backups de muchos otros nodos/clusters de postgres.
Por cada uno creamos un "stanza".

## Config
Todas las opciones de config: https://pgbackrest.org/configuration.html

/etc/pgbackrest/pgbackrest.conf
https://pgbackrest.org/user-guide-rhel.html#quickstart/configure-stanza

Ejemplo básico, con una única stanza llamada zabbix.:
``````
[zabbix]
pg1-path=/var/lib/postgres/data
pg1-database=zabbix
pg1-user=postgres

[global]
repo1-path=/var/lib/pgbackrest
