https://www.kernel.org/doc/Documentation/sysctl/vm.txt

- vm.admin_reserve_kbytes = min(3% of free pages, 8MB)
The amount of free memory in the system that should be reserved for users with the capability cap_sys_admin.
That should provide enough for the admin to log in and kill a process, if necessary, under the default overcommit 'guess' mode.



- vm.block_dump = 0
Enables block I/O debugging on dmesg (WRITED blocks, dirtied inodes) when set to a nonzero numerical value.



- vm.compact_memory
Available only when CONFIG_COMPACTION is set. When 1 is written to the file, all zones are compacted such that free memory is available in contiguous blocks where possible. This can be important for example in the allocation of huge pages although processes will also directly compact memory as required.
Tiene un coste en CPU



- vm.dirty_background_bytes = 0
Contains the amount of dirty memory at which the background kernel flusher threads will start writeback (llevar a disco esa cache).
Note: dirty_background_bytes is the counterpart of dirty_background_ratio. Only one of them may be specified at a time. When one sysctl is written it is immediately taken into account to evaluate the dirty memory limits and the other appears as 0 when read.

* Un valor alto mejora throughput (menos I/O) a costa de mayor consumo de memoria y bloqueos de más larga duración cuando hay writeback (malo para RT) 


- vm.dirty_background_ratio = 5
Contains, as a percentage of total available memory that contains free pages and reclaimable pages, the number of pages at which the background kernel flusher threads will start writing out dirty data.
The total avaiable memory is not equal to total system memory.

* Un valor alto mejora throughput (menos I/O) a costa de mayor consumo de memoria y bloqueos de más larga duración cuando hay writeback (malo para RT)

Ejemplo, 100GB de ram, el 5% serán 5GB, y el writeback será muy grande y consumirá bastante.
Si el ratio es pequeño, el writeback se va haciendo constantemente, bloqueos de pequeña duración, pero más continuos.
Por ejemplo a un portatil le vendrá bien dejar el disco idle el mayor tiempo posible (porque mover el disco consume bateria). Un ratio alto será mejor para usar poco el disco constantemente.
Este tunable controla el demonio que en background va haciendo el escaneo de todo el sistema.


- vm.dirty_bytes = 0
Contains the amount of dirty memory at which a process generating disk writes will itself start writeback.  
Note: dirty_bytes is the counterpart of dirty_ratio. Only one of them may be specified at a time. When one sysctl is written it is immediately taken into account to evaluate the dirty memory limits and the other appears as 0 when read.

* Un valor alto mejora throughput (menos I/O) a costa de mayor consumo de memoria y bloqueos de más larga duración cuando hay writeback (malo para RT)

Esto es para controlar el writeback por proceso, en vez de esperar a que el demonio background se encargue del writeback.


- vm.dirty_expire_centisecs = 3000
This tunable is used to define when dirty data is old enough to be eligible for writeout by the kernel flusher threads.  It is expressed in 100'ths of a second.
Data which has been dirty in-memory for longer than this interval will be written out next time a flusher thread wakes up.

* Un valor alto mejora throughput (menos I/O) a costa de mayor consumo de memoria y bloqueos de más larga duración cuando hay writeback (malo para RT)

Cuanto tiempo hasta considerar la memoria dirty.


- vm.dirty_ratio = 10
Contains, as a percentage of total available memory that contains free pages and reclaimable pages, the number of pages at which a process which is generating disk writes will itself start writing out dirty data.
The total avaiable memory is not equal to total system memory.

* Un valor alto mejora throughput (menos I/O) a costa de mayor consumo de memoria y bloqueos de más larga duración cuando hay writeback (malo para RT)


- vm.dirty_writeback_centisecs = 500
The kernel flusher threads will periodically wake up and write `old' data out to disk. This tunable expresses the interval between those wakeups, in 100'ths of a second. Setting this to zero disables periodic writeback altogether.

* Un valor alto mejora throughput (menos I/O) a costa de mayor consumo de memoria y bloqueos de más larga duración cuando hay writeback (malo para RT)


- drop_caches
mirar proc/sys-vm-drop_caches.md


- vm.extfrag_threshold = 500
This parameter affects whether the kernel will compact memory or direct reclaim to satisfy a high-order allocation.  /sys/kernel/debug/extfrag/extfrag_index shows what the fragmentation index for each order is in each zone in the system.  Values tending towards 0 imply allocations would fail due to lack of memory, values towards 1000 imply failures are due to fragmentation and -1 implies that the allocation will succeed as long as watermarks are met.

The kernel will not compact memory in a zone if the fragmentation index is <= extfrag_threshold. The default value is 500.



- vm.hugepages_treat_as_movable = 0
This parameter controls whether we can allocate hugepages from ZONE_MOVABLE or not. If set to non-zero, hugepages can be allocated from ZONE_MOVABLE.  ZONE_MOVABLE is created when kernel boot parameter kernelcore= is specified, so this parameter has no effect if used without kernelcore=.



- vm.laptop_mode = 0
laptop_mode is a knob that controls "laptop mode". All the things that are controlled by this knob are discussed in Documentation/laptops/laptop-mode.txt

* Optimizaciones de consumo de batería por menor uso de disco (aumentar tiempo de writeback a 10min con los tunables anteriores, cpufreq, noatime, readahead).
Riesgo de perder trabajo en poweroff brusco (muchos datos en memoria no respaldados en disco).



- vm.lowmem_reserve_ratio = 256 256     32
For some specialised workloads on highmem machines it is dangerous for the kernel to allow process memory to be allocated from the "lowmem" zone. This is because that memory could then be pinned via the mlock() system call, or by unavailability of swapspace.  And on large highmem machines this lack of reclaimable lowmem memory can be fatal.  
So the Linux page allocator has a mechanism which prevents allocations which _could_ use highmem from using too much lowmem.  This means that a certain amount of lowmem is defended from the possibility of being captured into pinned user memory.

If you would like to protect more pages, smaller values are effective. The minimum value is 1 (1/1 -> 100%).



- vm.max_map_count = 65530
This file contains the maximum number of memory map areas a process may have. Memory map areas are used as a side-effect of calling malloc, directly by mmap and mprotect, and also when loading  shared libraries.
While most applications need less than a thousand maps, certain programs, particularly malloc debuggers (Valgrind), may consume lots of them, e.g., up to one or two maps per allocation.
The default value is 65536.



- vm.min_free_kbytes = 67584
This is used to force the Linux VM to keep a minimum number of kilobytes free.  The VM uses this number to compute a watermark[WMARK_MIN] value for each lowmem zone in the system.  Each lowmem zone gets a number of reserved free pages based   proportionally on its size.
Some minimal amount of memory is needed to satisfy PF_MEMALLOC allocations; if you set this to lower than 1024KB, your system will become subtly broken, and prone to deadlock under high loads.
Setting this too high will OOM your machine instantly.



- vm.min_slab_ratio = 5
This is available only on NUMA kernels.
A percentage of the total pages in each zone.  On Zone reclaim (fallback from the local zone occurs) slabs will be reclaimed if more than this percentage of pages in a zone are reclaimable slab pages.  This insures that the slab growth stays under control even in NUMA systems that rarely perform global reclaim.
```


- vm.min_unmapped_ratio = 1
This is available only on NUMA kernels.
This is a percentage of the total pages in each zone. Zone reclaim will only occur if more than this percentage of pages are in a state that zone_reclaim_mode allows to be reclaimed.



- vm.mmap_min_addr = 65536
This file indicates the amount of address space  which a user process will be restricted from mmapping. Since kernel null dereference bugs could accidentally operate based on the information in the first couple of pages of memory userspace processes should not be allowed to write to them.
By default this value is set to 0 and no protections will be enforced by the security module.  Setting this value to something like 64k will allow the vast majority of applications to work correctly and provide defense in depth against future potential kernel bugs.



- vm.nr_hugepages = 0
Change the minimum size of the hugepage pool.

* En sistemas que consumen mucha memoria (p.e. BBDD) debe activarse para reducir tamaño de PageTable y acelerar búsquedas.



- vm.nr_pdflush_threads = 0
obsoleto en kernels recientes (pdflush sustituido por per-DBI flusher)



- vm.oom_dump_tasks = 1
Enables a system-wide task dump (excluding kernel threads) to be produced when the kernel performs an OOM-killing and includes such information as pid, uid, tgid, vm size, rss, nr_ptes, swapents, oom_score_adj score, and name.  This is helpful to determine why the OOM killer was invoked, to identify the rogue task that caused it, and to determine why the OOM killer chose the task it did to kill.
If this is set to zero, this information is suppressed.  On very large systems with thousands of tasks it may not be feasible to dump the memory state information for each one.  Such systems should not be forced to incur a performance penalty in OOM conditions when the information may not be desired.
If this is set to non-zero, this information is shown whenever the OOM killer actually kills a memory-hogging task.

Se encarga de matar procesos si se queda sin memoria. Empieza a matar procesos que considera poco importantes.
Cada proceso tendrá su propio /proc/PID/oom_score calculado heurísticamente (procesos más viejos más prioridad, procesos de root más prioridad, etc). Cuanto mayor número, mayor probabilidad de que sea matado. El número real que usará para matar procesos será el oom_score_adj
Si queremos proteger un proceso podemos darle más valor en /proc/PID/oom_adj, este se sumará al oom_score.


- vm.oom_kill_allocating_task = 0
This enables or disables killing the OOM-triggering task in out-of-memory situations.
If this is set to zero, the OOM killer will scan through the entire tasklist and select a task based on heuristics to kill.  This normally selects a rogue memory-hogging task that frees up a large amount of memory when killed.
If this is set to non-zero, the OOM killer simply kills the task that triggered the out-of-memory condition. This avoids the expensive tasklist scan.
If panic_on_oom is selected, it takes precedence over whatever value is used in oom_kill_allocating_task.



- vm.panic_on_oom = 0
This enables or disables panic on out-of-memory feature.
If this is set to 0, the kernel will kill some rogue process, called oom_killer.  Usually, oom_killer can kill rogue processes and system will survive.
If this is set to 1, the kernel panics when out-of-memory happens. However, if a process limits using nodes by mempolicy/cpusets, and those nodes become memory exhaustion status, one process may be killed by oom-killer.
If this is set to 2, the kernel panics compulsorily even on the above-mentioned. Even oom happens under memory cgroup, the whole system panics.
The default value is 0.
panic_on_oom=2+kdump gives you very strong tool to investigate why oom happens. You can get snapshot.




- vm.overcommit_memory = 0
https://www.kernel.org/doc/Documentation/vm/overcommit-accounting
This value contains a flag that enables memory overcommitment.
When this flag is 0, the kernel attempts to estimate the amount of free memory left when userspace requests more memory.
When this flag is 1, the kernel pretends there is always enough memory until it actually runs out.
When this flag is 2, the kernel uses a "never overcommit" policy that attempts to prevent any overcommit of memory. 
Note that user_reserve_kbytes affects this policy.
This feature can be very useful because there are a lot of programs that malloc() huge amounts of memory "just-in-case" and don't use much of it.

0 es un heurístico (aprovecha mejor la memoria),
1 no es seguro
2 elimina overcommit a costa de desaprovechar memoria.

En /proc/meminfo podemos ver la memoria reservada y la memoria realmente utilizada.

- vm.overcommit_ratio = 50
When overcommit_memory is set to 2, the committed address space is not permitted to exceed swap plus this percentage of physical RAM. See above.

- overcommit_kbytes: (kernel 3.14+)
When overcommit_memory is set to 2, the committed address space is not permitted to exceed swap plus this amount of physical RAM. See below.
Note: overcommit_kbytes is the counterpart of overcommit_ratio. Only one of them may be specified at a time. Setting one disables the other (which then appears as 0 when read).

The overcommit amount can be set via `vm.overcommit_ratio' (percentage) or `vm.overcommit_kbytes' (absolute value).

The current overcommit limit and amount committed are viewable in /proc/meminfo as CommitLimit and Committed_AS respectively.
CommitLimit solo se usa si overcommit_memory=2, en ese caso se calcula como ('vm.overcommit_ratio' * Physical RAM) + Swap)


- vm.page-cluster = 3
page-cluster controls the number of pages up to which consecutive pages are read in from swap in a single attempt.  This is the swap counterpart to page cache readahead.  The mentioned consecutivity is not in terms of virtual/physical addresses, but consecutive on swap space - that means they were swapped out together.
It is a logarithmic value - setting it to zero means 1 page, setting it to 1 means 2 pages, setting it to 2 means 4 pages, etc. Zero disables swap readahead completely.
The default value is three (eight pages at a time).  There may be some small benefits in tuning this to a different value if your workload is swap-intensive.

* Es relevante si el sistema swapea frecuentemente (si se reduce mejora latencia en los primeros fallos de página pero empeora los sucesivos accesos).

Es como readahead de memoria. No lee sectores consecutivos, si no de páginas que se han swapeado a la vez.



- vm.percpu_pagelist_fraction = 0
This is the fraction of pages at most (high mark pcp->high) in each zone that are allocated for each per cpu page list.  The min value for this is 8. It means that we don't allow more than 1/8th of pages in each zone to be allocated in any single per_cpu_pagelist.  This entry only changes the value of hot per cpu pagelists.  User can specify a number like 100 to allocate 1/100th of each zone to each per cpu page list.
The batch value of each per cpu pagelist is also updated as a result.  It is set to pcp->high/4. The upper limit of batch is (PAGE_SHIFT * 8)
The initial value is zero.  Kernel does not use this value at boot time to set the high water marks for each per cpu page list.



- vm.swappiness = 60
This control is used to define how aggressive the kernel will swap memory pages.  Higher values will increase agressiveness, lower values decrease the amount of swap.  A value of 0 instructs the kernel not to initiate swap until the amount of free and file-backed pages is less than the high water mark in a zone.

* 100 libera RAM y mejora latencia de procesos running, pero empeora latencia cuando se necesita la memoria swapeada.

Los propios desarrolladores de kernel no tienen claro cual es el mejor valor.
En un entorno de escritorio dicen que es más importante que la memoria siempre estén en ram a costa de quitar pagecaches, porque una app que tenemos en segundo plano la querremos rápidamente en primer plano.
La otra idea es que es más útil acceder a ficheros rápidos que a páginas antiguas.

Valores altos, se swapea más.
Valores bajos, se swapea menos, se prefiere borrar caches antes que swapear.



- vm.user_reserve_kbytes = 131072
When overcommit_memory is set to 2, "never overcommit" mode, reserve min(3% of current process size, user_reserve_kbytes) of free memory.  This is intended to prevent a user from starting a single memory hogging process, such that they cannot recover (kill the hog).  user_reserve_kbytes defaults to min(3% of the current process size, 128MB).
If this is reduced to zero, then the user will be allowed to allocate all free memory with a single process, minus admin_reserve_kbytes.   Any subsequent attempts to execute a command will result in "fork: Cannot allocate memory".
Changing this takes effect whenever an application requests memory.



- vm.vfs_cache_pressure = 100
Controls the tendency of the kernel to reclaim the memory which is used for caching of directory and inode objects.
At the default value of vfs_cache_pressure=100 the kernel will attempt to reclaim dentries and inodes at a "fair" rate with respect to pagecache and swapcache reclaim. Decreasing vfs_cache_pressure causes the kernel to prefer to retain dentry and inode caches. When vfs_cache_pressure=0, the kernel will never reclaim dentries and inodes due to memory pressure and this can easily lead to out-of-memory conditions.
Increasing vfs_cache_pressure beyond 100 causes the kernel to prefer to reclaim dentries and inodes.

* Un valor de 50 mejora mucho el rendimiento en operaciones que manejan muchos ficheros y directorios (priman las caches de inodos/dentries sobre el pagecache)

Si decidimos que se tienda a liberar los pagecaches (swappiness alta), con este tunable se puede decidir que se debe liberar, la slab o el resto de cosas.
Valor 100 se reparte la liberación.
Valor 0 conserva siempre la slab.
Valor 50 da un poco más de importancia a la slab. Ejemplo, un backup que tenga muchos miles de pequeños ficheros.
Cuando es más importante el efecto de muchos miles de ficheros que el contenido, este tunable es muy importante

Mirar test_vfs_cache_pressure.sh
Ejemplo en una VM con 2GB de RAM (creando un fichero de 2GB):
real    0m2.664s
user    0m0.210s
sys     0m1.003s

real    0m1.197s
user    0m0.241s
sys     0m0.652s




- vm.zone_reclaim_mode = 0
Zone_reclaim_mode allows someone to set more or less aggressive approaches to reclaim memory when a zone runs out of memory. If it is set to zero then no zone reclaim occurs.  Allocations will be satisfied from other zones / nodes in the system.

This is value ORed together of
1       = Zone reclaim on
2       = Zone reclaim writes dirty pages out
4       = Zone reclaim swaps pages

zone_reclaim_mode is set during bootup to 1 if it is determined that pages from remote zones will cause a measurable performance reduction.

* 0 mejora rendimiento en file servers (es preferible acceder a datos cacheados en nodos remotos porque todos ellos tienen cache de ficheros).


