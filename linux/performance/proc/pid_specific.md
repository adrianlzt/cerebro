http://man7.org/linux/man-pages/man5/proc.5.html
https://www.kernel.org/doc/Documentation/filesystems/proc.txt

# /proc/$(pidof proceso)/fd
File descriptors de los ficheros
Podemos ver a donde apuntan on ls -la
Si un proceso a abierto un FD, pero hemos borrado el fichero, podemos recuperarlo haciendo cp ../fd/N fichero
Si borramos un fichero creado por un proceso, hasta que el proceso no libere el fd no se libera el espacio ocupado en disco

# /proc/$(pidof proceso)/fdinfo
Un fichero por cada fd abierto
Depende del tipo de fd nos da una info u otra. Mirar en http://man7.org/linux/man-pages/man5/proc.5.html


# /proc/$(pidof proceso)/stat

# /proc/$(pidof proceso)/status
https://www.kernel.org/doc/Documentation/filesystems/proc.txt
Viene explicado cada campo en su propia linea

memoria, usuarios, signales, cpus, context switches...


# /proc/$(pidof proceso)/io
Estadísticas por proceso

%rchar  bytes leidos de disco (fisico o cache)
%wchar  bytes escritos a disco (fisico o cache)
%syscr  num de syscalls read
%syscw  num de syscalls write
%read_bytes  bytes leidos de disco físico
%write_bytes  bytes escritos a disco físico (por volcado de dirty-pages)
%cancelled_write_bytes  bytes no escritos a disco físico (por truncado de dirty-pages)


# proc/$(pidof proceso)/oom_*
mirar memoria/tunables.md oom

# /proc/PID/maps
  mapas de memoria y librerias usadas

# /proc/PID/mount*
  info de los puntos de montaje

# /proc/PID/syscall
  puede poner "running"
  O algo tipo:
  23 0x0 0x0 0x0 0x0 0x7fff6142fa90 0x3e8 0x7fff6142fa68 0x7f7d5ab873b3
  En este caso querra decir que está esperando en esa syscall (mirar linux/syscall.md) con esos parametros

# proc/$(pidof proceso)/schedstat
https://www.kernel.org/doc/Documentation/scheduler/sched-stats.txt
http://eaglet.rain.com/rick/linux/schedstat/v15/format-15.html
http://eaglet.rain.com/rick/linux/schedstat/v15/latency.c

 1) time spent on the cpu
 2) time spent waiting on a runqueue
 3) # of timeslices run on this cpu
No tengo seguro que sigan siendo estos valores

# proc/$(pidof proceso)/sched
scheduling data
https://lwn.net/Articles/242900/
se pueden resetear estos contadores con: echo 0 > /proc/PID/sched
'se' stands for 'scheduling entity' - a task here

se.exec_start
     The runqueue's clock_task value at the most recent update of this task's statistics

se.vruntime
     "Virtual runtime" determines when a task will next run. The task with the lowest vruntime value runs next. The value is constantly tweaked by the scheduler, and increases while the task is running. Some info is in Documentation/sched-design-CFS.txt

se.sum_exec_runtime
     Total time spent executing

se.nr_migrations

nr_switches
     Number of contexts switches (voluntarios + involuntarios)

nr_voluntary_switches
     Voluntary switches, I.e the thread blocked and hence another thread is picked up.

nr_involuntary_switches
     involuntary – the scheduler kicked the thread out as there is another hungry thread is ready to run.

se.load.weight
     load.weight is based on the nice value plays a role in calculating the time slice (note CFS supports variable time slice, a process with nice value of –1 gets ~ 5% more time-slice than a process with nice 0)

policy

prio
     prio 0-99 are real-time priorities, 100-139 are CFS scheduling priority. 105 indicates you are running with –15

clock-delta

mm->numa_scan_seq

numa_migrations

numa_faults_memory

numa_faults_memory

se.sleep_max
     that's the maximum time the task spent sleeping voluntarily

se.exec_max
     Longest execution slice the task has had

se.wait_max
     Longest time the task has waited to start while runnable

se.nr_wakeups
     Number of times the task has been activated

se.nr_wakeups_remote
     Number of times the task has been woken by a scheduler on another CPU

avg_per_cpu
     sum_exec_runtime / nr_migrations

clock-delta
     update the runqueue's clock twice in succession and print the difference

se.sleep_start from /proc/$pid/sched should provide the time from when the process started waiting on this syscall.
To clarify, ->sleep_start reports the start of interruptible sleep, and there is ->block_start for uninterruptible case.

avg_wakeup gives the average time the thread spent blocking.

se.wait_runtime
     scheduler-internal metric that shows how much out-of-balance this task's execution history is compared to what execution time it could get on a "perfect, ideal multi-tasking CPU". So if wait_runtime gets negative that means it has spent more time on the CPU than it should have. If wait_runtime gets positive that means it has spent less time than it "should have". CFS sorts tasks in an rbtree with this value as a key and uses this value to choose the next task to run. (with lots of additional details - but this is the raw scheme.) It will pick the task with the largest wait_runtime value. (i.e. the task that is most in need of CPU time.)



The "sum_exec_runtime/nr_switches" number is also interesting: it shows the average time ('scheduling atom') a task has spent executing on the CPU between two context-switches. The lower this value, the more context-switching-happy a task is.
