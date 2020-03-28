pmap - report memory map of a process
http://linux.die.net/man/1/pmap

You can find the memory used by a program (process) by looking into /proc directory or using standard command such as ps or top. However, you must calculate all memory usage by hand i.e. add Shared Memory + mapped file + total virtual memory size of the process + Resident Set Size + non-swapped physical memory used by process.

pmap -d PID
Nos dice donde esta cada kilobyte de la memoria que está usando el proceso, y que tiene cargada en cada parte.

pmap -x PID
The -x (extended) option can be used to provide information about the memory allocation and mapping types per mapping. The amount of resident, non-shared anonymous, and locked memory is shown for each mapping:

pmap -XX PID
  nos da más info. Lo podemos usar para saber el tipo de memoria de una zona (lo he usado para buscar si era heap)


