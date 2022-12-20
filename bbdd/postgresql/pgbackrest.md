Full backup: todos los ficheros para poder realizar un restore.
Differential backup: solo se almacenan las diferencias respecto a un full backup.
Incremental backup: solo se almacenan las diferencias respecto al último backup (full o diff) (ese directorio no es completo, le hace falta el full para poder funcionar)

La idea es un servidor que hace backups de muchos otros nodos/clusters de postgres.
Por cada uno creamos un "stanza".

# Config
Todas las opciones de config: https://pgbackrest.org/configuration.html
Config real explicada en https://pgstef.github.io/2019/03/26/pgbackrest_archiving_tricks.html

Config para usar con patroni: https://pgstef.github.io/2022/07/12/patroni_and_pgbackrest_combined.html

Si tenemos muchos wal, usar async archive: https://pgbackrest.org/user-guide.html#async-archiving

Parece que no se puede hacer archive en el nodo standby, de la doc oficial:
To get a complete series of WAL files in the archive, you must ensure that all WAL is archived, before it reaches the standby


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

## s3
https://bun.uptrace.dev/postgres/pgbackrest-s3-backups.html#installation

Almacenar los backups y WAL en s3. Podemos usar minio.
https://pgstef.github.io/2019/07/19/pgbackrest_s3_configuration.html

[global]
repo1-path=/
repo1-type=s3
repo1-s3-endpoint=172.30.10.15:9000
repo1-s3-bucket=pgbackrest
repo1-s3-verify-tls=n
repo1-s3-key=dWIOKckUJv
repo1-s3-key-secret=ip1gS8tG16FvGWs7Q
repo1-s3-region=eu-west-3
repo1-s3-uri-style=path


Solo guardar los WAL desde el ultimo backup diff
repo1-retention-archive-type=diff
repo1-retention-archive=1

Para evitar un warning al hacer el backup. Solo se mantendrán los diff backups correspondientes a los basebackup que tengamos
repo1-retention-diff=9999999

Guardar un full backup de, al menos, los ultimos 7 dias
repo1-retention-full-type=time
repo1-retention-full=7

Obtener del nodo standby todo lo posible al hacer el backup, para descargar al primario
backup-standby=y

Si va muy lento el backup, podemos poner más procesos.
CUIDADO con esto si estamos haciendo el backup en la primaria!
process-max=4


Va despacio? Mirar comentarios aquí:
https://www.postgresql.org/message-id/20191011125053.GF6962%40tamriel.snowman.net


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

Check nagios para monitorizar https://labs.dalibo.com/check_pgbackrest
pgBackRest doesn’t check that all the needed WAL segments are still present. check_pgbackrest is clearly built for that


# Debug
--log-level-console=detail
--log-level-console=debug
