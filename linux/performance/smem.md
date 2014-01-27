http://www.selenic.com/smem/

smem: smem is a tool that can give numerous reports on memory usage on Linux systems. Unlike existing tools, smem can report proportional set size (PSS), which is a more meaningful representation of the amount of memory used by libraries and applications in a virtual memory system.

smem  reports  physical  memory  usage,  taking shared memory pages into account.  Unshared memory is reported as the USS (Unique Set Size).  Shared memory is divided evenly among the processes sharing that memory.  The unshared memory (USS) plus a process's proportion of shared memory is reported as the  PSS  (Proportional Set Size).  The USS and PSS only include physical memory usage.  They do not include memory that has been swapped out to disk.

USS: memoria no compartida
PSS: USS + fracción equitativa de la shared memory
