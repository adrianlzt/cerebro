http://www.postgresql.org/docs/8.1/static/backup.html
https://www.opsdash.com/blog/postgresql-backup-restore.html

https://www.pgbarman.org/index.html
Solución completa de backup y restore simplificada
No soporta "streaming replication protocol"


Dos tipos de backups:
 - lógicos (lo que hace pg_dump): saca el contenido de una base de datos
   Cons:
     - no permite arrancar un standy server
     - ocupa mucho espacio
     - mala performance
     - puede joder el filesystem cache
     - escribir el dump genera I/O
     - restore muy lento para ddbb grandes!
   Pros:
     - flexibilidad
     - solo hace falta un user read only
     - se pueden restaurar solo ciertos objetos (usando el formato custom)
     - se puede modificar el SQL a mano antes de restaurarlo (usando el formato SQL)

 - físicos (base backup): copia de los ficheros de pg_data
   Cons:
     - ocupa más??
     - se hace un backup de todo (no podemos elegir ciertas databases)
     - tiene que restaurarse en un postgres igual (arquitectura, version, compile flags and paths)
     - genera mucho I/O (lectura de todos los ficheros)
   Pros:
     - más rápidos

Parece que lo mejor es tener un hot standby server donde realizar los backups (pero tenemos el coste de tener otro server).
Y realizar full backups periodicamente mientras almacenamos continuamente los ficheros WAL, esto nos permite restaurar en un punto determinado del tiempo (PITR, point-in-time recovery)
  mirar como se restaura un PITR en https://www.opsdash.com/blog/postgresql-backup-restore.html#point-in-time-recovery-pitr

También podemos hacer un backup lógico en un hot standby. Tener en cuenta: https://dba.stackexchange.com/questions/30626/running-pg-dump-on-a-hot-standby-server

Un full backup cada n días y un incremental backup (WAL files) cada hora.

Monitorizar que estamos realizando los backups, el tiempo que tardan, probar a restaurar los últimos backups y el tiempo de restauración:
  you should also have another cron job that picks up a recent backup and tries to restore it into an empty database, and then deletes the database. This ensures that your backups are accessible and usable


# Backup lógico

## Formato custom
Custom, más potente. Nos permite a la hora de restaurar elegir el orden o seleccionar que restaurar:
Lleva compresión (mirar parámetro -Z).
  Más compresión, limitado por la CPU
  Menos compresión, limitado por I/O

pg_dump -Fc -d prueba -n public -f prueba.custom
  -x si no queremos guardar informacion de roles (permisos de las tablas)

Ver contenido del dump (los schemas, no los datos):
pg_restore -l prueba.custom

Ver todo el contenido:
pg_restore fichero.custom | less

Restaurar (CUIDADO, muy lento para ddbb grandes):
createdb prueba
pg_restore -v -e -Fc -d prueba -1 /backup/prueba.custom
  -1 todo en una única transaccion, si falla deja vacía la bbdd
  -v verbose
  -e exit on error
  -Fc format custom
  --no-privileges --no-owner "role XXX does not exist"

Podemos quitar -1 y usar -jN para paralelizar (no compatible con -1)
Mejorar performance con fsync=off en el file system? (https://www.hagander.net/talks/Backup%20strategies.pdf)


## Formato SQL plano
Sin compresión
  pg_dump -d dbname -n public -f outfile.sql

  Backup de todas las bases de datos:
  pg_dumpall > outfile

Restaurar simple
  createdb dbname
  psql dbname < infile
   o
  psql -f infile -d dbname

La forma correcta (-1 indica que se haga todo en una única transacción, "o todo o nada"):
PGOPTIONS='--client-min-messages=warning' psql -X -q -1 -v ON_ERROR_STOP=1 --pset pager=off -d mydb_new -f mydb.sql -L restore.log


Con compresión
  # su postgres
  $ pg_dump dbname | gzip > filename.gz

  Restauración
    # su postgres
    $ createdb dbname
    $ gunzip -c filename.gz | psql dbname



## Backup periodico en cron
https://wiki.postgresql.org/wiki/Automated_Backup_on_Linux

Los scripts y el fichero de conf están en backup-scripts
pg_backup.sh - hace simplemete el backup
pg_backup_rotated.sh - hace el backup y rota los ficheros

IMPORTANTE:
Por defecto el comando es 'psql -h "$HOSTNAME"', esto hace que el usuario intente acceder via localhost.
La autenticación por defecto permite al usuario postgres acceder pero via socket.
Una solución sin cambiar la autentificación es quitar '-h "$HOSTNAME"' de los comandos psql.

Tenemos que crear /home/backups/database/postgresql/ y darle permisos al usuario postgres
mkdir -p /home/backups/database/postgresql/ && chown postgres:postgres -R /home/backups/database/
chgrp postgres /home/backups; chmod g+rwx /home/backups

La entrada de cron debe configurarse para ejecutarse como el usuario postgres.
Los scripts pg_backup.sh y pg_backup_rotated.sh van a buscar el fichero pg_backup.config en su mismo directorio.
También le podemos pasar la ubicación del fichero con el parámetro -c

cp pg_backup.config /etc/ && chown root:postgres /etc/pg_backup.config && chmod 640 /etc/pg_backup.config
cp pg_backup.sh /usr/local/sbin/ && chmod 755 /usr/local/sbin/pg_backup.sh
cp pg_backup_rotated.sh /usr/local/sbin/ && chmod 755 /usr/local/sbin/pg_backup_rotated.sh

/etc/cron.d/postgresql
# Generate backup all days at 02:30
30 02 * * * postgres /usr/local/sbin/pg_backup_rotated.sh -c /etc/pg_backup.config





# Base backup / físico
https://blog.2ndquadrant.com/what-does-pg_start_backup-do/
Esto hace un backup de un postgres entero, de los ficheros binarios.

Se hace conectando un cliente con el protocolo de replicación y obteniendo una copia consistente de PGDATA tras el final de alguna transacción.

Necesitamos explicitar un usuario que pueda conectarse de este modo (pg_hba.conf):
# TYPE  DATABASE        USER            ADDRESS                 METHOD
local   replication     postgres                                trust

kill -HUP PID_POSTGRES


Necesitamos configurar el max_wal_senders a, al menos, 4 (dos conex para el pg_basebackup y otras dos extra por si se desconectase pudiese inmediatamente reconectar)
max_wal_senders = 4
wal_level = replica  # puede tener cierto impacto en performance para algunos comandos (crear tablas, indices, etc) https://www.postgresql.org/docs/9.6/static/populate.html#POPULATE-PITR
systemctl restart postgres (requiere reinicio)

Para evitar perder datos entre el comienzo del backup y el fin, es necesario que se obtengan tambien los ficheros transaction log (WAL)

Si queremos hacer un base backup parece que hay que usar
pg_basebackup --xlog-method=stream --D /path/to/dir -P
  con "stream" no podemos usar tar
  el espacio consumido será lo que ocupe PGDATA
  tiene bastante impacto en el I/O
pg_basebackup --xlog-method=fetch --format=tar -z -D /path/to/dir -P
  --xlog-method=fetch it is necessary for the wal_keep_segments parameter to be set high enough that the log is not removed before the end of the backup. If the log has been rotated when it's time to transfer it, the backup will fail and be unusable.
  -P show progress (hace el backup algo más lento)
  --format=tar -Z: generamos ficheros .tar.gz por cada tablespace
  -Z [0-9] nos permite especificar mayor/menor tasa de compresión

Restaurar, parar postgres, mover los ficheros al PGDATA y arrancar.

NO HACER!
psql -U usuario -d postgres -p ${POSTGRESQL_PORT} -c "select pg_start_backup('Daily Backup'), current_timestamp"
tar -cvzf ${BACKUP_DIR}/data-$(date +%Y%m%d).tar.gz ${DATA_BASE_DIR}
psql -U usuario -d postgres -p ${POSTGRESQL_PORT} -c "select pg_stop_backup(), current_timestamp"

Estos comandos fuerzan a hacer un checkpoint y escribir todo a disco para poder hacer una copia de los ficheros a nivel de sistema de ficheros.
Ejecutar pg_start_backup no limita que se siga escribiendo al data directory.

The key point is that the base backup is NOT a consistent copy of the database. You might have copied every file, but all the data is taken at different times. So its wrong. Until you recover the database with the WAL changes that occurred between the start backup and the stop backup.
FIN NO HACER!
