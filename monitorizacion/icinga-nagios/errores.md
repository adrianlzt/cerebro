Al chequear la configuración (icinga -v /etc/icinga/icinga.cfg) me dice
Error processing object config files!
Sin dar más información.

El error era que un contacto tenía definido el contactgroup vacío.



[1408610590] Error: Could not load module '/usr/lib64/mod_gearman/mod_gearman.o' -> /tmp/icinganebmodrGc3oR: failed to map segment from shared object: Operation not permitted
/tmp montado no noexec



Procesos de icinga duplicados
icinga   27989  0.3  0.1 803604  4836 ?        Ssl  14:28   0:00 /usr/bin/icinga -d -u /srv/nagios/icinga/etc/icinga.cfg
icinga   30338  0.0  0.0 803604  3732 ?        S    14:29   0:00  \_ /usr/bin/icinga -d -u /srv/nagios/icinga/etc/icinga.cfg
icinga   30339  0.0  0.0      0     0 ?        Z    14:29   0:00      \_ [sh] <defunct>

Parece que el problema es que el check para enviar correos se queda pillado y al final lo mata tras 30"

El error era que postfix no tenia un FQDN.
La solución fue cambiar /etc/hosts de
192.168.3.2 nombre
a
192.168.3.2 nombre.openstacklocal

Parece que esto tambien provoca estas trazas:
icinga: Warning: Breaking out of check result reaper: max reaper time (30) exceeded. Reaped 172 results, but more checkresults to process. Perhaps check core performance tuning tips?


Creo que este error también se producia por un globaleventhandler que no era lo suficientemente rápido y colapsaba Icinga.



# Icinga se muere sin dar informacion
Si usamos mod_gearman, mirar que el german server está levantado.
Si no lo está, icinga muere.



# Too many open files
Could not open check result queue directory '/dev/shm' for reading.

[2016-09-08T20:29:20.000+02:00] Error: Unable to open file '/dev/shm/icinga.tmp1QFtqV' for reading: Too many open files
[2016-09-08T20:29:20.000+02:00] Error: Unable to rename file '/dev/shm/icinga.tmp1QFtqV' to '/srv/nagios/icinga/spool/retention.dat': Too many open files
[2016-09-08T20:29:20.000+02:00] Error: Unable to update retention file '/srv/nagios/icinga/spool/retention.dat': Too many open files

Estos mensajes los hemos visto cuando Icinga estaba al limite de su max open files.

En este caso se debía a un bug de icinga+mod_gearman+libuuid, mirar error_mod_gearman_dev_urandom.md



# Icinga se cae al intentar ejecutar un check
Moria sin más, sin decir nada en los logs de icinga.
Parece que es porque el mod_gearman no podia conectar con el server de gearman (que estaba parado).

