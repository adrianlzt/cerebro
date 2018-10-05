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


Si redirigimos la salida a un fichero, luego podemos analizar que parent pid está generando más eventos:
cat LOG | awk '{print $2;}' | grep [0-9]  | sort | uniq -c | sort -n

Procesos que generan el top 5 de nuevos procesos:
ps aux | egrep "$(cat LOG | awk '{print $2;}' | grep [0-9]  | sort | uniq -c | sort -n |tail -n 5 | awk '{print $2;}' | xargs echo | tr ' ' '|')"

Sacar los parent pid causantes de la mayoria de los nuevos procesos (si se lanzó un subprocesso y ese fué el que ejecutó la mayoría de los otros procs, no lo veremos con esto):
join -o "1.1 2.2 2.3" -1 2 -2 1 <(cat LOG | awk '{print $2;}' | grep [0-9]  | sort | uniq -c | sort -k 2) <(ps --no-headers -eo pid:1,user,command | sort -k 1b,1) | sort -n | tail -5
