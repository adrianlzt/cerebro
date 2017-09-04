http://www.postgresql.org/docs/8.1/static/backup.html

## Formato custom ##
Custom, más potente. Nos permite a la hora de restaurar elegir el orden o seleccionar que restaurar:
Lleva compresión.

pg_dump -Fc -f /backup/prueba.custom prueba

Ver contenido del dump (los schemas, no los datos):
pg_restore -l prueba.custom

Ver todo el contenido:
pg_restore fichero.custom | less

Restaurar:
createdb prueba
pg_restore -v -e -Fc -d prueba /backup/prueba.custom
  -v verbose
  -e exit on error
  -Fc format custom
  -x para evitar errores tipo "role XXX does not exist"

## Formato SQL plano ##
Sin compresión
  pg_dump dbname > outfile
  
  Backup de todas las bases de datos:
  pg_dumpall > outfile
  
  Restaurar
  createdb dbname
  psql dbname < infile
   o
  psql -f infile postgres

Con compresión
  # su postgres
  $ pg_dump dbname | gzip > filename.gz

  Restauración
    # su postgres
    $ createdb dbname
    $ gunzip -c filename.gz | psql dbname


## Backup periodico en cron ##
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

