http://www.tecmint.com/how-to-monitor-user-activity-with-psacct-or-acct-tools/
https://linux.die.net/man/5/acct
https://linux.die.net/man/2/acct

Herramientas para controlar el uso de un servidor por parte de usuarios y procesos.
Cuando se activa se llama a la syscall acct para que el kernel empieze a almacenar esta informacion de accounting en el fichero que le pasamos como paramétro a la syscall.

IMPORTANTE: el accounting se realiza cuando los procesos terminan. Nunca veremos las metricas de procesos que no han terminado.

# Instalacion
yum install psacct
apt-get install accto

Arch, esta en los archived de aur: https://github.com/aur-archive/acct


# Activar
/etc/init.d/psacct start

Este script llama a accton (https://linux.die.net/man/8/accton)
accton /var/account/pacct
  activar

accton
  desactivar (llamar sin params)



# Información que se almacena
https://github.com/torvalds/linux/blob/master/include/uapi/linux/acct.h#L73
tty, exitcode, uid, gid, pid, ppid, creation time, command name
elapsed time, user time, system time, avg memory used, chars transferred, blocks read of written, minor/major pagefaults, swaps
super user, dumped core, killed by a signal (https://github.com/torvalds/linux/blob/master/include/uapi/linux/acct.h#L104)



# Comandos


## last
Ultimos logins (lastb ultimos logins fallidos)
Usa el fichero /var/log/wtmp


## ac
Estadisticas sobre el tiempo de conex de los usuarios
Usa el fichero /var/log/wtmp
https://linux.die.net/man/1/ac

ac
  tiempo total de conexión en horas

ac -d
  por dias

ac -p
  por usuarios

ac usuario

ac -d usuario
  usuario por dia


## sa
Información sobre los últimos comandos ejecutados
Usa el fichero /var/account/pacct
https://linux.die.net/man/8/sa

commands executed
primera columna, número de veces que se ha ejecutado el comando
XXre tiempo real usado, en minutos de reloj
XXcp suma de tiempo de sys + user en minutos
XXXXk cpu-time averaged core usage
comando

sa -u
  especifica por usuario

sa -m
  por cada usuario, global de procesos, consumo de cpu, tiempo real y cpu-time

sa -c
  porcentaje, pero no se que ordena


Probando algunos sleeps, 'sa' no parece funcionar exactamente como lo esperado:
python -c "import time; time.sleep(5)"
Eso dos veces devuelve:
2       0.17re       0.00cp    29280k   python


## lastcomm
información sobre los últimos comandos ejecutados
Usa el fichero /var/account/pacct
https://linux.die.net/man/1/lastcomm

lastcomm
  Ultimos procesos ejecutados y por quien

lastcomm usuario
  solo de un usuario

lastcomm ejecutable
  que hayan lanzado este ejecutable



# Gestion del tamaño del fichero de account
Con sysctl podemos controlar cuando el accounting debe pararse (cuando quede menos de un % libre en el disco)
Cuando debe reactivarse (cuando se sobrepase otro porcentaje) y cada cuando debe realizarse este chequeo.

# sysctl -a | grep -i acct
kernel.acct = 4 2       30
# cat /proc/sys/kernel/acct
4       2       30

Si queda menos de un 2% libre -> parar accounting
Si tenemos más de un 4% libre -> reactivar accounting
Chequear esto cada 30" (creo que son segundos)



# Internals
La estructura del fichero binario esta definida en https://github.com/torvalds/linux/blob/master/include/uapi/linux/acct.h#L73
La implementación: https://github.com/torvalds/linux/blob/master/kernel/acct.c

Podemos ver el contenido con od:

od -ax /var/account/pacct

Cada struct ocupa 64 bytes y empieza por 03xx (es little endian, por lo que el 03 es el segundo char del struct, ac_version)
La version es 3 desde glib2.6

El primer byte son las flags:
#define AFORK   0x01  /* ... executed fork, but did not exec */
#define ASU   0x02  /* ... used super-user privileges */
#define ACOMPAT   0x04  /* ... used compatibility mode (VAX only not used) */
#define ACORE   0x08  /* ... dumped core */
#define AXSIG   0x10  /* ... was killed by a signal */
