https://www.pgbarman.org/
https://github.com/2ndquadrant-it/barman

El gestor de backups para Postgres.
Un barman para todos los database servers que tengamos.
Es un servicio que tiene que estar corriendo todo el rato, llevándose los WAL files y realizando basebackups periódicamente.
Al ser simple y usar herramientas estandar parece bastante fácil poder mejorarlo o arreglarlo en caso de problemas.

CUIDADO! Debemos hacer backup de los ficheros de config nosotros
/etc/postgresql/12/data


Mejor usar la conf para que se lleve los wal con streaming (pg_receivewal)
streaming_archiver = on

backup_method = postgres
  que haga uso de pg_basebackup

El problema de usar este nuevo método es que no tenemos backups incrementales, deduplicación, etc, pero ganamos en sencillez y usamos la forma estandar de postgres.

Existen comandos "barman-cloud-*", para subir las copias a S3, directamente o como método alternativo.
Usa python-boto, así que posiblemente compatible con ceph-rgw/minio/etc


# Install
repos
https://rpm.2ndquadrant.com/
https://apt.2ndquadrant.com/

Instalar también la misma versión de postgres para tener las apps que necesita para funcionar (pg_basebackup, etc)

Comentar /etc/cron.d/barman hasta que tengamos todo configurado.
No me gusta que se ponga a ejecutar cosas que están a medias.



# Config
General en /etc/barman.conf
Parámetros que típicamente podemos querer modificar:
  barman_home
  compression
  Pre/post * hook scripts -> compresion/monitoring
  last_backup_maximum_age
  minimum_redundancy, definir a un valor distinto de 0 para evitar borrados accidentales de todos los backups
  retention_policy
    estos últimos 3 parámetros para configurar cuantos backups almacenar

Particular de cada server en /etc/barman.d/xxx.conf
Para usar streaming seguir la template /etc/barman.d/streaming-server.conf-template
  [streaming] -> cambiar por el nombre del host. Poner un 001 al final e ir incrementándolo si hacemos upgrades de la instalación de postgres
  streaming_archiver = on
  backup_method = postgres
  create_slot = auto


Si usamos "[all]" se aplicará a todos los servers


En el server a monitorizar crear el user barman con superadmin:
createuser -s -P barman
  nos pedirá pass, meterla también en /var/lib/barman/.pgpass (el home directory del user creado por el RPM)
  vi /var/lib/barman/.pgpass
  chmod 0600 /var/lib/barman/.pgpass
createuser -P --replication streaming_barman
  este usuario para la replicación, poner misma pass, ya que la obtendrá tamién de /var/lib/barman/.pgpass
  Añadirlo al pg_hba:
  local   replication  streaming_barman  trust
  Probarlo:
  psql -U streaming_barman -h pg -c "IDENTIFY_SYSTEM" replication=1

Configurar el pg_hba adecuadamente para el acceso que vaya a tener para el user normal.

En las recomendaciones para hacer pg_basebackup se recomiendan 4, 2 necesarios y otros dos por si tuviese que reconectar que no tenga que esperar.
max_wal_senders = 4
max_replication_slots = 4


Comprobar config
barman list-server
  mirar que tenemos el server que hemos creado
barman show-server NOMBRECONFIG
  conecta con el server para obtener información, que muestra junto con la config que hayamos puesto, la config general y los valores por defecto de lo no definido
barman check NOMBRECONFIG
  para compobar si tenemos todo bien configurado
  si aún no hemos corrido "barman cron" será nomral que estén fallando "replication slot" (se creará la primera vez si lo tenemos en auto) y "receive-wal running"
  creará la estructura de directorios en /var/lib/barman/NOMBRECONFIG



## Hook scripts
Se ejecutará el comando que pasemos con las variables de entorno que se especifican en la documentación.

Variables interesantes:
BARMAN_HOOK=archive_script
  opciones: delete_script backup_script recovery_script wal_delete_script archive_script
BARMAN_SERVER=local002
BARMAN_PHASE=post

Al archivar wal:
BARMAN_FILE=/var/lib/barman/local002/wals/00000001000000BD/00000001000000BD000000EC

Al hacer basebackup:
BARMAN_BACKUP_DIR=
BARMAN_STATUS=WAITING_FOR_WALS
BARMAN_STATUS=DONE


El output solo se muestra en caso de error del script.

Ejemplo en caso de error (forzado con un exit 1):
2020-03-16 07:30:39,857 [30978] barman.hooks WARNING: /usr/local/bin/barman.sh returned 1
Output details:
Compress and delete file /var/lib/barman/local002/wals/00000001000000BD/00000001000000BD000000EB
/var/lib/barman/local002/wals/00000001000000BD/00000001000000BD000000EB : 16.70%   (16777216 => 2801514 bytes, /var/lib/barman/local002/wals/00000001000000BD/00000001000000BD000000EB.zst)


## Compression

## WAL
Podemos comprimir los ficheros wal al archivarlos
http://docs.pgbarman.org/release/2.10/#archiving-features

Parece mejor usar zstd, que es mucho más rápido que gzip/bzip2
PR para meter zstd dentro de barman: https://github.com/2ndquadrant-it/barman/pull/266

Podemos usar custom definiendo custom_compression_filter/custom_decompression_filter, aunque en la PR de zstd avisa de una posible condición de carrera cuando se intentan recuperar un backup donde algunos ficheros WAL aún no están archivados. PROBAR!

compression = custom
custom_compression_filter = /usr/bin/zstd -c
custom_decompression_filter = /usr/bin/zstd -c -d





# Ejecutar
barman no tiene un demonio.
Se basa en una serie de comandos y en ser ejecutado via cron.

Se instala por defecto con el rpm
/etc/cron.d/barman
Ejecuta "barman cron"
  por cada server ejecuta:
    archive-wal
      WAL maintenance operations, such as archiving (processing of the WAL files received from the streaming connection or from the archive_command or both) and compression
    receive-wal
      arranca el pg_receivewal (si no lo está ya)
      En el ps veremos por cada server que tengamos configurado el streaming de wals
      /usr/bin/python2 /bin/barman -c /etc/barman.conf -q receive-wal local002
       \_ /usr/pgsql-12/bin/pg_receivewal --dbname=dbname=replication options=-cdatestyle=iso replication=true user=streaming_barman application_name=barman_receive_wal --verbose --no-loop --no-password --directory=/var/lib/barman/local002/streaming --slot=barman

    check-backup
    retention-policy


Mirar /var/lob/barman/barman.log para ver si está funcionando.


Comprobar que funciona bien la recepción de WAL (una vez arrancado el pg_receivewal):
barman switch-wal NOMBRECONFIG --archive
  en el log generará una traza INFO cada 100ms hasta que apareza el wal (barman.wal_archiver INFO: No xlog segments found from streaming for NOMBRECONFIG.)

barman check NOMBRECONFIG
  comprobar que todo está OK

barman replication-status local002
  comprobar estado replicación


CUIDADO! Hasta aqui solo nos estamos llevando los WAL.
Deberemos configurar también los base backups periódicos.
Por ejemplo en: /etc/cron.d/barman-backup
No usar /etc/cron.d/barman para evitar conflictos con el RPM

## Ejecutar backup
barman backup NOMBRECONFIG --bwlimit 99999
  --wait, si queremos esperar hasta que se reciban todos los WAL que hagan válido el backup (falla si ya hay otro ejecutándose)
  Ejecuta:
  /usr/pgsql-12/bin/pg_basebackup --dbname=dbname=replication options=-cdatestyle=iso replication=true user=streaming_barman application_name=barman_streaming_backup -v --no-password --pgdata=/var/lib/barman/local002/base/20200313T103319/data --no-slot --wal-method=none --max-rate=99999


barman list-backup NOMBRECONFIG
  mostrar base backups
  Si al final pone WAITING_FOR_WALS es que no es aún válido, tiene que recibir ciertos WAL aún




# Dudas
Puede configurar el rate de basebackup?
  si, con --bwlimit, que lo pone como --max-rate=XXX
Diferencias entre compresión
No comprime backups??
  mirar custom_compression_filter
El sistema de retención no es muy potente. Solo x tiempo atrás. Estaría mejor uno que pudieses definir cosas, primer día de los últimos 12 meses.

Parece que el soporte, al menos a nivel github, no hace mucho caso.
Errores de gente con problemas en el backup sin razón aparente:
https://github.com/2ndquadrant-it/barman/issues/261
https://github.com/2ndquadrant-it/barman/issues/256
https://github.com/2ndquadrant-it/barman/issues/207

Sin documentación sobre que hacer tras un recover con PITR
https://github.com/2ndquadrant-it/barman/issues/218

Ciertas opciones no documentadas
https://github.com/2ndquadrant-it/barman/issues/270
custom_compression_filter

Cuidado si recibimos muchos WAL y comprimimos, a lo mejor no lo hacemos a tiempo
Tal vez la compresión tambień coma mucha CPU
https://github.com/2ndquadrant-it/barman/issues/181

Usar zstd como compresión?
PR pendiente de aprobación. Muy simple, no parece que vaya a suponer ningún problema
Si comprimimos con el post script, luego no funciona el --wait, porque va a buscar el fichero

Podemos usar postscripts para aplicar retenciones de borrado más "pro", estilo, un backup del primer día de los últimos 12 meses.
Habría que jugar un poco para conseguirlo y no tengo claro que "barman backup-list" los mostrase.
Tal vez jugando con el prebackup y postbackup cambiandole el nombre para "escondérselos".

La calidad del código es bastante mala
https://github.com/2ndquadrant-it/barman/blob/017b7cdf6c5bda4b750ef4438e0655381b5a930d/barman/fs.py#L108
Ahí por ejemplo están usando /usr/bin/test para comprobar si un path es un fichero

https://github.com/2ndquadrant-it/barman/blob/master/barman/command_wrappers.py función full_command_quote
Convierten una lista de args en una string con quotes.

La gestión de llamadas a comandos no está bien hecha.
Si no tenemos permisos para hacer un mkdir, no nos devuelve el error del comando mkdir (a parte que deberían usar la lib de python para esto)
En command_wrappers.py solo se retorna hacia arriba el return code y no el mensaje de error.



# Comands
Muchos de los comandos conectan a las bbdd para obtener info

barman list-server
barman cron
barman diagnose

barman show-server serverId
barman check serverId
barman status serverId
barman replication-status serverId
barman backup serverId
  realiza un basebackup
barman list-backup serverId

barman recover server1 latest /tmp/test
  nos pone el último backup en ese server (el último basebackup más todos los WAL disponibles)
  podemos usar "latest", "last", "first", "oldest"
  el directorio donde hacemos el recover tiene que tener permisos para el usuario barman (si da algún fallo de mkdir, será permisos seguramente (no lo dirá explicitamente), tal vez un dir superior?)
  Si queremos arrancarlo tendremos que cambiar los permisos a postgres:
  chown -R postgres:postgres DIRECTORIO
  Generalmente nuestros postgres arrancarán apuntado al dir de /etc: /usr/pgsql-12/bin/postmaster -D /etc/postgresql/12/data
  Si queremos arracar solo esta copia, pero sin usar esos ficheros de conf podemos hacer:
  1. modificar el puerto (si ya tenemos otro postgres en el puerto 5432)
  2. sudo -u postgres /usr/pgsql-12/bin/pg_ctl -D /var/lib/pgsql-backup/pruebarecover start
  O si queremos arrancarlo en foreground: sudo -u postgres /usr/pgsql-12/bin/postmaster -D /var/lib/pgsql-backup/pruebarecover
  Entrar: sudo -u postgres /usr/pgsql-12/bin/psql -p 5433


barman get-wal
  pensado para usar con el restore_command (tal vez interesante si tenemo el basedir de barman en un NFS y lo podemos montar donde vayamos a hacer el recovery)
  también dicen de usar barman-wal-restore para gestionar conex ssh. No dejan muy claro como funcionari

Pondremos un cron para ejecutar los "barman backup" y que se ejecuten los pg_basebackup
Podemos paralelizar (-j)

barman cron se ejecuta cada minuto para ejecutar tareas periódicas, retention_policy, compress wal, etc
Se meterá al instalarlo en el cron.d


# Retencion policy
Para ir borrando los backups y wal antiguos.

Config retention_policy, ejemplo:
RECOVERY WINDOW OF 2 WEEKS
REDUNDANCY 3

No se puede especificar tener backups más antiguos sin PITR.
En un futuro se podrá tener PITR de los últimos 7 días, por ejemplo, y backups simples de, por ejemplo, los primeros días de cada mes.



# Monitoring
Podemos usar la salida de este comando para poner una monitorización:
barman -f json check NOMBRECONFIG



# Geography redundancy
Tener un master-slave barman cluster.
El slave lo que hará es llevarse una copia tirando de los datos del master.
El slave no se puede usar.


# Administración
https://www.2ndquadrant.com/en/blog/barman-2-10-recovery-of-partial-wal-files/

## Estructura de directorios
/var/lib/barman/local002/incoming
  recepción de WAL via archive_command
/var/lib/barman/local002/streaming
  recepción de WAL vi pg_receivewal
/var/lib/barman/local002/wals
  WALs recibidos y archivados

