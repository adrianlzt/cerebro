http://www.brendangregg.com/perf.html


Ejemplo sacado de la web de pixelbeat.org:
perf record -a sleep 10  # Guarda el performance data del comando 'sleep 10' y lo escribe en perf.data
perf report --sort comm,dso

Guardamos datosa durante 30s del proceso 13204, sampleando a 99Hz y capturando stack traces:
perf record -F 99 -p 13204 -g -- sleep 30
Sacamos la info por la pantalla en modo texto:
perf report -n --stdio
  Nos irá dando cuanta CPU se come cada llamada, y el stack trace que genera por debajo.
  Por ejemplo, tendremos la llamada xxx() que consume el 20% y su stack trace puede tener aa() y bb() que consuman cada uno 50% (ese porcentaje será del 20% del "padre")


Perf toma muestras cada cierto tiempo, así que eventos rápidos puede que se escapen. Tendremos que modificar la velocidad de muestreo para solucionar este problema.


perf record -a -g
  -a, --all-cpus System-wide collection from all CPUs.
  -g Enables call-graph (stack chain/backtrace) recording.
  Genera traza perf.data de todo el sistema. Parar con Control+c
  Nos dirá cuantas muestras ha tomado, se le pueden escapar cosas. Es así para intentar evitar un impacto en la aplicación.

perf record -F 99 -ag -- sleep 10
 Sample CPU stack traces for the entire system, at 99 Hertz, for 10 seconds (< Linux 4.11):


perf record -g ls
  Genera traza solo de la ejecucción del comando ls

perf report
  menu ncurses navegable con estadísticas de los procesos ejecutados, llamadas, etc

perf report -n --stdio
  salida en texto
  -n  Show the number of samples for each symbol
  --input=FILE por si queremos otro que perf.data

perf report -c sshd
  solo ver el report del comando sshd

perf top
  como el top pero con porcentaje de procesos y las llamadas que hace


perf sched record
  Tool to trace/measure scheduler properties (latencies)
  obtiene información sobre timing del sistema
  almacena informacion hasta que lo paramos con control+c
  luego podemos analizarlo con report y veremos los switches de procesos

perf sched latency
  nos muestra una tabla sobre los consumos de tiempo y número de cambios de contexto de los procesos
  los tiempos creo que son entre que entra la tarea en la CPU hasta que se produce otro cambio de contexto



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
