http://www.brendangregg.com/blog/2014-07-25/opensnoop-for-linux.html
https://github.com/brendangregg/perf-tools/blob/master/opensnoop

Tras arrancar el programa, nos muestra los ficheros que tenemos abiertos en el sistema.
También podemos preguntar por las llamadas open() que han dado error.

# REQUIREMENTS: FTRACE and KPROBE CONFIG, syscalls:sys_exit_open tracepoint,
# getname() kernel function (you may already have these on recent kernels),
# and awk.
