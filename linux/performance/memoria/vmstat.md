Saca cada 5 segundos estadísticas de la memoria
vmstat 5

Podemos ver si la máquina está swapeando mirando las columnas si/so

vmstat -s
vmstat -a
  %pages paged in       # page-in a RAM (bloques de 1k)
  %pages paged out      # page-out a disco
  %pages swapped in     # swap-in a RAM (paginas de 4k)
  %pages swapped out    # swap-out a swap


/proc/procinfo                # muestra la misma información


Mirar tambien proc/vmstat.md
