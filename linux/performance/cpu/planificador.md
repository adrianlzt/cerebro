CFS: scheduler de CPU oficial

# Scheduling class:
 # OTHER: scheduling por defecto
 # FIFO: realtime sin timeslice (hasta que termina o la expulsa otra tarea FIFO/RR de mayor prioridad), solo root.
   + prioridad que -20 nice
 # ROUND ROBIN: realtime con timeslice (hasta que vence timeslice o la expulsa otra tarea FIFO/RR de mayor prioridad), solo root.
   + prioridad que -20 nice
 # BATCH: similar a OTHER pero con timeslice más alto para aprovechar cache (mejora throughput a costa de latencia)
 # DEADLINE (3.14+): hard realtime (queremos garantizar ejecución en un plazo estricto)
 Clases que solo están en el kernel de Con Kolivas
   # ISO (-ck): similar a Rountd Robin para usuarios (no root)
   # IDLE (-ck): solo cuando CPU idle.
     nice +20 tiene más prioridad que idle


BFS: brain fuck scheduler
Parece que es un mejor planificador, pero no lo meten en el mainline porque no escala con más de 16 CPUs
Siempre sacan parches para cada nueva versión de kernel.
http://kernel.kolivas.org/
http://ck-hack.blogspot.com.es/

Benchmark Oct-2012 http://repo-ck.com/bench/cpu_schedulers_compared.pdf
