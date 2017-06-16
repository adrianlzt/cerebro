http://lwn.net/Articles/370423/
https://www.kernel.org/doc/Documentation/trace/ftrace.txt

instalación: yum install -y trace-cmd / yaourt -Ss trace-cmd
cli: trace-cmd
gui: kernelshark

I love Ftrace, it's a kernel hacker's best friend. It's built into the kernel, and can consume tracepoints, kprobes, and uprobes, and provides a few capabilities: event tracing, with optional filters and arguments; event counting and timing, summarized in-kernel; and function-flow walking. See ftrace.txt from the kernel source for examples.
It's controlled via /sys, and is intended for a single root user (although you could hack multi-user support using buffer instances).
Its interface can be fiddly at times, but it's quite hackable, and there are front ends: Steven Rostedt, the main ftrace author, has created trace-cmd, and I've created the perf-tools collection.
My biggest gripe is that it isn't programmable, so you can't, for example, save and fetch timestamps, calculate latency, and then store it as a histogram. You'll need to dump events to user-level, and post-process, at some cost. It may become programmable via eBPF.

Cuidado con usar ftrace en kernels 2.6.x, puede que no sea seguro.
https://github.com/brendangregg/perf-tools#warnings



A partir del kernel 2.6.27
Linux kernel internal tracer framework
  - Function tracer
  - Tracing data output
  - Tracepoint
  - hist triggers

Hace como el gprof de gcc, introduce unas llamadas al comienzo de nuestras funciones para registrar el paso por ellas.
Dynamic function tracer, nos permite habilitar o deshabilitar dinámicamente este traceo.

Para manejar ftrace se hace mediante un sistema de ficheros virtual (tracefs):
/sys/kernel/debug/tracing

No tiene que ver con strace ni ltrace.


# Function tracer
Nos permite analizar que llamadas a funciones realiza cada programa

# Tracepoints
Poner analizadores en determinados puntos de traceo habilitados en el kernel

# hist triggers
http://www.brendangregg.com/blog/2016-06-08/linux-hist-triggers.html
https://www.kernel.org/doc/Documentation/trace/events.txt (buscar "- hist")
Linux-4.7
create custom, efficient, in-kernel histograms
echo 'hist:key=common_pid.execname:values=ret:sort=ret if ret >= 0' > /sys/kernel/tracing/events/syscalls/sys_exit_read/trigger

Podemos generar histogramas facilmente de como se están realizando llamas a ciertas syscalls por parte de los programas. Por ejemplo analizar que programa esta escribiendo más y cuanto.

Para ciertas cosas es más sencillo usar esto que eBPF (que tiene más potencia, pero necesita herramientas, compilador y más complejidad)

# kprobes
kprobes.md

# Ejemplos
## Uso con el sistema de ficheros virtual

Tipos de trazas que podemos tomar
cat /sys/kernel/debug/tracing/available_tracers 
blk function_graph wakeup_rt wakeup function nop

Activamos el traceo de funciones
echo "function" > /sys/kernel/debug/tracing/current_tracer

echo "1" > tracing_on

Veemos el log de que se está traceando
cat /sys/kernel/debug/tracing/trace

Desactivar el debug
echo "nop" > /sys/kernel/debug/tracing/current_tracer


Usando uprobe (script bash que usa ftrace): https://github.com/brendangregg/perf-tools/blob/master/user/uprobe
Capturar las llamadas a SSL_read y SSL_write de OpenSSL
sudo ./uprobe 'p:/usr/lib/libssl.so.1.0.0:SSL_read +0(%si):string'
sudo ./uprobe 'p:/usr/lib/libssl.so.1.0.0:SSL_write +0(%si):string'

# Herramienta de alto nivel
kernelshark es un visor para los ficheros generados por trace-cmd

trace-cmd record -p function
 Genera un fichero trace.dat con trazas de todo el sistema
 probando en mi portatil notaba que lo ralentizaba
 CUIDADO! genera muchos gigas de información en poco tiempo. 1GB en 10s (depende mucho la carga del sistema)

trace-cmd record -p function -F echo "hola"
 Genera un traceo de la ejecucción de 'echo "hola"'

trace-cmd report
 Para leer el fichero trace.dat (sin param, lee en el mismo dir)

trace-cmd hist
 Obtener un resumen de porcentaje de donde se van las llamadas y el arbol que ejecutan



