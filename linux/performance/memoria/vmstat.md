https://www.thomas-krenn.com/en/wiki/Linux_Performance_Measurements_using_vmstat

Saca cada 10 segundos estadísticas de la memoria
vmstat -w 10

Podemos ver si la máquina está swapeando mirando las columnas si/so

vmstat -s
vmstat -s -S M
  mostar en MB

vmstat -a
  %pages paged in       # page-in a RAM (bloques de 1k)
  %pages paged out      # page-out a disco
  %pages swapped in     # swap-in a RAM (paginas de 4k)
  %pages swapped out    # swap-out a swap


/proc/meminfo                # muestra la misma información


# IO
 bi: Blocks received from a block device (blocks/s).
 bo: Blocks sent to a block device (blocks/s).

# SWAP
  si: Amount of memory swapped in from disk (/s).
  so: Amount of memory swapped to disk (/s).
  Lo saca de /proc/vmstat
  cat /proc/vmstat  | grep -e swp

# System
  in: The number of interrupts per second, including the clock.
  cs: The number of context switches per second

Mirar tambien proc/vmstat.md
