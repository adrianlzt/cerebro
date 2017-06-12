http://www.cyberciti.biz/faq/how-do-i-add-jobs-to-cron-under-linux-or-unix-oses/

Para systemd tenemos un susituto:
Mirar linux/systemd/timer_example.systemd

anacron: ejecutar comando de forma periódica. Asume que la máquina puede no estar arrancada las 24h, por lo que almacena la última ejecucción y así sabe si debe ejecutar la acción.
Los parámetros son días, en vez de minutos/horas como en cron.

/etc/anacrontab
Donde se define cuando se va a ejecutar el daily, weekly, monthly
Suele llevar un random delay para que no se ejecute siempre exactamente a la misma hora

Fromato cron:
# .---------------- minute (0 - 59)
# |  .------------- hour (0 - 23)
# |  |  .---------- day of month (1 - 31)
# |  |  |  .------- month (1 - 12) OR jan,feb,mar,apr ...
# |  |  |  |  .---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat
# |  |  |  |  |
# *  *  *  *  * user-name command to be executed

Si se mete en el "crontabe -e" de cada usuario, no hace falta poner el 'user-name'

Se puede instalar el cron de cada user a partir de un fichero con:
crontab fichero

Este fichero lo podemos tener giteado por ejemplo.


m 0-5 ocurre todos los minutos 0,1,2,3,4,5
Se pueden juntar varias expresiones: 1,2,10-15
* significa first-last (para horas ocurriría 0,1,2,3...,23
h 10-23/2 entre las 10 y las 23 cada dos horas
m */10 cada diez minutos
*/X, se ejecuta cuando el resto de la división sea 0


string         meaning
------         -------
@reboot        Run once, at startup.
@yearly        Run once a year, "0 0 1 1 *".
@annually      (same as @yearly)
@monthly       Run once a month, "0 0 1 * *".
@weekly        Run once a week, "0 0 * * 0".
@daily         Run once a day, "0 0 * * *".
@midnight      (same as @daily)
@hourly        Run once an hour, "0 * * * *".

Suelen exister directorios tipo
/etc/cron.hourly
/etc/cron.daily
/etc/cron.weekly
/etc/cron.monthly

Donde podemos meter directamente el script a ejecutar y lo hará en esos tiempos.

El resto de ficheros los meteremos en /etc/cron.d
Acordarse de reiniciar el proceso cron tras meter ficheros en este directorio.

También podemos meterlos en el cron de cada usuario con: crontab -e
Y para listarlo: crontab -l 

root puede ver y editar los cron de la gente: cron -u USER -l

En estos dos últimos casos es importante pasar la SHELL y el PATH de los comandos que se ejecutarán:
SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin


If the /etc/cron.allow file exists, then you must be listed (one user per line) therein in order to be allowed to use this command.   If  the  /etc/cron.allow file does not exist but the /etc/cron.deny file does exist, then you must not be listed in the /etc/cron.deny file in order to use this command.


Background.
Las tareas se ejecutan en background por defecto, por lo que no hace falta poner & al final del comando:
https://help.ubuntu.com/community/CronHowto
  "These commands (and their run times) are then controlled by the cron daemon, which executes them in the system background"

# Gestion del stdout/stderr
unix-tools/chronic.md

Con esta utilidad solo tendremos stdout/stderr si el comando tiene un RC!=0

# Timeout
http://mywiki.wooledge.org/BashFAQ/068

0 * * * *  you  timeout 10s cron-task

# Evitar que el mismo cron corra antes de que termine el ultimo
http://mywiki.wooledge.org/BashFAQ/045

0 * * * *  you  flock -nx /var/lock/cron-task cron-task


Solo saca mensaje si el comando falla.
Flock lo ponemos para evitar la tarea se ejecute si ya se está ejecutando (y sale con codigo 0 si esto ocurre)
0 * * * *  you  chronic flock -nxE 0 /var/lock/cron-task cron-task


Ejemplo completo
/usr/local/bin/cronic /usr/bin/flock -nxE 0 /srv/nagios/dcip_jobs.lck pgrep -P 1 icinga && /usr/bin/curl -f http://example.com

cronic (version shell de chronic, hacen lo mismo) evita que salta stdout/stderr cuando el comando funciona correctamente (RC=0).
flock -x hace un lock exclusivo usando el fichero /srv/nagios/dcip_jobs.lck. Evita que otro nodo (/srv/nagios es un NFS) comienze el cron si existe ese fichero
  -n hace que no se espere a que se libere el flock. -E 0, es que cuando haya lock el return code sea 0
pgrep, solo ejecuta el curl si esta corriendo icinga con parent pid = 1 (para evitar que matchee otros procesos icinga que no sean la monitorizacion, comprobación de configuración por ejemplo)
curl -f hace que curl retorne un código de error (rc=22) en caso de que el server nos devuelva un error (5xx, 4xx). Aunque la doc dice que no es completamente fiable



# Problemas
Si el fichero de cron de un usuario tiene permisos de escritura no se ejecutará.
Si lo reeditamos con "crontab -e" cogerá los permisos adecuados.


The crontab command has one of the worst UI problems:
1. "crontab -e" lets you edit your crontab file, and "crontab -r" deletes it (without asking). The two keys are next to each other.
2. "crontab" (no arg) reads the contents of the crontab file from stdin and replaces it. When you accidentally hit Ctrl-D after it, your crontab is replaced with an empty file.
reply



# Buscando crons
/etc/anacrontab
/etc/crontab
/etc/cron.d
/etc/cron.hourly
/etc/cron.daily
/etc/cron.weekly
/etc/cron.monthly
/var/spool/cron

Systemd?
systemctl list-timers
