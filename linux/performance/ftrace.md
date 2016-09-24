Mejor usar eBPF (bcc-tools)


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

trace-cmd record -p function -F echo "hola"
 Genera un traceo de la ejecucción de 'echo "hola"'

trace-cmd report
 Para leer el fichero trace.dat (sin param, lee en el mismo dir)

trace-cmd hist
 Obtener un resumen de porcentaje de donde se van las llamadas y el arbol que ejecutan



