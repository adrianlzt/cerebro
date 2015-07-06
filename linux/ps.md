Mirar pstree.md

Básico:
ps -ef
ps aux

--sort rss
  ordena poniendo al final lo que más consumo de RSS tengan
--sort -rss
  ordena inversamente

Ver los parámetros enteros:
ps auxww


Ver como arbol:
ps auxf
ps ajxf


Ver los threads:
ps -efL | grep proc
ps auxms (dificil de leer)

Orden por start time (más jovenes abajo):
ps -ef --sort=start_time

Ver pid, usuario, comando, priority y nice
ps -eo pid,user,args,pri,ni

Memoria:
ps -eo pmem,comm,pid,maj_flt,min_flt,rss,vsz --sort -rss | column -t | head

Total memoria usada en MB
ps --no-headers -eo rss | awk '{ SUM += $1} END { print SUM/1024 }'


ps aux --sort -rss | head

Ver en continuo, remarcando los cambios cada 2 segundos:
watch --differences -n 2 'ps aux --sort -rss | head'

ps -eLf                                         # hebras
ps -eo pid,maj_flt,min_flt,pmem,rss,vsz         # info de memoria
  maj_flt: fallos de página, ir a disco a buscar la página
  min_flt: la página está en RAM pero no está en la TLB, operación costosa pero no tanto como ir a disco
  pmem: % de memoria
  rss: consumo de memoria ram
  vsz: consumo de memoria virtual (total)

ps -eo rss,vsz,pid,cputime,cmd --width 100 --sort -rss,-vsz | head
  Los 10 con más consumo de memoria

ps aux | sort -nk +4 | tail

CPU:
ps -e -ocomm,pid,class,cp,cputime,pri,psr,rtprio,wchan,state,stat
  %class # Scheduling class:
          # OTHER: scheduling por defecto
          # FIFO: realtime sin timeslice (hasta que termina o la expulsa otra tarea FIFO/RR de mayor prioridad), solo root.
          # ROUND ROBIN: realtime con timeslice (hasta que vence timeslice o la expulsa otra tarea FIFO/RR de mayor prioridad), solo root.
          # BATCH: similar a OTHER pero con timeslice más alto para aprovechar cache (mejora throughput a costa de latencia)
          # DEADLINE (3.14+): hard realtime (queremos garantizar ejecución en un plazo estricto)
	  Clases que solo están en el kernel de Con Kolivas
            # ISO (-ck): similar a Rountd Robin para usuarios (no root)
            # IDLE (-ck): solo cuando CPU idle.
  %cp   # CPU en decimas de %
  %cputime      # acumulativo
  %pri          # prioridad (mayor es menos prioridad)
  %psr          # nº de CPU fisica
  %rtprio       # prioridad en RT (mayor es más prioridad)
  %wchan        # función por la que está esperando el proceso
  %state        # estado del proceso (D, R, S, T, W, X, Z)
                    D   uninterruptible sleep (generalmente I/O)
                    R   en cola de ejecución (running o runnable)
                    S   interruptible sleep (esperando evento)
                    T   stopped (p.e. con SIGSTOP)
                    W   -deprecado-
                    X   dead (no debería verse)
                    Z   defunct (zombie)
  %stat
                    <    high-priority (not nice to other users)
                    N    low-priority (nice to other users)
                    L    has pages locked into memory (for real-time and custom IO)
                    s    is a session leader
                    l    is multi-threaded (using CLONE_THREAD, like NPTL pthreads do)
                    +    is in the foreground process group





ps -fea -o pcpu -o args
 
 (poner un pipe con more)
  
  Con estas dos secuencias de comandos podréis ver de un modo rápido y sencillo los procesos ordenados por
  uso (%) de CPU y memoria. Por supuesto no es necesario (ni práctico) escribir el comando completo en
  la shell cada vez que lo queráis ejecutar, os recomiendo crear un alias específico para cada uno de ellos.
   
   Listar procesos por % cpu, veréis que eliminamos aquellos que usan 0.0 de CPU con sed (sed ‘/^ 0.0 /d):
   ps -e -o pcpu,cpu,nice,state,cputime,args --sort pcpu | sed '/^ 0.0 /d'
   Ejemplo:
   $ ps -e -o pcpu,cpu,nice,state,cputime,args --sort pcpu | sed '/^ 0.0 /d'
   %CPU CPU  NI S     TIME COMMAND
   0.2   -   0 S 00:00:24 metacity
   0.2   -   0 S 00:00:00 /usr/bin/python /usr/bin/terminator
   0.2   -   0 S 00:00:28 gnome-screensaver
   0.2   -   0 S 00:00:31 gnome-panel
   4.6   -   0 S 00:08:23 /usr/bin/pulseaudio --start
   7.4   -   0 S 00:13:24 /usr/X11R6/bin/X :0 -br -audit 0 -auth /var/lib/gdm/:0.Xauth -nolisten tcp vt7
   7.5   -   0 S 00:04:31 rhythmbox
   14.4   -   0 S 00:08:50 /usr/lib/firefox-3.5.4/firefox-3.5
    
    Listar procesos por uso de memoria (en KB):
    ps -e -orss=,args= | sort -b -k1,1n | pr -TW$COLUMNS
    Ejemplo (reducido):
    $ ps -e -orss=,args= | sort -b -k1,1n | pr -TW$COLUMNS
    23964 gnome-panel
    26168 nautilus
    26256 /usr/bin/python /usr/bin/terminator
    58340 /usr/X11R6/bin/X :0 -br -audit 0 -auth /var/lib/gdm/:0.Xauth -nolisten tcp vt7
    58728 rhythmbox
    128736 /usr/lib/firefox-3.5.4/firefox-3.5
     
     Mario hace esto mismo (memoria por proceso) para CACTI con:
     ps -eo vsize,cmd
     (tb se puede ordenar con sort: ps -eo vsize,cmd | sort -b -k1,1n).
     La memoria se muestra en KB.


Mostrar variables de entorno
ps eww


Ver procesador donde está corriendo:
ps -e opsr,comm,pid

Procesos de un usuario
ps -f -U nombre
