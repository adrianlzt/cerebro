http://valgrind.org/

Valgrind is an instrumentation framework for building dynamic analysis tools. There are Valgrind tools that can automatically detect many memory management and threading bugs, and profile your programs in detail. You can also use Valgrind to build new tools.

GUI -> 
  alleyoop
  kcachegrind

http://stackoverflow.com/questions/131303/linux-how-to-measure-actual-memory-usage-of-an-application-or-process
With ps or similiar tools you will only get the amount of memory pages allocated by that process. This number is correct, but:
a) does not reflect the actual amount of memory used by the application, only the amount of memory reserved for it
b) can be misleading if pages are shared, for example by several threads or by using dynamically linked libraries
If you really want to know what amount of memory your application actually uses, you need to run it within a profiler. For example, valgrind can give you insights about the amount of memory used, and, more importantly, about possible memory leaks in your program.



MEMCHECK
Memory Profiler (detecta fugas de memoria)
valgrind --memcheck

MASSIF
Heap Profiler (evolucion del consumo de memoria):
valgrind --tool=massif <CMD>
  --time-unit=B         # para procesos de vida corta
  ms_print massif.out.<N>     # gráfico ASCII

CACHEGRIND
CPU Cache Profiler (registra cache-misses)
valgrind --tool=cachegrind

CALLGRIND
Call Profiler (registra llamadas entre funciones)
valgrind --tool=callgrind



Mirar memoria/tunables.md vm.max_map_count



# Dump memoria
En /proc/PID/maps tenemos las areas de memoria que está usando un proceso.
En /proc/PID/mem podemos leer estas áreas para obtener los datos almacenados por el proceso.
https://stackoverflow.com/a/23001686/1407722
Script en python para hacer un dump de la memoria de un proceso.
