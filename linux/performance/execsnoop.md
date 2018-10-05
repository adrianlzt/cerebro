http://www.brendangregg.com/blog/2014-07-28/execsnoop-for-linux.html
https://github.com/brendangregg/perf-tools/blob/master/execsnoop
wget https://raw.githubusercontent.com/brendangregg/perf-tools/master/execsnoop

Tras arrancarlo, nos va mostrando trazas con los procesos que se están ejecutando.
Útil cuando queremos encontrar procesos de corta vida que puedan estar consumiendo cpu, por ejemplo.

# REQUIREMENTS: FTRACE and KPROBE CONFIG, sched:sched_process_fork tracepoint,
# and either the stub_execve() or do_execve() kernel function. You may already
# have these on recent kernels. And awk.

Funciona en RHEL7

Nos muestra el PID, parent pid y args

Obtener los 5 parent pids que más procesos han arrancados, con el número de procesos que han iniciado y sus datos (pid, user, args).
CUIDADO! Si un proceso arranca un subproceso short lived y este es el que arranca muchos procesos, con este onliner no lo estaremos viendo.
export SNOOPTIME=5; join -o "1.1 2.1 2.2 2.3" -1 2 -2 1 <(./execsnoop -d $SNOOPTIME | awk '{print $2;}' | grep [0-9]  | sort | uniq -c | sort -k 2) <(ps --no-headers -eo pid:1,user,command | sort -k 1b,1) | sort -n | tail -5

Variante escribiendo a un fichero el output del execsnoop para luego poder mostrar el total de eventos que se capturaron
export SNOOPTIME=60; ./execsnoop -d $SNOOPTIME >& snoop.log; join -o "1.1 2.1 2.2 2.3" -1 2 -2 1 <(cat snoop.log | awk '{print $2;}' | grep [0-9]  | sort | uniq -c | sort -k 2) <(ps --no-headers -eo pid:1,user,command | sort -k 1b,1) | sort -n | tail -5; echo -ne "\nTotal procs vistos: "; cat snoop.log | egrep "[0-9]\s+[0-9]" | wc -l

Si encontramos "bash" en los procesos, probablmente sea un "while true; do .. sleep N; done" corriendo. Podremos ver que corre grepeando el pid en snoop.log
O un "watch -n N ..."

TODO: Hacer programa que tenga en cuenta que los child pueden tener un parent short-lived
