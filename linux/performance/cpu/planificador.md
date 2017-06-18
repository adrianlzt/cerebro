CPU SCHEDULERS

https://www.kernel.org/doc/Documentation/scheduler/sched-design-CFS.txt
CFS: scheduler de CPU oficial
El Planificador Completamente Justo (Completely Fair Scheduler - CFS) es un algoritmo planificador desarrollado con la meta de maximizar el uso de la CPU con las diferentes tareas que se lanzan en un sistema Linux basándose en el Fair Queuing.


# Scheduling class:
OTHER: scheduling por defecto
FIFO: realtime sin timeslice (hasta que termina o la expulsa otra tarea FIFO/RR de mayor prioridad), solo root.
  más prioridad que -20 nice
ROUND ROBIN: realtime con timeslice (hasta que vence timeslice o la expulsa otra tarea FIFO/RR de mayor prioridad), solo root.
  más prioridad que -20 nice
BATCH: similar a OTHER pero con timeslice más alto para aprovechar cache (mejora throughput a costa de latencia)
DEADLINE (3.14+): hard realtime (queremos garantizar ejecución en un plazo estricto)

Clases que solo están en el kernel de Con Kolivas
    ISO (-ck): similar a Rountd Robin para usuarios (no root)
    IDLE (-ck): solo cuando CPU idle.
     nice +20 tiene más prioridad que idle


# BFS: brain fuck scheduler
Parece que es un mejor planificador, pero no lo meten en el mainline porque no escala con más de 16 CPUs
Siempre sacan parches para cada nueva versión de kernel.
http://www.users.on.net/~ckolivas/kernel/
http://ck.kolivas.org/patches/bfs/bfs-faq.txt
http://ck-hack.blogspot.com.es/

Benchmark Oct-2012 http://repo-ck.com/bench/cpu_schedulers_compared.pdf


La task "swapper" es la que se ejecuta cuando no hay nada que ejecutar:

The idle task (a.k.a. swapper task) is chosen to run when no more runnable tasks in the run queue at the point of task scheduling. It has the lowest possible priority, so that's why it's running if no other task is runnable.

Programatic reason: This simplifies process scheduling a lot, because you don't have to care about the special case: "What happens if no task is runnable?", because there always is at least one task runnable, the idle task. Also you can count the amount of cpu time used per task. Without the idle task, which task gets the cpu-time accounted no one needs?

Historical reason: Before we had cpus which are able to step-down or go into power saving modes, it HAD to run on full speed at any time. It ran a series of NOP-instructions, if no tasks were runnable. Today the scheduling of the idle task usually steps down the cpu by using HLT-instructions (halt), so power is saved. So there is a functionality somehow in the idle task in our days.
