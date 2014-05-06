Nos da información a nivel de kernel de las llamadas que produce un programa.
Muy bajo nivel.


trace-cmd record -p function
 Genera un fichero trace.dat con trazas de todo el sistema

trace-cmd record -p function -F echo "hola"
 Genera un traceo de la ejecucción de 'echo "hola"'

trace-cmd report
 Para leer el fichero trace.dat (sin param, lee en el mismo dir)

trace-cmd hist
 Obtener un resumen de porcentaje de donde se van las llamadas y el arbol que ejecutan


No tiene que ver con strace ni ltrace.



## Forma manual ##

Tipos de trazas que podemos tomar
# cat /sys/kernel/debug/tracing/available_tracers 
blk function_graph wakeup_rt wakeup function nop

Activamos el traceo de funciones
# echo "function" > /sys/kernel/debug/tracing/current_tracer

Veemos el log de que se está traceando
# cat /sys/kernel/debug/tracing/trace

Desactivar el debug
# echo "nop" > /sys/kernel/debug/tracing/current_tracer
