http://www.pixelbeat.org/programming/profiling/

Profiling is an alternative to benchmarking that is often more effective, as it gives you more fine grained measurements for the components of the system you're measuring, thus minimising external influences from consideration. It also gives the relative cost of various components, further discounting external influence.


Perf
https://perf.wiki.kernel.org/index.php/Main_Page

This is the wiki page for the perf performance counters subsystem in Linux. Performance counters are CPU hardware registers that count hardware events such as instructions executed, cache-misses suffered, or branches mispredicted. They form a basis for profiling applications to trace dynamic control flow and identify hotspots.
perf provides rich generalized abstractions over hardware specific capabilities. Among others, it provides per task, per CPU and per-workload counters, sampling on top of these and source code event annotation.


Ejemplo sacado de la web de pixelbeat.org:
perf record -a sleep 10  # Guarda el performance data del comando 'sleep 10' y lo escribe en perf.data
perf report --sort comm,dso


Perf toma muestras cada cierto tiempo, así que eventos rápidos puede que se escapen. Tendremos que modificar la velocidad de muestreo para solucionar este problema.


perf record -a -g
  -a, --all-cpus System-wide collection from all CPUs.
  -g Enables call-graph (stack chain/backtrace) recording.
  Genera traza perf.data de todo el sistema. Parar con Control+c
  Nos dirá cuantas muestras ha tomado, se le pueden escapar cosas. Es así para intentar evitar un impacto en la aplicación.

perf record -g ls
  Genera traza solo de la ejecucción del comando ls

perf report
  menu ncurses navegable con estadísticas de los procesos ejecutados, llamadas, etc

perf report --stdio
  salida en texto

perf top
  como el top pero con porcentaje de procesos y las llamadas que hace


perf sched record
  obtiene información sobre timing del sistema

perf sched latency
  nos muestra una tabla sobre los consumos de tiempo y cambios de contexto de los procesos


perf list
  Mostrar todos los puntos que podemos analizar

perf stat -e page-faults -a
  mostrar los fallos de página para todo el sistema (para con Control+c)

perf stat -e page-faults ls
  mostrar fallos de página de la ejecucción de ls


perf stat -e cache-misses ./programa
  mostrar fallos de cache del programa.
  Probar el cache-misses.c cambiando la línea comentada
  El "malo" tarda más tiempo porque tiene muchos fallos de cache (no le cabe la información en la cache L1)


CPU
perf stat -e cache-misses,cpu-migrations <CMD>
perf record -e cache-misses,cpu-migrations <CMD> && perf report


## Flame Graph ##
git clone https://github.com/brendangregg/FlameGraph
cd FlameGraph/
perf record -a -g
perf script > flame.txt
./stackcollapse-perf.pl flame.txt > flame.temp
./flamegraph.pl flame.temp > flame.svg
geeqie flame.svg
