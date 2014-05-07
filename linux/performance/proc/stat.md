http://man7.org/linux/man-pages/man5/proc.5.html
https://www.kernel.org/doc/Documentation/filesystems/proc.txt


## /proc/stat
http://man7.org/linux/man-pages/man5/proc.5.html
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


