La idea es al igual que se hizo con los procesadores de dejar de incrementar frecuencia y poner más procesadores, la tendencia actual es poner más nodos de memoria en vez de hacerlos cada vez más grandes.

NUMA es una arquitectura HW donde cada CPU tiene una ram asignada, de esta manera dos CPUs puede acceder en paralelo a memoria RAM.
Las CPUs tamibén pueden acceder a la RAM de otra CPU pero tiene mayor coste.


Al cargar el kernel (en /boot/grub2/grub.cfg en la línea linux   /vmlinuz...)
numa=fake=4
Para decirles cuantas unidades virtuales tenemos

Tiene que estar compilado el kernel con opción NUMA
grep CONFIG_NUMA_EMU /boot/config*


lstopo
  Mostrar ventana gráfica con un esquema de los procesadores y memorias.


numactl --hardware
  node distances: coste entre acceder a las rams de los otros nodos
                  podemos usarlo para liberar un nodo y que se infrautilice

Pinning
Queremos optimizar el sistema con numa, podemos intentar lograrlo asociando determinados procesos a una CPU y/o NUMA en particular.
Tiene que ser un proceso que se ejecuta desde 0.

numactl <CMD>   # ejecuta comando con afinidad de CPU/memoria modificada
 -a                # permite cualquier nodo (override)
 --show            # muestra afinidad por defecto
 --physcpubind=0-1 # bind a CPU fisica
 --cpunodebind=0   # bind a nodo (puede tener varias CPU)
 --interleave=all  # round robin entre nodos
 --membind=0,1     # bind a nodo de memoria NUMA (ver Heap en numastat), error si no hay memoria libre.



- Demonio/comando que balancea procesos y allocs entre nodos NUMA. 
  No usar con Kernel Samepage Merging activado.
  Se encarga, entre otras cosas, de definir la función de coste entre los nodos.
  Solo está en RedHat

numad           # por defecto escanea todos los procesos
 -S 0 -p <PID>          # solo escanea <PID>
 -S 1 -x <PID>          # escanea todos menos <PID>

