http://debian-handbook.info/browse/stable/sect.backup.html
http://www.dirvish.org/
http://www.dirvish.org/debian.howto.html
http://wiki.edseek.com/howto:dirvish

It uses a backup storage space (“bank” in its vocabulary) in which it places timestamped copies of sets of backup files (these sets are called “vaults” in the dirvish documentation).
En el master.conf se definen los backups que se hacen, donde se guardan, y la temporalización de las copias.
En el “bank”, existe un directorio por cada backup que se quiere hacer, y dentro de él un directorio que se llama dirvish, donde se almacena la configuración para poder hacer dicho backup (default.conf).


Ejemplo de configuración de /etc/dirvish/master.conf

# Donde se almacenaran las copias
bank:
        /opt/backups

# Ficheros excluidos de todos los backups
exclude:
        lost+found/
        core
        *~
        .nfs*
        dirvish.pre-client
        dirvish.post-client

# Backups a ejecutar
Runall:
        mysqlAgora
        svnAgora
        webKhepera
#       khepera3
#       etc     22:00
#       kevinporta
#       okapi   22:00
#       khepera 22:00
#       agora   22:00

# Tiempo tras que el que expiraran las copias que no tengan otra definicion (en expire-rule)
expire-default: +15 days

# Guarda las copias de los domingos durante 3 meses
# Guarda las copias del primer domingo de cada mes durante un año
# Guarda una copia cuatrimestral para siempre
expire-rule:
#       MIN HR    DOM MON       DOW  STRFTIME_FMT
        *   *     *   *         1    +3 months
        *   *     1-7 *         1    +1 year
        *   *     1-7 1,4,7,10  1
#       *   10-20 *   *         *    +4 days
#       *   *     *   *         2-7  +15 days

# Ejecucion de los scripts antes y despues de la copia con rsync (necesario para hacer los backups de mysql)
pre-client: ; if [ -f $DIRVISH_SRC/dirvish.pre-client ] ; then $DIRVISH_SRC/dirvish.pre-client $DIRVISH_SRC $DIRVISH_IMAGE ; fi
post-client: ; if [ -f $DIRVISH_SRC/dirvish.post-client ] ; then $DIRVISH_SRC/dirvish.post-client $DIRVISH_SRC $DIRVISH_IMAGE ; fi


Nos movemos al “bank” (/opt/backups), y allí crearemos un directorio por cada actividad de backup definida en el Runall:
/opt/backups/mysqlKhepera4/ -> será el “vault”

Dento de este creamos el directorio dirvish, y el fichero de configuración:
/opt/backups/mysqlKhepera4/dirvish/default.conf
  client: kevinporta.hi.inet
  rsh: ssh -p 7746
  tree: /opt/backups/dirvish
  index: 1
  image-default: %Y%m%d-%H:%M:%S

Para iniciar este nuevo “vault” (y hacer el backup base)
# dirvish --vault mysqlKhepera4 --init
Y para probar como funcionará en cada vuelta del cron (/etc/cron.d/dirvish)
# dirvish-runall
Es necesario que dirvish se pueda conectar por ssh sin tener que usar la password. Esto lo haremos instalando la clave de la máquina servidor en el cliente con ssh-copy-id


# Usando pre- and post- Scripts
http://wiki.dirvish.org/ClientScriptsOnServer
Debemos poner lo siguiente en el master.conf:
  pre-server: ; for prefix in pre post ; do test -f $DIRVISH_DEST/../../dirvish/$prefix-client && scp $DIRVISH_DEST/../../dirvish/$prefix-client $DIRVISH_CLIENT:$DIRVISH_SRC/dirvish.$prefix-client ; done ; exit 0
  pre-client: ; if [ -f $DIRVISH_SRC/dirvish.pre-client ] ; then $DIRVISH_SRC/dirvish.pre-client $DIRVISH_SRC $DIRVISH_IMAGE ; fi
  post-client: ; if [ -f $DIRVISH_SRC/dirvish.post-client ] ; then $DIRVISH_SRC/dirvish.post-client $DIRVISH_SRC $DIRVISH_IMAGE ; fi
  post-server: ; for prefix in pre post ; do test -f $DIRVISH_DEST/../../dirvish/$prefix-client && ssh $DIRVISH_CLIENT rm -f $DIRVISH_SRC/dirvish.$prefix-client ; done ; exit 0

  exclude:
        dirvish.pre-client
        dirvish.post-client

Pondremos los script pre-client y post-client en el directorio que se está haciendo backup (máquina cliente). El exclude se encargará de no hacer backup de estos ficheros.
Los scripts deben ser ejecutables (chmod u+x)


## MySQL ## 
La idea es ejecutar el pre-script para generar el dump, y sobre ese hacer el backup.
El backup verá un archivo de texto que contiene toda la base de datos, que se va modificando con el tiempo.
En cada backup, solo será necesario que se transmita las diferencias del fichero.
Lo mejor es hacer un fichero por cada base de datos.
http://wiki.dirvish.org/MysqlBackup

pre-client:
DESTDIR=$1
for db in $(/usr/bin/mysql -ubackupuser -pcxXWN5VPvT9f3mgTH4ps -e 'show databases' -s | egrep -v '(^Database$|lost+found|information_schema)') ; \
      do rm -f $DESTDIR/$db.sql ; \
      /usr/bin/mysqldump -ubackupuser -pcxXWN5VPvT9f3mgTH4ps --opt --flush-logs $db > $DESTDIR/$db.sql ; \
done
rm -f $DESTDIR/information_schema.sql
/usr/bin/mysqldump -ubackupuser -pcxXWN5VPvT9f3mgTH4ps --opt --single-transaction --flush-logs information_schema > $DESTDIR/information_schema.sql

Las dos últimas líneas son por los problemas con el backup de information_schema:
http://www.linuxadmin.org/blog/mysql-information_schema-error-when-using-mysqldump-utility/
