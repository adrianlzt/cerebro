Full backup: todos los ficheros para poder realizar un restore.
Differential backup: solo se almacenan las diferencias respecto a un full backup.
Incremental backup: solo se almacenan las diferencias respecto al último backup (full, diff o incremental). Más complejo de restaurar, ya que hace falta ir sumando a full todos los incrementales.

La idea es un servidor que hace backups de muchos otros nodos/clusters de postgres.
Por cada uno creamos un "stanza".

# Config

Todas las opciones de config: <https://pgbackrest.org/configuration.html>
Config real explicada en <https://pgstef.github.io/2019/03/26/pgbackrest_archiving_tricks.html>

Config para usar con patroni: <https://pgstef.github.io/2022/07/12/patroni_and_pgbackrest_combined.html>

Si tenemos muchos wal, usar async archive: <https://pgbackrest.org/user-guide.html#async-archiving>
Mirar más abajo el detalle.

Parece que no se puede hacer archive en el nodo standby, de la doc oficial:
To get a complete series of WAL files in the archive, you must ensure that all WAL is archived, before it reaches the standby

/etc/pgbackrest/pgbackrest.conf
También puede ser el fichero definido en la variable de entorno PGBACKREST_CONFIG
<https://pgbackrest.org/user-guide-rhel.html#quickstart/configure-stanza>

Ejemplo básico, con una única stanza llamada zabbix.:

```
[zabbix]
pg1-path=/var/lib/postgres/data
pg1-user=postgres

[global]
repo1-path=/var/lib/pgbackrest
```

Crearemos los ficheros necesarios para el stanza:
sudo -u postgres pgbackrest --config /etc/pgbackrest/pgbackrest.conf --stanza zabbix stanza-create

En el server de postgres tendremos que tener configurado:

```
archive_command = 'pgbackrest --config /etc/pgbackrest/pgbackrest.conf --stanza=zabbix archive-push %p'
archive_mode = on
max_wal_senders = 3  # o mayor si tenemos réplicas
wal_level = replica
```

Algunos de esos parámetros necesitan reiniciar postgres (al menos el archive_mode).

Comprobamos que todo está configurado correctamente (comprueba parámetros de postgres y fuerza a archivar un WAL para ver que se hace correctamente)
Mirar los logs de postgres mientras lo ejecutamos por si saliese algún error:
sudo -u postgres pgbackrest --config /etc/pgbackrest/pgbackrest.conf --stanza zabbix --log-level-console=info check

## s3

<https://bun.uptrace.dev/postgres/pgbackrest-s3-backups.html#installation>

Almacenar los backups y WAL en s3. Podemos usar minio.
<https://pgstef.github.io/2019/07/19/pgbackrest_s3_configuration.html>

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

Solo guardar los WAL desde el ultimo backup diff/incr
repo1-retention-archive-type=diff/incr # uno de los dos
repo1-retention-archive=1
Se guardarán los WAL necesarios para restaurar un backup y todos los WAL desde el último backup hasta el momento actual.
Cuando se realize otro backup, se borrarán esos WAL dejando solo los necesarios para restaurar el backup.

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
<https://www.postgresql.org/message-id/20191011125053.GF6962%40tamriel.snowman.net>

## Configs

<https://pgbackrest.org/configuration.html#section-archive/option-archive-push-queue-max>
archive-push-queue-max
Tamaño máximo de la cola de ficheros WAL.

Si se llena esa cola veremos mensajes en postgres tipo:
WARN: dropped WAL file '00000003000001740000004F' because archive queue exceeded 50GB

Será que estamos generando muchos WAL y no es capaz de archivarlos a tiempo.
Se pone un límite máximo para evitar llenar el disco.

## Async

<https://pgbackrest.org/configuration.html#section-archive/option-archive-async>
Asynchronous operation is more efficient because it can reuse connections and take advantage of parallelism

Primero una nota de como funciona el archive de PostgreSQL: <https://www.dbi-services.com/blog/__trashed-3/>
Cuando activamos el archive_mode, por cada fichero WAL a archivar (ficheros WAL ya consolidados) se ejecuta el archive_command.
Si el archive_command termina correctamente, se generará un fichero .done en el directorio pg_wal/archive_status/.
Si falla, se generará un fichero .ready en el mismo directorio, indicando que hace falta reintentar el archivado.

El modo asíncrono lo que hace es mantener una comunicación (vía ficheros del spool path) entre los procesos que ejecuta postgres y un proceso en background que se encarga de archivar los ficheros WAL.

When executed with archive-push in an asynchronous configuration, the command performs the following actions based on the cmdArchivePush function:

1 It enters a loop, waiting up to the configured archive-timeout.
2 Inside the loop, it first checks if the specified WAL segment has already been successfully pushed by the background async process (si existe el .fichero .ok en el spool path)
3 If the WAL segment has not been pushed and a background async process has not yet been started by this command execution, it will:
   • Acquire a lock.
   • Fork a new background archive-push process with the async role (archive-push:async). This new process is responsible for doing the actual work of pushing WAL files.
   • Release the lock (/tmp/pgbackrest/iometrics-archive.lock)
4 The original command continues to wait and check the status until it sees that the specific WAL file has been successfully archived or the timeout is reached.
5 If the WAL file is not pushed before the timeout, an error is thrown. Otherwise, it logs a success message.

Si pgbackrest async termina bien, genera un fichero NOMBREWAL.ok en el spool path cuando termina.
Este fichero es la señal que usa para decirle al pgbackrest que ha lanzando postgres que ha terminado bien.
Si terminal mal, generará un fichero NOMBREWAL.error o global.error, con el error dentro.
Si no es capaz de archivar, tras 8 minutos de timeout, generará un error que leera el pgbackrest lanzado por postgres.

El proceso que lanzó postgres está mirando si aparece en /var/lib/postgresql/spool/archive/iometrics/out/ uno de estos ficheros:
NOMBREWAL.ok
NOMBREWAL.error
global.error

Si pgbackrest no está siendo capaz de archivar los WAL a una velocidad suficiente, se emepezarán a encolar en el directorio pg_wal.
Para proteger a postgres existe el parámetro archive-push-queue-max. Si hay más de esa cantidad de WAL esperando ser archivados, el pgbackrest push-async se "rinde" y da todos por archivados, esto es que genera ficheros .ok en el spool path para todos los WAL que están en pg_wal/archive_status/ con .ready.
Esto lo que hace es decir a postgres que todo se ha archivado correctamente, aunque es mentira. De esta manera evitamos llenar el disco con los ficheros WAL que no se están pudiendo archivar.

Para calcular este tamaño de cola, en modo asíncrono, pgbackrest mira que ficheros wal están con .ready en el pg_wal/archive_status/ y quita los marcados como enviados (.ok en el spool path).

Genera este error por cada WAL no archivado:
2023-10-27 12:44:50.607 P00 WARN: dropped WAL file '000000060000074A00000009' because archive queue exceeded 128MB

Si vemos este error quiere decir que hemos roto el backup, porque no hemos podido archivar los WAL necesarios para restaurar el backup.

# Backup

Los ficheros WAL los estará copiando postgres con el archive_command a /var/lib/pgbackrest/archive/STANZA/VERSION-POSTGRES/

Si queremos hacer un backup:
pgbackrest --config /etc/pgbackrest/pgbackrest.conf --stanza zabbix --log-level-console=info backup

Lo creará en:
/var/lib/pgbackrest/backup/STANZA/YYYYMMDD-HHMMSSF

Por defecto se intenta hacer un incremental backup, pero si no existe ningún full, hará un full.
Si queremos forzar un full: --type=full

El backup se tiene que realizar localmente en el nodo primario o, usando ssh, configurando el primario y la/las réplicas.

Cuando termina el backup comprueba si tiene archivados los WAL que necesita para poder restaurar.
Vemos que lo intenta con esta línea de log:
INFO: check archive for segment(s) 000000060000074D0000002B:000000060000074D0000002F

Si no consigue los WAL, tras un timeout (60s por defecto), saltará un error y descartará el backup:
ERROR: [082]: WAL segment 000000060000074D0000002B was not archived before the 60000ms timeout
HINT: check the archive_command to ensure that all options are correct (especially --stanza).
HINT: check the PostgreSQL server log for errors.
HINT: run the 'start' command if the stanza was previously stopped.
INFO: backup command end: aborted with exception [082]

## Standby

<https://pgbackrest.org/user-guide-rhel.html#standby-backup>
Como usar, mayormente, un nodo standby/replica para obtener los fichero de backup.

Si la réplica no funciona, no se podrá realizar el backup.

## HA

<https://community.pivotal.io/s/article/How-to-setup-pgbackrest-on-a-cluster-using-pg-auto-failover?language=en_US>
<https://archive.is/QfQdo>

Si tenemos un sistema con HA podemos hacer.
Tendremos un host donde se realizarán los backups (un tercer nodo).
Los postgres tendrán configurado pgbackrest para archivar los WAL al "repo" de ese nodo que hace los backups.
El nodo que sea activo usará "achive_command" con pgbackrest para copiar los WAL al repositorio.

El nodo que hace los backups usará otra config de pgbackrest donde apuntará a los dos hosts de postgres. Cuando haga el backup se conectará por ssh para obtener los ficheros.

Podemos configurar "backup-standby=y" para que use mayormente el nodo replica para bajarse los datos, descargando al primario.

# Monitorización

pgbackrest info
pgbackrest --output=json info

<https://pgbackrest.org/user-guide-rhel.html#monitor>
Aquí nos explica como crear una función que ejecute ese comando por si queremos hacer queries que respondan el resultado del comando.

Check nagios para monitorizar <https://labs.dalibo.com/check_pgbackrest>
pgBackRest doesn’t check that all the needed WAL segments are still present. check_pgbackrest is clearly built for that

# Debug

--log-level-console=detail
--log-level-console=debug

# Restore

<https://pgbackrest.org/user-guide-rhel.html#restore>

Parar postgres/cluster.
Borrar PGDATA en los hosts.

En uno de los nodos recuperar el backup (si ni ponemos --set pillará el último; podemos especificar PITR):
sudo -u postgres /usr/bin/pgbackrest --config /etc/pgbackrest/pgbackrest.conf --stanza=iometrics restore --set 20231010-162101F

# Expire

Borrar backups antiguos.

Por defecto se ejecuta tras un backup correcto (--expire-auto, por defecto a "y").

Si queremos borrar todos los full menos 1 (no podemos borrar todos, la retention no se puede poner a 0):
pgbackrest --config /etc/pgbackrest/pgbackrest.conf expire --stanza=iometrics --repo1-retention-full=1 --repo1-retention-full-type=count

# Verify

<https://github.com/pgbackrest/pgbackrest/issues/1032>
Añadido en la 2.39
Verify command to validate the contents of a repository.

Es bastante lento.
2m30 en una bbdd casi vacía
33m con algunos backups de ~100GB

Probé a quitar uno de los directorios de archive WAL del s3 (minio) y no se quejó.

# Calculo storage

El peor escenario es justo antes de que se borre un full backup.

Si tenemos una retención full de 7 días, cada 14 días, justo antes de la finalización del backup full, tendremos almacenados:
3 x backup full + backups incrementales + wal

Esto suponiendo que realizamos los backups full cada 7 días y los incrementales cada día.

Hoja de cálculo jugando con los números: <https://docs.google.com/spreadsheets/d/1pciYqWFENX93Sq6p9R4if_hkMcXOFB9fnXuUvvtk0e8/edit?usp=sharing>

# Troubleshooting

No podemos usar versiones de pgbackrest distintas (la que hace el backup y el de la máquina destino).
Nos dará un warning, pero no funcionará.
