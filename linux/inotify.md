Vigila ficheros o directorios.
Más simple que auditd, pero nos da menos información (solo fichero, tiempo y acción)

https://github.com/rvoicilas/inotify-tools/wiki
http://linux.die.net/man/1/inotifywait
http://linux.die.net/man/1/inotifywatch
http://en.wikipedia.org/wiki/Inotify

Introducción para usarlo como librería C
http://www.linuxjournal.com/article/8478?page=0,3

Artículo completo. Como librería C y también con las inotify-tools
http://www.ibm.com/developerworks/linux/library/l-ubuntu-inotify/index.html?ca=drs-


Vigilar un directorio y sus subdirectorios:
inotifywait -r -m /dir
  -r: recursivo
  -m: muestra eventos sin cerrarse (sin está opción, se sale tras el primer evento)


-d: debug
-o <file>: escribe a un fichero en vez de stdout
--fromfile <file>: pasamos los ficheros que queremos vigilar
-t <seconds>: tras ese tiempo la aplicación termina, aunque no haya llegado ningún evento
-e <event>: escucha solo ciertos eventos


inotifywait -r -m --format "%T %w%f %e" --timefmt "%s" /tmp/pruebas
Nos da líneas tipo:
1394826446 /tmp/pruebas/otrodir/nuevo CLOSE_WRITE,CLOSE



inotifywatch nos sirve para generar estadísticas de datos de inotify.
Se ejecuta durante un tiempo y luego nos muestra datos sobre los ficheros.



Software relacionado útil:

pyinotify – high-level Python interface to inotify, makes it very easy to write Python based scripts for watching files.

IWatch – simple Perl script using inotify to watch files and directories, sending notifications of file changes by e-mail.

incron – inotify cron-like system; run commands when certain filesystem events occur.

logsend – daemon for e-mail notification of log file changes. Its inotify backend uses inotify-tools.

mswatch – keeps Unix mailboxes synchronized using inotify (or dnotify on older kernels).

inotail – a version of the tail utility which uses inotify to avoid polling for changes.

notitools – some useful inotify tools.




Ejemplos de scripts con inotify de https://github.com/rvoicilas/inotify-tools/wiki


Script para hacer backup de los ficheros en /tmp/test en el momento que se modifiquen

#!/bin/sh
# get the current path
CURPATH=`pwd`

inotifywait -mr --timefmt '%d/%m/%y %H:%M' --format '%T %w %f' \
-e close_write /tmp/test | while read date time dir file; do

       FILECHANGE=${dir}${file}
       # convert absolute path to relative
       FILECHANGEREL=`echo "$FILECHANGE" | sed 's_'$CURPATH'/__'`

       rsync --progress --relative -vrae 'ssh -p 22'  $FILECHANGEREL usernam@example.com:/backup/root/dir && \
       echo "At ${time} on ${date}, file $FILECHANGE was backed up via rsync"
done
