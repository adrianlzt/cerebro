https://github.com/torvalds/linux/blob/5924bbecd0267d87c24110cbe2041b5075173a25/Documentation/accounting/taskstats.txt

Ejemplo en c:
https://raw.githubusercontent.com/torvalds/linux/5924bbecd0267d87c24110cbe2041b5075173a25/Documentation/accounting/getdelays.c
gcc -I/usr/src/linux/include getdelays.c -o getdelays

Implemetacion en python para obtener datos
https://github.com/facebook/gnlpy

git clone git@github.com:facebook/gnlpy.git
cd gnlpy
python setup.py install

sudo python taskstats_dump.py 28891

Con python3.6 no me funciona bien
Con python2.7 si funciona correctamente.



Atop tambien usa esta forma de conexión con el kernel:
netlink.c:netlink_open(void)

Escucha en todos los procesadores


# Netlink
Para obtener datos debemos abrir un socket netlink de la familia NETLINK_GENERIC


## Escuchar estadísticas de procesos terminados

To obtain statistics for tasks which are exiting, the userspace listener sends a register command and specifies a cpumask. Whenever a task exits on one of the cpus in the cpumask, its per-pid statistics are sent to the registered listener.

El mensaje tendrá el formato:
   +----------+- - -+-------------+-------------------+
   | nlmsghdr | Pad |  genlmsghdr | taskstats payload |
   +----------+- - -+-------------+-------------------+

taskstats payload será TASKSTATS_CMD_ATTR_REGISTER
and contain a cpumask in the attribute payload (eg.: 1-4,6)


El kernel nos puede devolver tres tipos de mensajes como respuesta a un comando:
TASKSTATS_TYPE_AGGR_PID/TGID
TASKSTATS_TYPE_PID/TGID
TASKSTATS_TYPE_STATS (creo que esta respuesta llega cuando se termina una task/proceso)


Cuando alguna task termina el payload enviado será:
a) TASKSTATS_TYPE_AGGR_PID: indicates next two attributes will be pid+stats
b) TASKSTATS_TYPE_PID: contains exiting task's pid
c) TASKSTATS_TYPE_STATS: contains the exiting task's per-pid stats
d) TASKSTATS_TYPE_AGGR_TGID: indicates next two attributes will be tgid+stats
e) TASKSTATS_TYPE_TGID: contains tgid of process to which task belongs
f) TASKSTATS_TYPE_STATS: contains the per-tgid stats for exiting task's process



