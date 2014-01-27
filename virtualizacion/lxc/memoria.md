Cgroups aplicables a la memoria: http://www.mjmwired.net/kernel/Documentation/cgroups/memory.txt

Configurando una máquina con límites en la memoria (por defecto parece que no tienen)
http://www.mattfischer.com/blog/?p=399

I’m going to limit memory to 512M and total usage or memory + swap to 1G. Note the second setting is for overall memory + swap, not just swap usage.
lxc.cgroup.memory.limit_in_bytes = 512M
lxc.cgroup.memory.memsw.limit_in_bytes = 1G

