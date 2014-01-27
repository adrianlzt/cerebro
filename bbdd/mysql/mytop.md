http://jeremy.zawodny.com/mysql/mytop/
A top clone for MySQL
mytop will connect to a MySQL server and periodically run the SHOW PROCESSLIST and SHOW STATUS commands and attempt to summarize the information from them in a useful format.
Man page: perldoc mytop

Shortcuts:
c : Show "command counters" based on the Com_* values in SHOW GLOBAL STATUS.  This is a new feature.  Feedback welcome. 
d : filtrar por DB. En blanco para mostrar todas. Por defecto conectaré a una en particular.
f : le paso un thread id y me muestra la query completa. Si pulso luego 'e' me da el resultado de la query
i : quito los threads idle (sleeping)
k : matar un thread
m : muestra únicamente un número con las queries/sec
p : pausa
r : reset los contadores
t : volver a la vista de threads


Optional Hi-Res Timing
  If you want mytop to provide more accurate real-time queries-per-second statistics, install the Time::HiRes module from CPAN.  mytop will automatically notice
  that you have it and use it rather than the standard timing mechanism.


Configurar los parámetros en ~/.mytop
user=root
pass=password
host=localhost
db=icinga
delay=5
port=3306
socket=
batchmode=0
header=1
color=1
idle=1



Explicación campos:

MySQL on localhost (5.5.31)                            up 65+19:33:19 [18:43:12]
 Queries: 247.6M  qps:   46 Slow:   10.6k         Se/In/Up/De(%):    45/02/61/00 
             qps now:   13 Slow qps: 0.0  Threads:   21 (   1/   0) 58/00/06/00 
 Key Efficiency: 99.7%  Bps in/out: 342.8k/890.2k   Now in/out:  3.4k/ 3.8M

Hostname (version mysql)                   uptime days+hours:minutes:seconds [hora actual]
Queries: número de queries procesadas en total
qps: queries/seg procesadas desde el arranque
Slow: número de slow queries
Se/In/Up/De(%): porcentaje de Select, Insert, Update, and Delete queries

La tercera línea es la de tiempo real
qps now: queries/sec que se están procesando ahora
Slow qps: slow queries que se están produciendo ahora
Threads: Total (Activas / ?)
Se/In/Up/De(%): porcentaje de Select, Insert, Update, and Delete queries que se están produciendo ahora

Key Efficiency: ow often keys are read from the buffer rather than disk
Bps in/out: bytes enviados/recibidos en el último ciclo
Now in/out: bytes enviados/recibidos en total


       The first line identifies the hostname of the server (localhost) and the version of MySQL it is running. The right had side shows the uptime of the MySQL
       server process in days+hours:minutes:seconds format (much like FreeBSD’s top) as well as the current time.

       The second line displays the total number of queries the server has processed, the average number of queries per second, the number of slow queries, and the
       percentage of Select, Insert, Update, and Delete queries.

       The third real-time values. First is the number of queries per second, then the number of slow queries, followed by query precentages (like on the previous
       line).

       And the fourth line displays key buffer efficiency (how often keys are read from the buffer rather than disk) and the number of bytes that MySQL has sent and
       received, both over all and in the last cycle.

Luego se nos muestra los threads que se encuentran ejecutándose. Primero los que menos idle time tienen.
