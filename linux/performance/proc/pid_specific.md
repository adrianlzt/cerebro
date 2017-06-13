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

# proc/$(pidof proceso)/sched
scheduling data
https://lwn.net/Articles/242900/
se.exec_start
     The runqueue's clock_task value at the most recent update of this task's statistics

se.vruntime
     "Virtual runtime" determines when a task will next run. The task with the lowest vruntime value runs next. The value is constantly tweaked by the scheduler, and increases while the task is running. Some info is in Documentation/sched-design-CFS.txt

se.sum_exec_runtime
     Total time spent executing

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

