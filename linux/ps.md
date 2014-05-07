Básico:
ps -ef
ps aux

Ver los parámetros enteros:
ps auxww


Ver como arbol:
ps auxf
ps ajxf


Ver los threads:
ps -efL | grep proc
ps auxms (dificil de leer)

Ver pid, usuario, comando, priority y nice
ps -eo pid,user,args,pri,ni

Memoria:
ps -eLf                                         # hebras (TID)
ps -eo pid,maj_flt,min_flt,pmem,rss,vsz,sz      # info de memoria
  maj_flt: fallos de página
  min_flt: la página está en RAM pero no está en la TLB, operación costosa pero no tanto como ir a disco
  vsz: consumo de memoria virtual (total)
  rss: consumo de memoria ram



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
