http://man7.org/linux/man-pages/man5/proc.5.html
https://www.kernel.org/doc/Documentation/filesystems/proc.txt


## /proc/loadavg

http://www.centos.org/docs/5/html/5.2/Deployment_Guide/s2-proc-loadavg.html
This file provides a look at the load average in regard to both the CPU and IO over time, as well as additional data used by uptime and other commands. A sample /proc/loadavg file looks similar to the following:

0.20 0.18 0.12 1/80 11206
The first three fields in this file are load average figures giving the number of jobs in the run queue (state R) or waiting for disk I/O (state D) averaged over 1, 5, and 15 minutes.
The fourth column shows the number of currently running processes and the total number of processes. The last column displays the last process ID used.

In addition, load average also refers to the number of processes ready to run (i.e. in the run queue, waiting for a CPU share.


cat /proc/loadavg
  [1]   carga media ultimo minuto
  [2]   carga media 5 ultimos minutos
  [3]   carga media 15 ultimos minutos
  [4]   nº procesos activos / nº total de procesos
  [5]   ultimo nº de PID usado


http://stackoverflow.com/questions/21617500/understanding-load-average-vs-cpu-usage
http://juliano.info/en/Blog%3aMemory_Leak/Understanding_the_Linux_load_average
http://blog.scoutapp.com/articles/2009/07/31/understanding-load-averages
http://www.linuxjournal.com/article/9001
http://www.howtogeek.com/194642/understanding-the-load-average-on-linux-and-other-unix-like-systems/


Load: Numero de procesos (o accesos a disco) en cada momento
Load average: media de cuantos procesos (o accesos a disco) en media durante el último minuto (también se muestran para 5' y 15')

Para un solo CPU:
load avg=1 significa que la cpu estuvo al 100%
load avg=2, 200%, un proceso esperando todo el rato

Si tenemos varios procesadores, por ejemplo 4:
load avg=4, 4 procesos trabajando, como tenemos 4cpus, 100% de carga
