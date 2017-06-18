http://blog.scoutapp.com/articles/2015/04/10/understanding-page-faults-and-memory-swap-in-outs-when-should-you-worry
https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_MRG/1.3/html/Realtime_Reference_Guide/chap-Realtime_Reference_Guide-Memory_allocation.html

Major: requiring I/O
Minor: reclaiming a frame (memoria ya disponible, pero no aún para este proceso)

Major page fault: A more severe memory latency is a major page fault. These can occur when the system has to synchronize memory buffers with the disk, swap memory pages belonging to other processes, or undertake any other Input/Output activity to free memory. This occurs when the processor references a virtual memory address that has not had a physical page allocated to it. The reference to an empty page causes the processor to execute a fault, and instructs the kernel code to allocate a page and return, all of which increases latency dramatically.



Minor page fault: A potential source of memory latency is called a minor page fault. They are created when a process attempts to access a portion of memory before it has been initialized. In this case, the system will need to perform some operations to fill the memory maps or other management structures. The severity of a minor page fault can depend on system load and other factors, but they are usually short and have a negligable impact.

Occurs when the code (or data) needed is actually already in memory, but it isn't allocated to that process. For example, if a user is running a web browser then the memory pages with the browser executable code can be shared across multiple users (since the binary is read-only and can't change). If a second user starts the same web browser then Linux won't load all the binary again from disk, it will map the shareable pages from the first user and give the second process access to them. In other words, a minor page fault occurs only when the page list is updated (and the MMU configured) without actually needing to access the disk.

Tambien puede ocurrir porque una página de memoria ya se haya descartado de la memoria física, pero aún no se haya borrado (no es instantáneo). Si esa misma página se requiere antes de borrarse, será un minor fault.
