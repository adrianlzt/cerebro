# .---------------- minute (0 - 59)
# |  .------------- hour (0 - 23)
# |  |  .---------- day of month (1 - 31)
# |  |  |  .------- month (1 - 12) OR jan,feb,mar,apr ...
# |  |  |  |  .---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat
# |  |  |  |  |
# *  *  *  *  * user-name command to be executed

Si se mete en el "crontabe -e" de cada usuario, no hace falta poner el 'user-name'


m 0-5 ocurre todos los minutos 0,1,2,3,4,5
Se pueden juntar varias expresiones: 1,2,10-15
* significa first-last (para horas ocurriría 0,1,2,3...,23
h 10-23/2 entre las 10 y las 23 cada dos horas
m */10 cada diez minutos


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
