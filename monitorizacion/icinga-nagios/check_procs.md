http://nagios-plugins.org/doc/man/check_procs.html

Chequear cuanto tiempo lleva un proceso encendido:
Avisar si el proceso top lleva menos de 1 minuto corriendo:
./check_procs -m ELAPSED -C top -c 60:

El numero son segundos!



El parámetro -C mira /proc/PID/comm, que tiene 16 caracteres como máximo.


Cuidado, porque algunos procesos hacen fork y engañan al check, por ejemplo el mismo icinga:
icinga   32063  0.6  0.2 868976  7852 ?        Ssl  11:25   1:45 /usr/bin/icinga -d -u /srv/nagios/icinga/etc/icinga.cfg
icinga   14781  0.0  0.1 868976  5816 ?        S    16:02   0:00  \_ /usr/bin/icinga -d -u /srv/nagios/icinga/etc/icinga.cfg
icinga   14782  0.0  0.0      0     0 ?        Z    16:02   0:00      \_ [sh] <defunct>
