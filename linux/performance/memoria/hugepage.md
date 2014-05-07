https://access.redhat.com/site/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Performance_Tuning_Guide/s-memory-transhuge.html

Como las páginas de memoria son pequeñas (4KiB) y la RAM es muy grande, la TLB (relación entre páginas lógicas y físicas) es muy grande.
Esto ralentiza la consulta.

Por esto se crean la huge pages, de 4MiB, consiguiendo una TLB menor.

En '/proc/meminfo | grep -i Huge' tenemos la información sobre estas páginas.
x86info -a|grep "Data TLB"      # muestra tamaño de hugepages


Caso de uso http://orainternals.files.wordpress.com/2008/10/high_cpu_usage_hugepages.pdf:

Una base de datos que cada cierto tiempo tenía picos de consumo provocado por sistema (visto con sar).
Mirando la memoria en esos momentos de picos veían que la memoria libre caía.

kscand/kswapd, encargada de analizar las páginas en busca de cuales podían marcarse como libres, y como tenía que escanear muchas páginas consumía la CPU.

La solución fue utilizar hugepages.
El programa tiene que usar hugepages en su código (usar libreria libhugetlbfs).


- Paginas de 4Mb en lugar de 4Kb (generalmente)

sysctl -w vm.nr_hugepages=20    # reserva 20 hugepages (mejor al arranque)
                                # reserva con shmget()
mount -t hugetlbfs none <PATH>  # permite reserva con mmap()
hugeadm                         # configuracion de hugepages
  --list-all-mounts
  --pool-list


## THP  (2.6.38+) ##
En redhat también existen las transparent huge pages, que transparentemente cogen peticiones de memoria contiguas y las meten en una página gigante.

# activa/desactiva THP
/sys/kernel/mm/transparent_hugepage/enabled
# agresividad en compactacion de memoria para hugepages
/sys/kernel/mm/transparent_hugepage/defrag

