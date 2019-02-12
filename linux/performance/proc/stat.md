http://man7.org/linux/man-pages/man5/proc.5.html
https://www.kernel.org/doc/Documentation/filesystems/proc.txt


## /proc/stat
http://man7.org/linux/man-pages/man5/proc.5.html
Buscar por /proc/stat
Muestra el tiempo en centésimas de segundo el tiempo dedicado por la cpu a distintas tareas: user, nice, sys, idle, iowait, irq, softirq, steal, guest, guest_nice
Ejemplo:
  cpu 10132153 290696 3084719 46828483 16683 0 25195 0 175628 0
  cpu0 1393280 32966 572056 13343292 6130 0 17875 0 23933 0


Nos da más datos, por ejemplo, el número de procesos que se han creado. Útil para saber cuantos procesos por segundo está creando el servidor (para monitorizar posibles fork bombs)

/proc/stat
kernel/system statistics. Varies with architecture. Common entries include:

page 5741 1808
The number of pages the system paged in and the number that were paged out (from disk).

swap 1 0
The number of swap pages that have been brought in and out.

intr 1462898
This line shows counts of interrupts serviced since boot time, for each of
the possible system interrupts. The first column is the total of all
interrupts serviced; each subsequent column is the total for a particular interrupt.

ctxt 115315
The number of context switches that the system underwent.

btime 769041601
boot time, in seconds since the Epoch, 1970-01-01 00:00:00 +0000 (UTC).
NO fiarse. En ciertos casos puede variar por culpa del NTP. Cuando el NTP añade segundos, el btime se ve modificado esa cantidad de segundos.
  https://bugzilla.redhat.com/show_bug.cgi?id=132062
  https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=119971
  https://bugzilla.kernel.org/show_bug.cgi?id=764

processes 86031
Number of forks since boot.

The   "procs_blocked" line gives  the  number of  processes currently blocked,
waiting for I/O to complete.



## /proc/[PID]/stat
Sección /proc/[pid]/stat
Para sacar un campo sin perderse (en el man viene entre parentesis el número de campo que es): 
cat stat | cut -d' ' -f 18  (ejemplo para sacar el priority)

user time y systime mirar time.md


- Información sobre fallos de página y direcciones inicio-fin
  de cada zona.
- Los fallos "minor" (attaches) no implican I/O (página en RAM
  pero su dirección no está en la TLB).

cat /proc/<PID>/stat
  (10) %min_flt       # nº de fallos de página "minor" (attaches)
  (11) %cmin_flt      # number of minor faults with child's
  (12) %maj_flt       # nº de fallos de página "major"
  (13) %cmaj_flt      # number of major faults with child's
  (23) %vsize         # VmSize%status (en bytes)
  (24) %rss           # resident%statm (en nº de páginas)
  (26) %start_code    # addr. above which program text can run
  (27) %end_code      # addr. below which program text can run
  (28) %start_stack   # addr. of the start of the main process stack
  (45) %start_data    # addr. above which program data+bss is placed
  (46) %end_data      # addr. below which program data+bss is placed
  (47) %start_brk     # addr. above which program heap can be expanded with brk()
  (48) %arg_start     # addr. above which program command line is placed
  (49) %arg_end       # addr. below which program command line is placed
  (50) %env_start     # addr. above which program environment is placed
  (51) %env_end       # addr. below which program environment is placed


