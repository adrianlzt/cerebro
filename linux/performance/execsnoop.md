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
