http://nagios-plugins.org/doc/man/check_procs.html

Chequear cuanto tiempo lleva un proceso encendido:
Avisar si el proceso top lleva menos de 1 minuto corriendo:
./check_procs -m ELAPSED -C top -c 60:

El numero son segundos!


Con -vv sacaremos la salida de ps que está usando el plugin.
Con -vvv saca toda la tabla de procesos.


El parámetro -C mira /proc/PID/comm, que tiene 16 caracteres como máximo.


Cuidado, porque algunos procesos hacen fork y engañan al check, por ejemplo el mismo icinga:
icinga   32063  0.6  0.2 868976  7852 ?        Ssl  11:25   1:45 /usr/bin/icinga -d -u /srv/nagios/icinga/etc/icinga.cfg
icinga   14781  0.0  0.1 868976  5816 ?        S    16:02   0:00  \_ /usr/bin/icinga -d -u /srv/nagios/icinga/etc/icinga.cfg
icinga   14782  0.0  0.0      0     0 ?        Z    16:02   0:00      \_ [sh] <defunct>


# Zombies
Un check util para vigilar los procesos zombies es:
/usr/lib64/nagios/plugins/check_procs -v -w 900 -c 3600 -s Z -m ELAPSED

Con esto decimos que nos avise con warning si hay uno o mas procesos zombies que llevan más de 15' en este estado
Y critical si lleva/n más de 1h.
Con -v sacamos las primeras letras de los procesos involucrados


# CPU
/usr/lib64/nagios/plugins/check_procs -v -w 10 -c 20 --metric=CPU
avisa si hay procesos consumiendo más del 10%/20% de CPU.
Lo mide para un momento determinado.
10% del total de las CPUs o de una sola?
