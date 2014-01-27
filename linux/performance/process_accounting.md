Mantener registro de los procesos que se han ejecutado en el sistema, quien los he ejecutado, etc.
Mirar systemtap para cosas más avanzadas.

http://www.cyberciti.biz/tips/howto-log-user-activity-using-process-accounting.html

Suse:
zypper in acct
/etc/init.d/acct status

Ubuntu:
apt-get install acct


## Comandos ##

Tiempo total de conexion
ac

Tiempo total de conexión por día:
ac -d

Tiempo por usuario
ac -p

Ultimos comandos ejecutados (por usuario tal)
lastcomm (usuario)

Sintaxis de la salida del lastcomm
comando		flags	user	terminal	runtime

Flags:
S -- command executed by super-user
F -- command executed after a fork but without a following exec
D -- command terminated with the generation of a core file
X -- command was terminated with the signal SIGTERM



Resumen de los comandos ejecutados:
sa
ejecuciones	real_time	system_time+user_time(min)	cpu_time(1k unit)	command

sa -u (por usuario)
usuario		cpu	memoria		comando

sa -m
usuario		ejecuciones	real_time	user_time+cpu_time	cpu_time


# PACCT #
/etc/init.d/psacct start
or 
/etc/init.d/acct start
dump-acct pacct

The output is printed in nice columns and includes the following, from left to right: process name, user time, system time, effective time, UID, GID, memory, and date
