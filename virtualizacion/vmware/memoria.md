https://www.vmware.com/files/pdf/perf-vsphere-memory_management.pdf
Understanding Memory Resource Management in VMware® ESX™ Server

Mirar ballooning.md

Otras técnicas para conseguir más memoria:

# Transparent Page Sharing (TPS)
Compartir páginas de memoria entre VMs.
Se hace hasing de las páginas, si coinciden, se compara la página entera (para asegurarse) y en caso positivo se apuntan ambas páginas a una sola y se libera la otra.

# Hypervisor Swapping
Mover páginas de una VM a un fichero de swap.
Último recurso si el host se está quedando sin memoria.
