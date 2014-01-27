http://www.pixelbeat.org/programming/profiling/

Profiling is an alternative to benchmarking that is often more effective, as it gives you more fine grained measurements for the components of the system you're measuring, thus minimising external influences from consideration. It also gives the relative cost of various components, further discounting external influence.


Perf
https://perf.wiki.kernel.org/index.php/Main_Page

This is the wiki page for the perf performance counters subsystem in Linux. Performance counters are CPU hardware registers that count hardware events such as instructions executed, cache-misses suffered, or branches mispredicted. They form a basis for profiling applications to trace dynamic control flow and identify hotspots.
perf provides rich generalized abstractions over hardware specific capabilities. Among others, it provides per task, per CPU and per-workload counters, sampling on top of these and source code event annotation.


Ejemplo sacado de la web de pixelbeat.org:
perf record -a sleep 10  # Guarda el performance data del comando 'sleep 10' y lo escribe en perf.data
perf report --sort comm,dso
