http://www.brendangregg.com/blog/2015-07-08/choosing-a-linux-tracer.html
priv-adrianRepo/linux/performance/dia2-profiling

In a nutshell: performance of virtually anything can be understood with tracing. File system internals, TCP/IP processing, device drivers, application internals. Read my lwn.net article on ftrace, and browse my perf_events page, as examples of some tracing (and profiling) capabilities.


Existen multitud de tracers:
eBPF (la opción si tenemos kernel 4.x)
ftrace (live tracing, counting)
perf_events (PMCs, stack profiling, trace-dump-analyze)
ktap
dtrace4linux
OEL DTrace
sysdig
SystemTap (all-powerful)
LTTng (all-powerful)


# perf / perf_events
official tracer/profiler for Linux users. It is in the kernel source, and is well maintained (and currently rapidly being enhanced). It's usually added via a linux-tools-common package.
Soportado desde RHEL6 y Debian Squeeze.
Se instala con un solo paquete

# ftrace
más potente que perf (perf parece que basa parte de su uso en ftrace)
las perf-tools casi todas usan este programa (estas tools están recomendadas para kernel >=3.2, kernels menores podrían fallar o hacer que vaya muy lento)

# ebpf
para linux 4.x, parece que es el mejor

# systemtap
el más potente.
complejo de usar.
carga módulos en el kernel, puedes romper cosas. Usar en entornos que permitan el fallo.
para muchas cosas hace falta tener el kernel debuginfo
no va incluído por defecto

# lttng
Rápido y seguro
no va incluído por defecto
no hay manera facil de hacer in-kernel programming

# sysdig
sencillo, interfaz parecida a tcpdump
container support

# ktap
Parece muerto

# dtrace4linux
parece muerto

# OL Dtrace
parece muerto
